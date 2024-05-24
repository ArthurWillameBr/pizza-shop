import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/auth/signIn";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/signUp";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> }
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> }
  ],
  },
]);
