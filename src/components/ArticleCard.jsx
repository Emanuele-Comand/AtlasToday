import Container from "./Container";
import Button from "./Button";
import ArticleImage from "./ArticleImage";

const ArticleCard = ({ article }) => {
  return (
    <>
      <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <div className="h-[200px] mb-4">
          <ArticleImage
            src={article.urlToImage || article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3rem]">
            {article.title}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3 mb-4">
            {article.description}
          </p>

          <div className="flex justify-center mt-auto">
            <Button
              variant="primary"
              size="md"
              onClick={() => window.open(article.url, "_blank")}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
