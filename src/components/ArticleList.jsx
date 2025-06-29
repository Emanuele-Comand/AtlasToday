import ArticleCard from "./ArticleCard";
import Container from "./Container";
import useNewsApi from "../hooks/useNewsApi";
import { useCategoryContext } from "../context/CategoryContext";

const ArticleList = () => {
  const { selectedCategory } = useCategoryContext();
  const { articles, loading, error } = useNewsApi({
    category: selectedCategory,
    country: "us",
    pageSize: 16,
  });

  if (loading) {
    return (
      <Container>
        <div className="text-center text-white">Caricamento...</div>
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
        <h1 className="text-3xl font-bold text-white text-center pt-16 uppercase">
          {selectedCategory}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-16 pb-16">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ArticleList;
