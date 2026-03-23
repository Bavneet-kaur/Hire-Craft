import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Authentication/pages/login";
import Register from "../features/Authentication/pages/register";


 export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

