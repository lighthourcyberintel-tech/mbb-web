import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipName: string;
  status: string;
}

const STATUSES = ["pending", "active", "cancelled", "expired"];

export default function RegistrationsTab() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const token = useAuthStore((s) => s.token);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.admin.registrations, { headers });
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setUpdating((p) => ({ ...p, [id]: true }));
      await axios.put(`${API_ENDPOINTS.admin.registrations}/${id}`, { status }, { headers });
      setItems((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdating((p) => ({ ...p, [id]: false }));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this registration?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.admin.registrations}/${id}`, { headers });
      await fetchItems();
    } catch {
      alert("Failed to delete registration.");
    }
  };

  if (loading) return <p className="text-charcoal-light">Loading registrations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="py-3 px-4 font-semibold text-charcoal">Name</th>
            <th className="py-3 px-4 font-semibold text-charcoal">Email</th>
            <th className="py-3 px-4 font-semibold text-charcoal">Phone</th>
            <th className="py-3 px-4 font-semibold text-charcoal">Membership</th>
            <th className="py-3 px-4 font-semibold text-charcoal">Status</th>
            <th className="py-3 px-4 font-semibold text-charcoal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r._id} className="border-b border-gray-100 hover:bg-cream-dark/50">
              <td className="py-3 px-4 text-charcoal">{r.firstName} {r.lastName}</td>
              <td className="py-3 px-4 text-charcoal-light">{r.email}</td>
              <td className="py-3 px-4 text-charcoal-light">{r.phone}</td>
              <td className="py-3 px-4 text-charcoal-light">{r.membershipName}</td>
              <td className="py-3 px-4">
                <select
                  value={r.status}
                  onChange={(e) => handleStatusChange(r._id, e.target.value)}
                  disabled={updating[r._id]}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal disabled:opacity-50"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleDelete(r._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <p className="text-charcoal-light text-center py-8">No registrations found.</p>}
    </div>
  );
}
