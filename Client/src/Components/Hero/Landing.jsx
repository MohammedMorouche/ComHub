import ActiveLink from '../ActiveLink';
import lan from "../../images/nature-morte-livres-contre-technologie.jpg"
function Landing() {
  return (
    <>
      <div className="landing">
        <div className="overlay"></div>  
        <div className='kad'>
          <img src={lan} alt="" />
          </div>
        <div className="od">
          <h1>
            Com<span>Hub</span>
          </h1>
          <p>Réinventez votre expérience informatique</p>

          <h2>Explorez dès maintenant!</h2>
          <ActiveLink to="/shop/all"><button className="button-ani">Shop</button></ActiveLink>
          
        </div>
      </div>
    </>
  );
}
export default Landing;
