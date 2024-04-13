import { Image, Space, Typography } from "antd";


function AppHeader() {
    return (
        <div className="AppHeader">
           <Image
        width={40}
        src=""
      ></Image>

            <Typography.Title style={{ margin: "0 auto" }}>ComHub</Typography.Title>
            <Space />
        </div>
    );
}

export default AppHeader;
