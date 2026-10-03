"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function ProductForm({ initialData, isEdit }: { initialData?: any, isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<{name: string, subcategories: string[]}[]>([]);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    mrp: initialData?.mrp || "",
    price: initialData?.price || "",
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || "",
    stock: initialData?.stock || "",
    description: initialData?.description || "",
    images: initialData?.images?.join(", ") || "",
    sizes: initialData?.sizes?.join(", ") || "S, M, L, XL",
    isNew: initialData?.isNew || false,
    isSale: initialData?.isSale || false,
    featured: initialData?.featured || false,
  });

  useEffect(() => {
    const fetchCats = async () => {
      if (!db) return;
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        setAvailableCategories(snapshot.docs.map(doc => ({
          name: doc.data().name,
          subcategories: doc.data().subcategories || []
        })));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCats();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const uploadedUrls: string[] = [];

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary config missing. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local");
      setUploadingImage(false);
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error("Upload error:", data);
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: prev.images ? `${prev.images}, ${uploadedUrls.join(", ")}` : uploadedUrls.join(", "),
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? (value === "" ? "" : Number(value)) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return alert("Firebase not initialized");
    setLoading(true);
    
    try {
      const finalSlug = formData.slug.trim() 
        ? formData.slug.trim() 
        : formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const dataToSave: any = {
        ...formData,
        mrp: Number(formData.mrp) || 0,
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        slug: finalSlug,
        images: formData.images.split(",").map((s: string) => s.trim()).filter(Boolean),
        sizes: formData.sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
        updatedAt: serverTimestamp(),
      };

      if (isEdit && initialData?.id) {
        await setDoc(doc(db, "products", initialData.id), dataToSave, { merge: true });
      } else {
        dataToSave.createdAt = serverTimestamp();
        await addDoc(collection(db, "products"), dataToSave);
      }
      
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest font-heading truncate">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#C4A77D] text-[#050A1F] w-full sm:w-auto px-6 py-3 sm:py-2 rounded-lg font-bold hover:bg-[#B5956A] transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5 shrink-0" />
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>

      <div className="space-y-6 bg-[#111] p-6 rounded-2xl border border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Product Name</label>
            <input 
              name="name" value={formData.name} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Slug (Optional - auto-generates)</label>
            <input 
              name="slug" value={formData.slug} onChange={handleChange}
              placeholder="e.g. my-cool-product"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">MRP (₹)</label>
            <input 
              name="mrp" type="number" value={formData.mrp} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">TRP (Toko Retail Price) (₹)</label>
            <input 
              name="price" type="number" value={formData.price} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Stock</label>
            <input 
              name="stock" type="number" value={formData.stock} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Main Category</label>
            <select 
              name="category" value={formData.category} 
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: "" }))} 
              required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 uppercase"
            >
              <option value="" disabled>Select main category</option>
              {availableCategories.map((cat, i) => (
                <option key={i} value={cat.name} className="uppercase">{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Sub Category (Optional)</label>
            {!formData.category ? (
              <div className="p-3 bg-black border border-white/5 rounded-lg text-sm text-white/30">
                Select a main category first
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, subcategory: "" }))}
                  className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-colors ${!formData.subcategory ? "bg-[#C4A77D] text-[#050A1F]" : "bg-black border border-white/10 text-white/60 hover:text-white hover:border-white/30"}`}
                >
                  None
                </button>
                {availableCategories.find(c => c.name === formData.category)?.subcategories.map((sub, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, subcategory: sub }))}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-colors ${formData.subcategory === sub ? "bg-[#C4A77D] text-[#050A1F]" : "bg-black border border-white/10 text-white/60 hover:text-white hover:border-white/30"}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
          <textarea 
            name="description" value={formData.description} onChange={handleChange} rows={4} required
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Images (Upload or URLs)</label>
          <div className="flex flex-col gap-3 mb-3">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <label className="flex-1">
                <span className="sr-only">Upload Images</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-white/70
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#C4A77D] file:text-[#050A1F]
                    hover:file:bg-[#B5956A] file:cursor-pointer file:transition-colors
                    bg-black border border-white/10 rounded-lg p-1"
                />
              </label>
              {uploadingImage && <div className="text-[#C4A77D] text-sm animate-pulse whitespace-nowrap">Uploading...</div>}
            </div>
            <input 
              name="images" value={formData.images} onChange={handleChange} placeholder="https://..., https://..." required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Sizes (comma separated)</label>
          <input 
            name="sizes" value={formData.sizes} onChange={handleChange} required
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="w-4 h-4 accent-[#C4A77D]" />
            <span className="text-white/80">Mark as New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isSale" checked={formData.isSale} onChange={handleChange} className="w-4 h-4 accent-[#C4A77D]" />
            <span className="text-white/80">On Sale</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[#C4A77D]" />
            <span className="text-white/80">Featured (Homepage)</span>
          </label>
        </div>
      </div>
    </form>
  );
}
