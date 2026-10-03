"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!auth) throw new Error("Firebase Auth not initialized");
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A1F] px-4">
      <div className="max-w-md w-full bg-[#0A0F2A] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase font-heading">
            Toko Admin
          </h1>
          <p className="text-white/60 text-sm mt-2">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#02040D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#02040D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C4A77D] text-[#050A1F] font-bold py-3.5 rounded-lg uppercase tracking-widest hover:bg-[#B5956A] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
