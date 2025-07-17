import { useState, useEffect } from "react";

// API gratuita senza API key
const FREE_NEWS_API = "https://newsdata.io/api/1/news";

// Cache per memorizzare i risultati delle API calls
const cache = new Map();

/**
 * Hook per utilizzare un'API di notizie gratuita
 * @param {object} params
 * @param {string} params.country
 * @param {string} params.category
 * @param {string} params.q
 * @param {string} params.max
 * @returns {Promise<object>}
 */

export default function useFreeNewsAPI({
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
        // Usa un'API gratuita di notizie
        const url = `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?api-key=demo`;

        console.log("Free News API URL:", url);

        const response = await fetch(url);

        console.log("Free News API Response status:", response.status);

        if (!response.ok) {
          // Fallback: usa dati di esempio
          console.log("Using fallback data");
          const fallbackData = [
            {
              title: "Breaking News: Technology Advances",
              description: "Latest developments in technology and innovation.",
              url: "#",
              urlToImage: "https://picsum.photos/400/200?random=1",
              publishedAt: new Date().toISOString(),
              source: { name: "Tech News" },
              author: "Tech Reporter",
            },
            {
              title: "Global Economy Update",
              description: "Current trends and analysis in the global economy.",
              url: "#",
              urlToImage: "https://picsum.photos/400/200?random=2",
              publishedAt: new Date().toISOString(),
              source: { name: "Economic Times" },
              author: "Economic Analyst",
            },
            {
              title: "Sports Highlights",
              description: "Today's top sports stories and achievements.",
              url: "#",
              urlToImage: "https://picsum.photos/400/200?random=3",
              publishedAt: new Date().toISOString(),
              source: { name: "Sports Central" },
              author: "Sports Reporter",
            },
          ];

          // Salva i dati in cache
          cache.set(cacheKey, fallbackData);

          setArticles(fallbackData);
          setError(null);
          return;
        }

        const data = await response.json();

        console.log("Free News API Data:", data);

        // Trasforma i dati nel formato atteso
        const articlesData = (data.results || [])
          .slice(0, max)
          .map((article) => ({
            title: article.title || "No title",
            description: article.abstract || "No description",
            url: article.url || "#",
            urlToImage:
              article.multimedia?.[0]?.url ||
              "https://picsum.photos/400/200?random=7",
            publishedAt: article.published_date || new Date().toISOString(),
            source: { name: article.source || "Unknown" },
            author: article.byline || "Unknown",
          }));

        // Salva i dati in cache
        cache.set(cacheKey, articlesData);

        setArticles(articlesData);
        setError(null);
      } catch (error) {
        console.error("Free News API Error:", error);

        // Fallback con dati di esempio
        const fallbackData = [
          {
            title: "Breaking News: Technology Advances",
            description: "Latest developments in technology and innovation.",
            url: "#",
            urlToImage: "https://picsum.photos/400/200?random=4",
            publishedAt: new Date().toISOString(),
            source: { name: "Tech News" },
            author: "Tech Reporter",
          },
          {
            title: "Global Economy Update",
            description: "Current trends and analysis in the global economy.",
            url: "#",
            urlToImage: "https://picsum.photos/400/200?random=5",
            publishedAt: new Date().toISOString(),
            source: { name: "Economic Times" },
            author: "Economic Analyst",
          },
          {
            title: "Sports Highlights",
            description: "Today's top sports stories and achievements.",
            url: "#",
            urlToImage: "https://picsum.photos/400/200?random=6",
            publishedAt: new Date().toISOString(),
            source: { name: "Sports Central" },
            author: "Sports Reporter",
          },
        ];

        setArticles(fallbackData);
        setError(null);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchNews();
  }, [country, category, q, max, isInitialLoad]);

  return { articles, loading, error, isInitialLoad };
}
