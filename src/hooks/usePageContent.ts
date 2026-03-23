import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

interface PageContentItem {
  id: string;
  pageName: string;
  section: string;
  type: "text" | "image";
  content: string;
  imageUrl: string;
  updatedAt: string;
}

interface UsePageContentReturn {
  content: PageContentItem[];
  loading: boolean;
  error: string | null;
  getSectionContent: (section: string, fallback?: string) => string;
  getSectionImage: (section: string, fallback?: string) => string;
}

export const usePageContent = (pageName: string): UsePageContentReturn => {
  const [content, setContent] = useState<PageContentItem[]>([]);
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
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  const getSectionContent = (section: string, fallback = ""): string => {
    const item = content.find(
      (c) => c.section === section && c.type === "text"
    );
    return item?.content || fallback;
  };

  const getSectionImage = (section: string, fallback = ""): string => {
    const item = content.find(
      (c) => c.section === section && c.type === "image"
    );
    return item?.imageUrl || fallback;
  };

  return {
    content,
    loading,
    error,
    getSectionContent,
    getSectionImage,
  };
};
