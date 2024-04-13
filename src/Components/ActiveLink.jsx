import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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
  export default ActiveLink;