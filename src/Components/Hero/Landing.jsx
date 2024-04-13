import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="landing">
        <div className="overlay"></div>
        <div className="od">
          <h1>
            Com<span>Hub</span>
          </h1>
          <p>Réinventez votre expérience informatique</p>

          <h2>Explorez dès maintenant!</h2>
          <Link to="/shop"><button className="button-ani">Shop</button></Link>
          
        </div>
      </div>
    </>
  );
}
export default Landing;
