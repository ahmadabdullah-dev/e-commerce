import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import LandingPage from "../LandingPage";
import LoginForm from "../../features/auth/LoginForm";
import RegisterForm from "../../features/auth/RegisterForm";
import ForgetPasswordForm from "../../features/auth/ForgetPassword";
import ResetPasswordForm from "../../features/auth/ResetPasswordForm";
import RequireAuth from "./RequireAuth";
import ConfirmEmailForm from "../../features/auth/ConfirmEmailForm";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/confirm-email", element: <ConfirmEmailForm /> }],
      },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "forget-password", element: <ForgetPasswordForm /> },
      { path: "reset-password/:email", element: <ResetPasswordForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
