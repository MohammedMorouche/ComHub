import PropTypes from "prop-types";
const Produit = ({ imgSrc, titreProduit, prixProduit }) => {
  return (
    <div className="produit">
      <a href="">
        <img src={imgSrc} alt="" />
        <h4 className="titreDeProduit">{titreProduit}</h4>
        <h5 className="PrixDeProduit">{prixProduit}</h5>
        <button className="button-ani">Ajouter au panier</button>
      </a>
    </div>
  );
};
Produit.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  titreProduit: PropTypes.string.isRequired,
  prixProduit: PropTypes.string.isRequired,
};
export default Produit;
