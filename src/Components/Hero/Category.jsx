import  { useState } from 'react';
import PropTypes from 'prop-types';

const Category = ({ image, imageHover, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="category" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <a href="">
        <img src={isHovered ? imageHover : image} alt={title} loading="lazy" />
        <h2>{title}</h2>
      </a>
    </div>
  );
};

Category.propTypes = {
  image: PropTypes.string.isRequired,
  imageHover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Category;

