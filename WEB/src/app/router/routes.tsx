import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import LandingPage from "../LandingPage";
import LoginForm from "../../features/auth/LoginForm";
import RegisterForm from "../../features/auth/RegisterForm";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
