import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import LandingPage from "../LandingPage";
import LoginForm from "../../features/auth/LoginForm";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
