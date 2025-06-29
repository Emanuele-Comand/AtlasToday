import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ArticleList from "../components/ArticleList";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Hero />
      <ArticleList />
      <Footer />
    </div>
  );
}

export default Home;
