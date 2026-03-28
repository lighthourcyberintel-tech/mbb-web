import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface ClassItem {
  _id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  capacity: number;
  isActive: boolean;
}

const emptyForm = {
  name: "",
  description: "",
  duration: 60,
  level: "All Levels",
  capacity: 20,
  isActive: true,
};

export default function ClassesTab() {
  const [items, setItems] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const token = useAuthStore((s) => s.token);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.admin.classes, { headers });
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load classes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.admin.classes}/${editingId}`, form, { headers });
      } else {
        await axios.post(API_ENDPOINTS.admin.classes, form, { headers });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await fetchItems();
    } catch {
      alert("Failed to save class.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: ClassItem) => {
    setForm({
      name: item.name,
      description: item.description,
      duration: item.duration,
      level: item.level,
      capacity: item.capacity,
      isActive: item.isActive,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this class?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.admin.classes}/${id}`, { headers });
      await fetchItems();
    } catch {
      alert("Failed to delete class.");
    }
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <p className="text-charcoal-light">Loading classes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { cancelForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Class
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-charcoal">{editingId ? "Edit Class" : "New Class"}</h3>
            <button type="button" onClick={cancelForm} className="text-charcoal-light hover:text-charcoal"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duration (min)</label>
              <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Capacity</label>
              <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: +e.target.value })} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-y" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-teal w-4 h-4" />
            Active
          </label>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
            {submitting ? "Saving..." : editingId ? "Update Class" : "Create Class"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-charcoal">{item.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.isActive ? "bg-teal/10 text-teal" : "bg-gray-200 text-gray-500"}`}>
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-charcoal-light">{item.level} · {item.duration} min · Capacity: {item.capacity}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-teal hover:text-teal-dark p-1"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-charcoal-light text-center py-8">No classes found.</p>}
      </div>
    </div>
  );
}
