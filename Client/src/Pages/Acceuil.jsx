import Landing from "../Components/Hero/Landing";
import Features from "../Components/Hero/Features";
import NosCategories from "../Components/Hero/NosCategories";
import ProduitAlaUne from "../Components/Hero/ProduitAlaUne";
import ProduitEnPromotion from "../Components/Hero/ProduitEnPromotiom";
import Brands from "../Components//Hero/Brands";
import Header from "../Components/Header/Header"
const Acceuil = () => {
  return (
    <>
    <Header/>
      <Landing />
      <Features />
      <NosCategories />
      <ProduitAlaUne />
      <ProduitEnPromotion />
     <Brands />
    </>
  );
};
export default Acceuil;
