import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import useNewsApi from "../hooks/useNewsApi";

const Hero = () => {
  const { articles, loading, error } = useNewsApi({
    category: "general",
    country: "us",
    pageSize: 16,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articles || articles.length === 0) return <div>No articles found</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff !important;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.2);
        }

        .swiper-pagination-bullet {
          background-color: #ffffff !important;
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
          opacity: 1;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={article.urlToImage || "/src/assets/atlas_today_banner.png"}
              alt={`hero-${index}`}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl font-semibold text-center z-10">
                  {article.title}
                </h1>
                <p className="text-white text-md text-center z-10 max-w-[500px] pt-4">
                  {article.description}
                </p>
                <div className="flex items-center text-xs justify-center pt-4 gap-8 max-w-[500px]">
                  <div className="flex items-center text-xs italic text-white">
                    {article.author}
                  </div>
                  <div className="flex items-center text-sm italic text-white justify-center max-w-[100px]">
                    {article.source.name}
                  </div>
                </div>
                <div className="flex items-center text-white justify-center pt-4">
                  {formatDate(article.publishedAt)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
