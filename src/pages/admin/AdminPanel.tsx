import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Dumbbell,
  Calendar,
  CreditCard,
  ClipboardList,
  Clock,
  Flag,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import DashboardTab from "./tabs/DashboardTab";
import ContentTab from "./tabs/ContentTab";
import ClassesTab from "./tabs/ClassesTab";
import ScheduleTab from "./tabs/ScheduleTab";
import MembershipsTab from "./tabs/MembershipsTab";
import RegistrationsTab from "./tabs/RegistrationsTab";
import HoursTab from "./tabs/HoursTab";
import BannersTab from "./tabs/BannersTab";
import SettingsTab from "./tabs/SettingsTab";

const tabComponents: Record<string, React.FC> = {
  dashboard: DashboardTab,
  content: ContentTab,
  classes: ClassesTab,
  schedule: ScheduleTab,
  memberships: MembershipsTab,
  registrations: RegistrationsTab,
  hours: HoursTab,
  banners: BannersTab,
  settings: SettingsTab,
};

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "content", label: "Page Content", icon: FileText },
  { key: "classes", label: "Classes", icon: Dumbbell },
  { key: "schedule", label: "Schedule", icon: Calendar },
  { key: "memberships", label: "Memberships", icon: CreditCard },
  { key: "registrations", label: "Registrations", icon: ClipboardList },
  { key: "hours", label: "Hours", icon: Clock },
  { key: "banners", label: "Banners", icon: Flag },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { token, isAdmin, logout } = useAuthStore();

  useEffect(() => {
    if (!token || !isAdmin) {
      navigate("/admin/login");
    }
  }, [token, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (!token || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="w-64 bg-charcoal text-white flex flex-col">
        <div className="p-6 border-b border-charcoal-light">
          <h1 className="text-teal font-extrabold text-xl">MBB Admin</h1>
          <p className="text-gray-400 text-xs mt-1">Mind and Body by Bre</p>
        </div>

        <nav className="flex-1 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-teal text-white"
                  : "text-gray-300 hover:bg-charcoal-light hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-charcoal-light">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-charcoal capitalize">
            {tabs.find((t) => t.key === activeTab)?.label}
          </h2>
          <p className="text-charcoal-light text-sm mt-1">
            Manage your {activeTab} settings and data.
          </p>
        </div>

        {(() => {
          const TabComponent = tabComponents[activeTab];
          return TabComponent ? <TabComponent /> : null;
        })()}
      </main>
    </div>
  );
}
