import Footer from "../components/Footer";
import Header from "../components/Header";
import StartPage from "../components/StartPage";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <StartPage />
      <Footer />
    </div>
  );
}

export default Home;