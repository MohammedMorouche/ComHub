import {Menu} from "antd"
import { UserOutlined,ShoppingCartOutlined ,AppstoreOutlined,ShopOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
function Sidebar(){

    const navigate = useNavigate();
    return <div className="Sidebar">
        
        

        <Menu
        onClick={(item)=>{

            navigate(item.key);
        }}
         mode="inline"
         items={[

            {
                label:"dashboard",
               icon : <AppstoreOutlined/>,
                key:'/'
               
            },
            {
                label:" Produits",
                icon :<ShopOutlined/>,
                key:'/Produits'
            },
            {
                label:" AddProduct",
                icon :<ShopOutlined/>,
                key:'/AddProduits'

            },
            {
                label:"Clients",
                icon:<UserOutlined />,
                key:'/Clients'
            },
            {
                label:"Commandes",
                icon : <ShoppingCartOutlined />,
                key:'/Commandes'
            }
        ]}
        ></Menu>
    </div>

}
export default Sidebar