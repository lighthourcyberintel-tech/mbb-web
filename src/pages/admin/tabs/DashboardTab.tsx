import { useState, useEffect } from "react";
import axios from "axios";
import { Dumbbell, Calendar, CreditCard, ClipboardList } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuthStore } from "../../../store/authStore";

interface DashboardCounts {
  classes: number;
  schedule: number;
  memberships: number;
  registrations: number;
}

export default function DashboardTab() {
  const [counts, setCounts] = useState<DashboardCounts>({
    classes: 0,
    schedule: 0,
    memberships: 0,
    registrations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useAuthStore((s) => s.token);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [classesRes, scheduleRes, membershipsRes, registrationsRes] =
          await Promise.all([
            axios.get(API_ENDPOINTS.admin.classes, { headers }),
            axios.get(API_ENDPOINTS.admin.schedule, { headers }),
            axios.get(API_ENDPOINTS.admin.memberships, { headers }),
            axios.get(API_ENDPOINTS.admin.registrations, { headers }),
          ]);
        setCounts({
          classes: Array.isArray(classesRes.data) ? classesRes.data.length : 0,
          schedule: Array.isArray(scheduleRes.data) ? scheduleRes.data.length : 0,
          memberships: Array.isArray(membershipsRes.data) ? membershipsRes.data.length : 0,
          registrations: Array.isArray(registrationsRes.data) ? registrationsRes.data.length : 0,
        });
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) return <p className="text-charcoal-light">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const cards = [
    { label: "Classes", count: counts.classes, icon: Dumbbell },
    { label: "Schedule Items", count: counts.schedule, icon: Calendar },
    { label: "Memberships", count: counts.memberships, icon: CreditCard },
    { label: "Registrations", count: counts.registrations, icon: ClipboardList },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c) => (
        <div key={c.label} className="card p-6 flex items-center gap-4">
          <div className="bg-teal/10 text-teal p-3 rounded-lg">
            <c.icon size={28} />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-charcoal">{c.count}</p>
            <p className="text-sm text-charcoal-light">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
