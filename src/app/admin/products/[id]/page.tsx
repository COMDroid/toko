"use client";

import { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductForm from "@/components/admin/ProductForm";
import { useRouter } from "next/navigation";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      if (!db) return;
      try {
        const docRef = doc(db, "products", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          router.push("/admin/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [resolvedParams.id, router]);

  if (loading) {
    return <div className="p-8 text-white/50">Loading product...</div>;
  }

  return (
    <div className="p-8">
      {product && <ProductForm initialData={product} isEdit />}
    </div>
  );
}
