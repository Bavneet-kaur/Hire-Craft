import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Authentication/pages/login";
import Register from "../features/Authentication/pages/register";
import Protected from "../features/Authentication/protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><h1>Hello Home Page</h1></Protected>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  }
]);

