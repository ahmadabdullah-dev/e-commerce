import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginForm from "../../features/auth/LoginForm";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <App /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);
