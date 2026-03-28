import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Check } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface HoursItem {
  _id: string;
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export default function HoursTab() {
  const [items, setItems] = useState<HoursItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [edits, setEdits] = useState<Record<string, Partial<HoursItem>>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const token = useAuthStore((s) => s.token);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_ENDPOINTS.admin.hours, { headers });
        const data = Array.isArray(res.data) ? res.data : [];
        setItems(data);
        const e: Record<string, Partial<HoursItem>> = {};
        data.forEach((h: HoursItem) => {
          e[h._id] = { open: h.open, close: h.close, isClosed: h.isClosed };
        });
        setEdits(e);
      } catch {
        setError("Failed to load hours.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async (id: string) => {
    try {
      setSaving((p) => ({ ...p, [id]: true }));
      await axios.put(`${API_ENDPOINTS.admin.hours}/${id}`, edits[id], { headers });
      setSaved((p) => ({ ...p, [id]: true }));
      setTimeout(() => setSaved((p) => ({ ...p, [id]: false })), 2000);
    } catch {
      alert("Failed to save hours.");
    } finally {
      setSaving((p) => ({ ...p, [id]: false }));
    }
  };

  const updateEdit = (id: string, field: string, value: string | boolean) => {
    setEdits((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  };

  if (loading) return <p className="text-charcoal-light">Loading hours...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item._id} className="card p-4 flex flex-wrap items-center gap-4">
          <p className="font-bold text-charcoal w-28">{item.day}</p>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={edits[item._id]?.isClosed ?? item.isClosed}
              onChange={(e) => updateEdit(item._id, "isClosed", e.target.checked)}
              className="accent-teal w-4 h-4"
            />
            Closed
          </label>
          <div className="flex items-center gap-2">
            <label className="text-sm text-charcoal-light">Open</label>
            <input
              type="time"
              value={edits[item._id]?.open ?? item.open}
              onChange={(e) => updateEdit(item._id, "open", e.target.value)}
              disabled={edits[item._id]?.isClosed}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal disabled:opacity-40"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-charcoal-light">Close</label>
            <input
              type="time"
              value={edits[item._id]?.close ?? item.close}
              onChange={(e) => updateEdit(item._id, "close", e.target.value)}
              disabled={edits[item._id]?.isClosed}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal disabled:opacity-40"
            />
          </div>
          <button
            onClick={() => handleSave(item._id)}
            disabled={saving[item._id]}
            className="btn-primary px-4 py-1.5 flex items-center gap-1 text-sm disabled:opacity-50 ml-auto"
          >
            {saved[item._id] ? <Check size={14} /> : <Save size={14} />}
            {saving[item._id] ? "Saving..." : saved[item._id] ? "Saved" : "Save"}
          </button>
        </div>
      ))}
      {items.length === 0 && <p className="text-charcoal-light text-center py-8">No hours configured.</p>}
    </div>
  );
}
