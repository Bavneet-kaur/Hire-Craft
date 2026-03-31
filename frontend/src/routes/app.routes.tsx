import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Authentication/pages/login";
import Register from "../features/Authentication/pages/register";
import Home from "../features/AI/pages/home";
import Protected from "../features/Authentication/protected";

export const router = createBrowserRouter([
  {
    path: "/report/:reportId",
    element: <Protected><h1>hello report page</h1></Protected>,
  },
  {
    path: "/",
    element: <Protected><Home /></Protected>
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

