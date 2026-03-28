import { useState, useEffect } from "react";
import axios from "axios";
import { Save, Check } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface ContentItem {
  _id: string;
  pageName: string;
  section: string;
  content: string;
}

export default function ContentTab() {
  const [items, setItems] = useState<ContentItem[]>([]);
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
        const res = await axios.get(API_ENDPOINTS.admin.content, { headers });
        const data = Array.isArray(res.data) ? res.data : [];
        setItems(data);
        const vals: Record<string, string> = {};
        data.forEach((item: ContentItem) => {
          vals[item._id] = item.content;
        });
        setEditValues(vals);
      } catch {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async (id: string) => {
    try {
      setSaving((p) => ({ ...p, [id]: true }));
      await axios.put(
        `${API_ENDPOINTS.admin.content}/${id}`,
        { content: editValues[id] },
        { headers }
      );
      setSaved((p) => ({ ...p, [id]: true }));
      setTimeout(() => setSaved((p) => ({ ...p, [id]: false })), 2000);
    } catch {
      alert("Failed to save content.");
    } finally {
      setSaving((p) => ({ ...p, [id]: false }));
    }
  };

  if (loading) return <p className="text-charcoal-light">Loading content...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const grouped = items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    (acc[item.pageName] ||= []).push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([page, pageItems]) => (
        <div key={page}>
          <h3 className="text-lg font-bold text-charcoal capitalize mb-3">
            {page}
          </h3>
          <div className="space-y-3">
            {pageItems.map((item) => (
              <div key={item._id} className="card p-4">
                <label className="block text-sm font-semibold text-charcoal-light mb-1">
                  {item.section}
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={editValues[item._id] || ""}
                    onChange={(e) =>
                      setEditValues((p) => ({ ...p, [item._id]: e.target.value }))
                    }
                    rows={2}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-y"
                  />
                  <button
                    onClick={() => handleSave(item._id)}
                    disabled={saving[item._id]}
                    className="btn-primary px-4 py-2 flex items-center gap-1 self-start disabled:opacity-50"
                  >
                    {saved[item._id] ? (
                      <Check size={16} />
                    ) : (
                      <Save size={16} />
                    )}
                    {saving[item._id] ? "Saving..." : saved[item._id] ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-charcoal-light text-center py-8">No content items found.</p>
      )}
    </div>
  );
}
