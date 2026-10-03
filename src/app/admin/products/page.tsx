"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!db) return;
      try {
        const snap = await getDocs(collection(db, "products"));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        // Sort newest first (by createdAt). Products without createdAt go to the bottom.
        data.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });
        
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!db || !confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest font-heading">Products</h1>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#C4A77D] text-[#050A1F] px-4 py-2 rounded-lg font-bold hover:bg-[#B5956A] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-[#111] rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-[#1A1A1A] border-b border-white/10">
            <tr>
              <th className="p-4 font-medium text-white/60">Product</th>
              <th className="p-4 font-medium text-white/60">Category</th>
              <th className="p-4 font-medium text-white/60">Price</th>
              <th className="p-4 font-medium text-white/60">Stock</th>
              <th className="p-4 font-medium text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-white/40">Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-white/40">No products found. Add one!</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 relative rounded overflow-hidden bg-black">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/10" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white truncate max-w-[150px] sm:max-w-[250px]">{product.name}</p>
                      <p className="text-xs text-white/50 truncate max-w-[150px] sm:max-w-[250px]">{product.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 uppercase">
                    {product.category}
                    {product.subcategory && <span className="block text-xs text-white/50">{product.subcategory}</span>}
                  </td>
                  <td className="p-4">
                    <span className="block font-bold">₹{product.price}</span>
                    {product.mrp > 0 && <span className="block text-xs text-white/40 line-through">₹{product.mrp}</span>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
