import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Check } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface SettingItem {
  _id: string;
  key: string;
  value: string;
}

export default function SettingsTab() {
  const [items, setItems] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const token = useAuthStore((s) => s.token);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_ENDPOINTS.admin.settings, { headers });
        const data = Array.isArray(res.data) ? res.data : [];
        setItems(data);
        const vals: Record<string, string> = {};
        data.forEach((s: SettingItem) => {
          vals[s._id] = s.value;
        });
        setEditValues(vals);
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async (id: string) => {
    try {
      setSaving((p) => ({ ...p, [id]: true }));
      await axios.put(`${API_ENDPOINTS.admin.settings}/${id}`, { value: editValues[id] }, { headers });
      setSaved((p) => ({ ...p, [id]: true }));
      setTimeout(() => setSaved((p) => ({ ...p, [id]: false })), 2000);
    } catch {
      alert("Failed to save setting.");
    } finally {
      setSaving((p) => ({ ...p, [id]: false }));
    }
  };

  if (loading) return <p className="text-charcoal-light">Loading settings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item._id} className="card p-4">
          <label className="block text-sm font-semibold text-charcoal mb-1">{item.key}</label>
          <div className="flex gap-2">
            <input
              value={editValues[item._id] || ""}
              onChange={(e) => setEditValues((p) => ({ ...p, [item._id]: e.target.value }))}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <button
              onClick={() => handleSave(item._id)}
              disabled={saving[item._id]}
              className="btn-primary px-4 py-2 flex items-center gap-1 disabled:opacity-50"
            >
              {saved[item._id] ? <Check size={14} /> : <Save size={14} />}
              {saving[item._id] ? "Saving..." : saved[item._id] ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-charcoal-light text-center py-8">No settings found.</p>}
    </div>
  );
}
