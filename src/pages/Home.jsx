import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ArticleList from "../components/ArticleList";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ArticleList />
      <Footer />
    </div>
  );
}

export default Home;
