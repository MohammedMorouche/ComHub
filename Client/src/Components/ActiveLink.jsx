import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ActiveLink = ({ to, children }) => {
    const location = useLocation();
    return (
      <Link
        to={to}
          
        style={{
          fontWeight: location.pathname === to ? 'bold' : 'normal',
        }}
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