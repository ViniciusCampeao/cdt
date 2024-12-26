import PhoneExtractor from "../components/Extract";
import Footer from "../components/Footer";
import Header from "../components/Header";

const extractPhoneNumbers = () => {
  return (
    <div>
      <Header />  
      <PhoneExtractor />
      <Footer />
    </div>
  );
};

export default extractPhoneNumbers;