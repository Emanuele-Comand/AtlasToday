import ArticleCard from "./ArticleCard";
import Container from "./Container";
import useNewsApi from "../hooks/useNewsApi";

const ArticleList = () => {
  const { articles, loading, error } = useNewsApi({
    category: "general",
    country: "us",
    pageSize: 16,
  });

  if (loading) {
    return (
      <Container>
        <div className="text-center">Caricamento...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center text-red-500">Errore: {error}</div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-16">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ArticleList;
