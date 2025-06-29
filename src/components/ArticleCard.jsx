import useNewsApi from "../hooks/useNewsApi";

const ArticleCard = ({ article }) => {
  const { articles, loading, error } = useNewsApi({
    category: "general",
    country: "us",
    pageSize: 16,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-[200px] object-cover"
        />
        <h2 className="text-2xl font-bold">{article.title}</h2>
        <p className="text-sm text-gray-500">{article.description}</p>
      </div>
    </>
  );
};

export default ArticleCard;
