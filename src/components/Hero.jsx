import { useNewsApi } from "../hooks/useNewsApi";

const Hero = () => {
  const { articles, loading, error, fetchNews } = useNewsApi({
    category: "general",
    country: "us",
    pageSize: 1,
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="">
        <img
          src="/src/assets/atlas_today_banner.png"
          alt="hero"
          className="w-full h-[600px] object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
