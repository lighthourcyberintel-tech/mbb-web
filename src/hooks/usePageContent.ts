import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

interface UsePageContentReturn {
  content: Record<string, string>;
  loading: boolean;
  error: string | null;
  getSectionContent: (section: string, fallback?: string) => string;
  getSectionImage: (section: string, fallback?: string) => string;
}

export const usePageContent = (pageName: string): UsePageContentReturn => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(API_ENDPOINTS.content(pageName));
        setContent(response.data);
      } catch (err) {
        setError("Failed to load page content");
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  const getSectionContent = (section: string, fallback = ""): string => {
    return content[section] || fallback;
  };

  const getSectionImage = (section: string, fallback = ""): string => {
    return content[section] || fallback;
  };

  return {
    content,
    loading,
    error,
    getSectionContent,
    getSectionImage,
  };
};
