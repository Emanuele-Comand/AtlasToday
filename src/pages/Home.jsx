import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ArticleList from "../components/ArticleList";

function Home() {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Hero />
      <ArticleList />
    </div>
  );
}

export default Home;
