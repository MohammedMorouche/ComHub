import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    
    navigate(to);
    window.scrollTo(0, 0);
  };
    const isActive = location.pathname === to;
    return (
      <Link
      onClick={handleClick}
      to={to}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
    );
  };

  ActiveLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };
  export default ActiveLink;