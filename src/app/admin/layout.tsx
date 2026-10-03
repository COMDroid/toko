"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Tags, Package, Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#0A0A0A] text-white">
        {/* Sidebar */}
        {!isLoginPage && (
        <aside className="w-64 border-r border-white/10 flex flex-col bg-[#111]">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-xl font-bold tracking-widest font-heading uppercase">TOKO ADMIN</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <LayoutDashboard className="w-5 h-5 text-white/70" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <ShoppingBag className="w-5 h-5 text-white/70" />
              <span className="font-medium">Products</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <Tags className="w-5 h-5 text-white/70" />
              <span className="font-medium">Categories</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <Package className="w-5 h-5 text-white/70" />
              <span className="font-medium">Orders</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <Settings className="w-5 h-5 text-white/70" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors w-full text-left">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
