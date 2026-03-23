export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  content: (pageName: string) => `${API_BASE_URL}/api/content/${pageName}`,
  classes: `${API_BASE_URL}/api/classes`,
  schedule: `${API_BASE_URL}/api/schedule`,
  memberships: `${API_BASE_URL}/api/memberships`,
  settings: `${API_BASE_URL}/api/settings`,
  contact: `${API_BASE_URL}/api/contact`,
  login: `${API_BASE_URL}/api/auth/login`,
  admin: {
    content: `${API_BASE_URL}/api/admin/content`,
    classes: `${API_BASE_URL}/api/admin/classes`,
    schedule: `${API_BASE_URL}/api/admin/schedule`,
    memberships: `${API_BASE_URL}/api/admin/memberships`,
    registrations: `${API_BASE_URL}/api/admin/registrations`,
    settings: `${API_BASE_URL}/api/admin/settings`,
    hours: `${API_BASE_URL}/api/admin/hours`,
    banners: `${API_BASE_URL}/api/admin/banners`,
    upload: {
      image: `${API_BASE_URL}/api/upload/image`,
      pdf: `${API_BASE_URL}/api/upload/pdf`,
    },
  },
};
