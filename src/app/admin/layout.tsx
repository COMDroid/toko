"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Tags, Package, Settings, LogOut, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
        
        {!isLoginPage && (
          <>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                onClick={closeMobileMenu}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed md:static inset-y-0 left-0 z-50
              w-64 border-r border-white/10 flex flex-col bg-[#111]
              transform transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-widest font-heading uppercase">TOKO ADMIN</h1>
                <button 
                  className="md:hidden text-white/70 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                <Link onClick={closeMobileMenu} href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                  <LayoutDashboard className="w-5 h-5 text-white/70" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link onClick={closeMobileMenu} href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-white/70" />
                  <span className="font-medium">Products</span>
                </Link>
                <Link onClick={closeMobileMenu} href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Tags className="w-5 h-5 text-white/70" />
                  <span className="font-medium">Categories</span>
                </Link>
                <Link onClick={closeMobileMenu} href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Package className="w-5 h-5 text-white/70" />
                  <span className="font-medium">Orders</span>
                </Link>
                <Link onClick={closeMobileMenu} href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
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
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          {!isLoginPage && (
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#111]">
              <h1 className="text-xl font-bold tracking-widest font-heading uppercase">TOKO ADMIN</h1>
              <button 
                className="text-white/70 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
