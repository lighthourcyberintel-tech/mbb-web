import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface MembershipItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  features: string[];
  isFeatured: boolean;
  sortOrder: number;
}

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  billingPeriod: "monthly",
  features: "",
  isFeatured: false,
  sortOrder: 0,
};

export default function MembershipsTab() {
  const [items, setItems] = useState<MembershipItem[]>([]);
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
      const res = await axios.get(API_ENDPOINTS.admin.memberships, { headers });
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load memberships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
    };
    try {
      setSubmitting(true);
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.admin.memberships}/${editingId}`, payload, { headers });
      } else {
        await axios.post(API_ENDPOINTS.admin.memberships, payload, { headers });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await fetchItems();
    } catch {
      alert("Failed to save membership.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: MembershipItem) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      billingPeriod: item.billingPeriod,
      features: item.features.join(", "),
      isFeatured: item.isFeatured,
      sortOrder: item.sortOrder,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this membership?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.admin.memberships}/${id}`, { headers });
      await fetchItems();
    } catch {
      alert("Failed to delete membership.");
    }
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <p className="text-charcoal-light">Loading memberships...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { cancelForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Membership
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-charcoal">{editingId ? "Edit Membership" : "New Membership"}</h3>
            <button type="button" onClick={cancelForm} className="text-charcoal-light hover:text-charcoal"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Price</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Billing Period</label>
              <select value={form.billingPeriod} onChange={(e) => setForm({ ...form, billingPeriod: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal">
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: +e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-y" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Features (comma separated)</label>
            <input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2, Feature 3" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-teal w-4 h-4" />
            Featured
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
                <p className="font-bold text-charcoal">{item.name}</p>
                {item.isFeatured && <span className="text-xs px-2 py-0.5 rounded-full bg-teal/10 text-teal">Featured</span>}
              </div>
              <p className="text-sm text-charcoal-light">${item.price}/{item.billingPeriod} · {item.features.length} features</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-teal hover:text-teal-dark p-1"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-charcoal-light text-center py-8">No memberships found.</p>}
      </div>
    </div>
  );
}
