"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function ProductForm({ initialData, isEdit }: { initialData?: any, isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    stock: initialData?.stock || 0,
    description: initialData?.description || "",
    images: initialData?.images?.join(", ") || "",
    sizes: initialData?.sizes?.join(", ") || "S, M, L, XL",
    isNew: initialData?.isNew || false,
    isSale: initialData?.isSale || false,
    featured: initialData?.featured || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return alert("Firebase not initialized");
    setLoading(true);
    
    try {
      const dataToSave = {
        ...formData,
        images: formData.images.split(",").map((s: string) => s.trim()).filter(Boolean),
        sizes: formData.sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
      };

      if (isEdit && initialData?.id) {
        await setDoc(doc(db, "products", initialData.id), dataToSave, { merge: true });
      } else {
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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold uppercase tracking-widest font-heading">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#C4A77D] text-[#050A1F] px-6 py-2 rounded-lg font-bold hover:bg-[#B5956A] transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>

      <div className="space-y-6 bg-[#111] p-6 rounded-2xl border border-white/5">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Product Name</label>
            <input 
              name="name" value={formData.name} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Slug (URL)</label>
            <input 
              name="slug" value={formData.slug} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Price (₹)</label>
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
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Category</label>
            <input 
              name="category" value={formData.category} onChange={handleChange} required
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
            />
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
          <label className="block text-sm font-medium text-white/60 mb-2">Image URLs (comma separated)</label>
          <input 
            name="images" value={formData.images} onChange={handleChange} placeholder="https://..., https://..." required
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Sizes (comma separated)</label>
          <input 
            name="sizes" value={formData.sizes} onChange={handleChange} required
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30" 
          />
        </div>

        <div className="flex gap-8 pt-4">
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
