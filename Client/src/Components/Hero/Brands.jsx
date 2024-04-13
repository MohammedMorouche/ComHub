import { data } from "./DataBrands";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect } from "react";
const Brands = () => {
  // useEffect(() => {
  //   const copy = document.querySelector(".three").cloneNode(true);
  //   document.querySelector(".logos").appendChild(copy);
  // }, []);
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 1200;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1200;
  };
  return (
    <div className="brands">
      <div className="container">
        <h1>Brands</h1>
        <div className="one">
          <MdChevronLeft className="two" onClick={slideLeft} size={60} />
          <div className="logos" id="slider">
            <div className="three">
              {data.map((item) => (
                <img key={item.id} className="four" src={item.img} alt="/" />
              ))}
            </div>
          </div>

          <MdChevronRight className="two" onClick={slideRight} size={60} />
        </div>
      </div>
    </div>
  );
};
export default Brands;
