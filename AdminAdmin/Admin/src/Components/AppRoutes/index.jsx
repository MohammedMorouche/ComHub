
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "../../Pages/Dashboard"
import Produits from "../../Pages/Produits"
import Commandes from "../../Pages/Commandes"
import Clients from "../../Pages/Clients"
import AddProduct from "../../Pages/addproduct"
import UpdateProduct from "../../Pages/updateproduct"
function AppRoutes(){

    return (


        <Routes>
             <Route path="/" element={<Dashboard />}></Route>  
             <Route path="/Produits" element={<Produits/>}></Route>
             <Route path="/AddProduits" element={<AddProduct/>}></Route>
             <Route path="/modifier/:id" element={<UpdateProduct />} /> {}
             <Route path="/Clients" element={<Clients/>}></Route>
             <Route path="/Commandes" element={<Commandes/>}></Route>
        </Routes>


    );

}
export default AppRoutes