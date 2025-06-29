import Container from "./Container";
import Button from "./Button";

const ArticleCard = ({ article }) => {
  return (
    <>
      <div className="flex flex-col h-[500px] bg-gray-800 rounded-lg p-6">
        <div className="h-[200px] mb-4">
          <img
            src={article.urlToImage || "src/assets/atlas_today_banner.png"}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3rem]">
            {article.title}
          </h2>

          <p className="text-sm text-gray-300 flex-grow line-clamp-3 mb-4">
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
