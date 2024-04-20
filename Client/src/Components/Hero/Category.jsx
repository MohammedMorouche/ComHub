import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ActiveLink from "../ActiveLink";
import ScrollToTop from "../ScrollToTop";
const Category = ({ image, imageHover, title, cat }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="category"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ActiveLink to={cat}>
        <img src={isHovered ? imageHover : image} alt={title} loading="lazy" />
        <h2>{title}</h2>
      </ActiveLink>
    </div>
  );
};

Category.propTypes = {
  image: PropTypes.string.isRequired,
  imageHover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
};

export default Category;
