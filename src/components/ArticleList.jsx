import ArticleCard from "./ArticleCard";
import Container from "./Container";
import useNewsApi from "../hooks/useNewsApi";
import { useCategoryContext } from "../context/CategoryContext";

const ArticleList = () => {
  const { selectedCategory } = useCategoryContext();
  const { articles, loading, error, isInitialLoad } = useNewsApi({
    category: selectedCategory,
    country: "us",
    pageSize: 15,
  });

  // Mostra il loading solo al primo caricamento
  if (isInitialLoad && loading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center text-red-500 dark:text-red-400 py-8">
          <p className="text-lg">Errore: {error}</p>
          <p className="text-sm mt-2">Riprova più tardi</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center pt-16 uppercase">
          {selectedCategory}
        </h1>

        {/* Indicatore di caricamento sottile per i cambi di categoria */}
        {loading && !isInitialLoad && (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-gray-600 dark:text-white text-sm">
              Aggiornamento...
            </div>
          </div>
        )}

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
