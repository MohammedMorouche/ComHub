import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
const ScrollToTop = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick}
    style={{
      fontWeight: location.pathname === to ? 'bold' : 'normal',
    }}
    >  
      {children}
    </Link>
  );
};  
ScrollToTop.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default ScrollToTop;
