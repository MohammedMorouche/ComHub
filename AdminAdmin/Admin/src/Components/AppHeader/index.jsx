import { Image, Space } from "antd";
import Comhubimg from "../../assets/ComHub__1_-removebg-preview.png";

function AppHeader() {
  return (
    <div className="AppHeader">
      <img className="logostyle" src={Comhubimg} alt="ComHub logo" />
      <h1 className="titlestyle">
        Com<span style={{ color: "red" }}>Hub</span> dashboard
      </h1>
      <Space />
    </div>
  );
}

export default AppHeader;