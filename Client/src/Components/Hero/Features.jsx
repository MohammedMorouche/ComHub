import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import Feat from "./Feat";
function Features() {
  return (
    <div className="features">
      <div className="container">
        <Feat
          text="Livraison gratuite"
          iconName={faTruckFast}
          paragraph="Profitez d'une livraison efficace et sûre, sans frais, dans les 58 wilayas"
        />
        <Feat
          text="Choix Varié"
          iconName={faComputer}
          paragraph="Découvrez une sélection diversifiée de produits informatiques pour répondre à tous vos besoins"
        />
        <Feat
          text="Service clientèle dédié"
          iconName={faHeadset}
          paragraph="Assistance personnalisée à votre disposition pour des achats sans tracas"
        />
      </div>
    </div>
  );
}

export default Features;
