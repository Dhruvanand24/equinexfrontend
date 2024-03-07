import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../layout/Main";
import Login from "../pages/Login";
import OrderList from "../pages/OrderList";
import AddEmployee from "../pages/AddEmployee";
import AddPartners from "../pages/AddPartners";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/orderlist",
          element:<OrderList/>
        },
        {
          path: "/allemployees",
          element:<AddEmployee />
        },
        {
          path: "/allpartners",
          element: <AddPartners />
        }

]},
{
  path: "/",
      element: <Login/>,
      children: [
        {
          path: "/login",
          element: <Login />
        },
      ]

}
        
   
  ]);
  
  export default router;