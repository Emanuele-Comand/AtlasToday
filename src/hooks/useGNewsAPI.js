import { useState, useEffect } from "react";

// Usiamo GNews.io API
const GNEWS_API_BASE_URL = "https://gnews.io/api/v4/";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Log per debug
console.log("All env variables:", import.meta.env);
console.log(
  "API Key loaded:",
  API_KEY ? "YES" : "NO",
  API_KEY ? API_KEY.substring(0, 8) + "..." : "undefined"
);

// Cache per memorizzare i risultati delle API calls
const cache = new Map();

/**
 * Hook per utilizzare l'API di NewsAPI.org con proxy CORS
 * @param {object} params
 * @param {string} params.country
 * @param {string} params.category
 * @param {string} params.q
 * @param {string} params.max
 * @returns {Promise<object>}
 */

export default function useNewsAPIWithProxy({
  category = "general",
  country = "us",
  q = "",
  max = 9,
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      // Crea una chiave unica per la cache
      const cacheKey = `${category}-${country}-${q}-${max}`;

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
        // Verifica se l'API key è disponibile
        if (!API_KEY) {
          throw new Error(
            "API key non configurata. Configura VITE_NEWS_API_KEY su Cloudflare Pages."
          );
        }

        // Aggiungi un piccolo delay per evitare rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));

        let url;

        if (q) {
          // Ricerca per keyword
          url = `${GNEWS_API_BASE_URL}search?q=${encodeURIComponent(
            q
          )}&country=${country}&max=${max}&apikey=${API_KEY}`;
        } else {
          // Top headlines per categoria
          url = `${GNEWS_API_BASE_URL}top-headlines?category=${category}&country=${country}&max=${max}&apikey=${API_KEY}`;
        }

        console.log("GNews API URL:", url);

        const response = await fetch(url);

        console.log("GNews API Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("GNews API Error response:", errorText);

          if (response.status === 401) {
            throw new Error(
              "API key non valida. Verifica la configurazione su Cloudflare Pages."
            );
          }

          if (response.status === 429) {
            throw new Error(
              "Troppe richieste API. Aspetta qualche secondo e riprova."
            );
          }

          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("GNews API Data:", data);

        // Log per debug delle immagini
        if (data.articles && data.articles.length > 0) {
          console.log("Primo articolo - Immagine:", data.articles[0].image);
          console.log("Primo articolo - URL:", data.articles[0].url);
        }

        if (data.errors && data.errors.length > 0) {
          const errorMessage = data.errors[0];
          if (errorMessage.includes("activate your account")) {
            throw new Error(
              "Account GNews.io non attivato. Controlla la tua email e attiva l'account su gnews.io/dashboard"
            );
          }
          if (errorMessage.includes("too many requests")) {
            throw new Error(
              "Troppe richieste API. Aspetta qualche secondo e riprova."
            );
          }
          throw new Error(errorMessage);
        }

        const articlesData = (data.articles || []).map((article) => ({
          ...article,
          // Mappa i campi GNews.io ai campi attesi dai componenti
          urlToImage: article.image || null,
          publishedAt:
            article.publishedAt ||
            article.published_at ||
            new Date().toISOString(),
          source: {
            id: article.source?.id || null,
            name: article.source?.name || "Unknown",
            url: article.source?.url || null,
          },
        }));

        // Salva i dati in cache
        cache.set(cacheKey, articlesData);

        setArticles(articlesData);
        setError(null);
      } catch (error) {
        console.error("NewsAPI Error:", error);
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchNews();
  }, [country, category, q, max, isInitialLoad]);

  return { articles, loading, error, isInitialLoad };
}
