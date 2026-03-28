import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface BannerItem {
  _id: string;
  message: string;
  type: string;
  isActive: boolean;
  link: string;
  linkText: string;
}

const emptyForm = {
  message: "",
  type: "info",
  isActive: true,
  link: "",
  linkText: "",
};

export default function BannersTab() {
  const [items, setItems] = useState<BannerItem[]>([]);
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
      const res = await axios.get(API_ENDPOINTS.admin.banners, { headers });
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load banners.");
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
        await axios.put(`${API_ENDPOINTS.admin.banners}/${editingId}`, form, { headers });
      } else {
        await axios.post(API_ENDPOINTS.admin.banners, form, { headers });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await fetchItems();
    } catch {
      alert("Failed to save banner.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: BannerItem) => {
    setForm({
      message: item.message,
      type: item.type,
      isActive: item.isActive,
      link: item.link || "",
      linkText: item.linkText || "",
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.admin.banners}/${id}`, { headers });
      await fetchItems();
    } catch {
      alert("Failed to delete banner.");
    }
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <p className="text-charcoal-light">Loading banners...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { cancelForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-charcoal">{editingId ? "Edit Banner" : "New Banner"}</h3>
            <button type="button" onClick={cancelForm} className="text-charcoal-light hover:text-charcoal"><X size={20} /></button>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-y" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal">
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Link URL</label>
              <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Link Text</label>
              <input value={form.linkText} onChange={(e) => setForm({ ...form, linkText: e.target.value })} placeholder="Learn More" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-teal w-4 h-4" />
            Active
          </label>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
            {submitting ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-charcoal">{item.message}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.isActive ? "bg-teal/10 text-teal" : "bg-gray-200 text-gray-500"}`}>
                  {item.isActive ? "Active" : "Inactive"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-charcoal-light capitalize">{item.type}</span>
              </div>
              {item.link && <p className="text-sm text-charcoal-light">{item.linkText || item.link}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-teal hover:text-teal-dark p-1"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-charcoal-light text-center py-8">No banners found.</p>}
      </div>
    </div>
  );
}
