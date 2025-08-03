import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/user.regsiter";
import Login from "./pages/user.login";
import Home from "./pages/Home";
import UserProtectedRoutes from "./components/protectedRoutes/user.protected.routes";
import AdminLogin from "./pages/admin.login";
import Dashboard from "./pages/Dashboard";
import AdminProtectedRoutes from "./components/protectedRoutes/admin.protected.routes";
import AddProduct from "./pages/addProduct";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import AdminLayout from "./pages/AdminLayout";

const router = createBrowserRouter([
   {
    path:"/",
    element:<UserProtectedRoutes><Home/></UserProtectedRoutes>
   },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/shop",
    element: <UserProtectedRoutes><Shop /></UserProtectedRoutes>,
  },
  {
    path: "/cart",
    element: <UserProtectedRoutes><Cart /></UserProtectedRoutes>,
  },

 
  {
    path: "/admin",
    element: <AdminProtectedRoutes><AdminLayout /></AdminProtectedRoutes>,
    children: [
        { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "product", element: <Product /> },
      { path: "addProduct", element: <AddProduct /> },
      { path: "EditProduct", element: <EditProduct /> },
      { path: "orders", element: <Orders /> }
    ]
  }
]);

export default router;
