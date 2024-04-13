import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ to, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick}>  
      {children}
    </Link>
  );
};
ScrollToTop.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default ScrollToTop;
