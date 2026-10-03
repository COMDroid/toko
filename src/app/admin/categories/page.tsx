"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tags, Plus, Edit2, Trash2, Check, X, Layers } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newSubcategory, setNewSubcategory] = useState<{catId: string, text: string} | null>(null);

  const fetchCategories = async () => {
    if (!db) return;
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      const catArray = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        subcategories: doc.data().subcategories || []
      }));
      setCategories(catArray);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !db) return;
    
    setAdding(true);
    try {
      await addDoc(collection(db, "categories"), {
        name: newCategory.trim(),
        subcategories: [],
        createdAt: serverTimestamp()
      });
      setNewCategory("");
      await fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!db || !confirm("Are you sure you want to delete this category completely?")) return;
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async (id: string) => {
    if (!db || !editName.trim()) return;
    try {
      await updateDoc(doc(db, "categories", id), {
        name: editName.trim()
      });
      setCategories(categories.map(c => c.id === id ? { ...c, name: editName.trim() } : c));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  const handleAddSubcategory = async (catId: string, currentSubs: string[]) => {
    if (!newSubcategory || !newSubcategory.text.trim() || !db) return;
    const text = newSubcategory.text.trim();
    if (currentSubs.includes(text)) {
      setNewSubcategory(null);
      return;
    }
    const updatedSubs = [...currentSubs, text];
    try {
      await updateDoc(doc(db, "categories", catId), {
        subcategories: updatedSubs
      });
      setCategories(categories.map(c => c.id === catId ? { ...c, subcategories: updatedSubs } : c));
      setNewSubcategory(null);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleRemoveSubcategory = async (catId: string, currentSubs: string[], subToRemove: string) => {
    if (!db || !confirm(`Remove subcategory '${subToRemove}'?`)) return;
    const updatedSubs = currentSubs.filter(s => s !== subToRemove);
    try {
      await updateDoc(doc(db, "categories", catId), {
        subcategories: updatedSubs
      });
      setCategories(categories.map(c => c.id === catId ? { ...c, subcategories: updatedSubs } : c));
    } catch (error) {
      console.error("Error removing subcategory:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest font-heading">
          Categories & Subcategories
        </h1>
        <form onSubmit={handleAddCategory} className="flex w-full sm:w-auto gap-2">
          <input 
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Main Category..."
            className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C4A77D]"
            required
          />
          <button 
            type="submit"
            disabled={adding}
            className="bg-[#C4A77D] text-[#050A1F] px-4 py-2 rounded-lg font-bold hover:bg-[#B5956A] transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{adding ? "Adding..." : "Add"}</span>
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C4A77D]"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center p-12 bg-[#111] rounded-2xl border border-white/5">
          <Layers className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Categories Yet</h2>
          <p className="text-white/60">
            Create your first main category using the input above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors flex flex-col">
              
              {/* Main Category Header */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <Tags className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A77D]" />
                  </div>
                  {editingId === cat.id ? (
                    <input 
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded p-2 text-white focus:outline-none focus:border-[#C4A77D] text-sm sm:text-base w-full min-w-0"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(cat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                    />
                  ) : (
                    <h3 className="text-lg sm:text-xl font-bold uppercase truncate">{cat.name}</h3>
                  )}
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  {editingId === cat.id ? (
                    <>
                      <button onClick={() => saveEdit(cat.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded transition-colors">
                        <Check className="w-5 h-5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-white/50 hover:bg-white/10 rounded transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(cat)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit Main Category">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete Main Category">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Subcategories Section */}
              <div className="flex-1">
                <p className="text-xs uppercase text-white/40 font-bold mb-3 tracking-wider">Subcategories</p>
                <div className="flex flex-wrap gap-2">
                  {cat.subcategories.map((sub, i) => (
                    <div key={i} className="flex items-center gap-1 bg-black border border-white/10 px-3 py-1 rounded-full text-sm text-white/80">
                      <span className="uppercase">{sub}</span>
                      <button 
                        onClick={() => handleRemoveSubcategory(cat.id, cat.subcategories, sub)}
                        className="ml-1 p-0.5 text-white/40 hover:text-red-400 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {newSubcategory?.catId === cat.id ? (
                    <div className="flex items-center gap-1">
                      <input 
                        type="text"
                        value={newSubcategory.text}
                        onChange={(e) => setNewSubcategory({ ...newSubcategory, text: e.target.value })}
                        placeholder="new subcategory"
                        className="bg-black border border-[#C4A77D] px-3 py-1 rounded-full text-sm text-white focus:outline-none w-32"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddSubcategory(cat.id, cat.subcategories);
                          if (e.key === 'Escape') setNewSubcategory(null);
                        }}
                        onBlur={() => {
                          if(newSubcategory.text.trim()) handleAddSubcategory(cat.id, cat.subcategories);
                          else setNewSubcategory(null);
                        }}
                      />
                    </div>
                  ) : (
                    <button 
                      onClick={() => setNewSubcategory({ catId: cat.id, text: "" })}
                      className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-transparent border-dashed hover:border-white/20 px-3 py-1 rounded-full text-sm text-white/60 transition-all"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
