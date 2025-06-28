import { useState, useEffect, useCallback } from "react";

const NEWS_API_BASE_URL = "https://newsapi.org/v2/";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

/**
 * @param{object} params
 * @param{string} params.country
 * @param{string} params.category
 * @param{string} params.q
 * @param{string} params.pageSize
 * @param{string} params.page
 * @param{string} params.apiKey
 * @param{string} params.urlToImage
 * @returns{Promise<object>}
 */

export default function useNewsApi({
  category = "general",
  country = "us",
  q = "",
  pageSize = 10,
  urlToImage = "",
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${NEWS_API_BASE_URL}top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`;
      if (q) {
        url += `&q=${encodeURIComponent(q)}`;
      }
      if (urlToImage) {
        url += `&urlToImage=${encodeURIComponent(urlToImage)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} error`);
      }
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      setError(error.message || "Unkown error");
    } finally {
      setLoading(false);
    }
  }, [country, category, q, pageSize, urlToImage]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, fetchNews };
}
