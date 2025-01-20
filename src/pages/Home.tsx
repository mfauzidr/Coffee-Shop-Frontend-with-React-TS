import Navbar from "../components/Navbar";
import Main from "../components/Main";
import HomeArticle from "../components/HomeArticle";
import ProductHighlight from "../components/ProductHighlight";
import Stores from "../components/Stores";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";

const Home = () => {
  return (
    <>
      <Navbar bgColor={"bg-[rgba(0,0,0,0.5)]"} position={"fixed z-20"} />

      <Main />

      <HomeArticle />

      <ProductHighlight />

      <Stores />

      <Reviews />

      <Footer />

      <FloatingChat />
    </>
  );
};

export default Home;
