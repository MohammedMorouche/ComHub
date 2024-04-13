import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Feat = ({ text, iconName, paragraph }) => {
  return (
    <div className="feat">
      <FontAwesomeIcon icon={iconName} className="fontFeatures" />
      <h3>{text}</h3>
      <p>{paragraph}</p>
    </div>
  );
};

Feat.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};
export default Feat;
