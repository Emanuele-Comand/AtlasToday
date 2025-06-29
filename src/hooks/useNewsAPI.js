import { useState, useEffect } from "react";

const NEWS_API_BASE_URL = "https://newsapi.org/v2/";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Cache per memorizzare i risultati delle API calls
const cache = new Map();

/**
 * @param{object} params
 * @param{string} params.country
 * @param{string} params.category
 * @param{string} params.q
 * @param{string} params.pageSize
 * @param{string} params.page
 * @param{string} params.apiKey
 * @returns{Promise<object>}
 */

export default function useNewsApi({
  category = "general",
  country = "us",
  q = "",
  pageSize = 10,
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      // Crea una chiave unica per la cache
      const cacheKey = `${category}-${country}-${q}-${pageSize}`;

      // Se abbiamo già i dati in cache, usali immediatamente
      if (cache.has(cacheKey)) {
        setArticles(cache.get(cacheKey));
        setLoading(false);
        setError(null);
        setIsInitialLoad(false);
        return;
      }

      // Solo per il primo caricamento o se non abbiamo cache, mostra loading
      if (isInitialLoad) {
        setLoading(true);
      }

      setError(null);

      try {
        let url = `${NEWS_API_BASE_URL}top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`;
        if (q) {
          url += `&q=${encodeURIComponent(q)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} error`);
        }

        const data = await response.json();
        const articlesData = data.articles || [];

        // Salva i dati in cache
        cache.set(cacheKey, articlesData);

        setArticles(articlesData);
        setError(null);
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchNews();
  }, [country, category, q, pageSize, isInitialLoad]);

  return { articles, loading, error, isInitialLoad };
}
