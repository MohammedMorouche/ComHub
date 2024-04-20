import { Image, Space, Typography } from "antd";
import Comhubimg from "../../assets/ComHub__1_-removebg-preview.png"

function AppHeader() {
    return (
        <div className="AppHeader">
          <img className="logostyle" src={Comhubimg} alt="ComHub logo" />

            <h1 className="titlestyle">ComHub dashboard</h1>
            <Space />
        </div>
    );
}

export default AppHeader;
