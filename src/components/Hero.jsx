import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import useNewsApi from "../hooks/useNewsApi";

const Hero = () => {
  const { articles, loading, error, fetchNews } = useNewsApi({
    category: "general",
    country: "us",
    pageSize: 1,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articles || articles.length === 0) return <div>No articles found</div>;

  const article = articles[0];

  console.log("Questi sono gli articoli", article);

  return (
    <div>
      <h1 className="text-white text-4xl font-semibold text-center">
        {article.title}
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="relative">
          <img
            src={article.urlToImage || "/src/assets/atlas_today_banner.png"}
            alt="hero"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-75"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
