"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, ShoppingBag, Package, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      if (!db) return;
      try {
        const productsSnap = await getDocs(collection(db, "products"));
        const ordersSnap = await getDocs(collection(db, "orders"));
        
        let revenue = 0;
        ordersSnap.forEach((doc) => {
          revenue += doc.data().total || 0;
        });

        setStats({
          totalProducts: productsSnap.size,
          totalOrders: ordersSnap.size,
          revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest font-heading">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-white/60 font-medium">Total Products</h2>
          </div>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-white/60 font-medium">Total Orders</h2>
          </div>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <h2 className="text-white/60 font-medium">Total Revenue</h2>
          </div>
          <p className="text-4xl font-bold">₹{stats.revenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-white/60 font-medium">Active Users</h2>
          </div>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
