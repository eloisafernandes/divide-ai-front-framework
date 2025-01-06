import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import MainLayout from "@/pages/layouts/MainLayout";
import { RegisterPage } from "@/pages/login/RegisterPage";
import { CategoryPage } from "@/pages/category/CategoryPage";
import { TransacionPage } from "@/pages/transacion/TransacionPage";
import { PrivateRoutes } from "./pages/PrivateRoutes";
import { Trips } from "./pages/trips/Trips";
import { GroupTransactionDetails } from "@/pages/trips/GroupTransactionDetails";
import { useEffect } from "react";
import { initializeAxios } from "./services/api";
import { TripDetails } from "./pages/trips/TripDetails";
import { AIPrediction } from "./pages/ai/AIPrediction";

function Element({ children }: { children: JSX.Element }) {  
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Axios with a callback function to redirect
    initializeAxios(() => navigate('/login'));
  }, [navigate]);
  
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "*",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Element children={<HomePage />} />,
      },
      {
        path: "/viagens",
        element: <Element children={<Trips />} />,
      },
      {
        path: "/viagens/:id",
        element: <Element children={<TripDetails />} />, 
      },
      {
        path: "/categorias",
        element: <Element children={<CategoryPage />} />
      },
      {
        path: "/transacoes",
        element: <Element children={<TransacionPage />} />
      },
      {
        path: "/details/:id",
        element: <Element children={<GroupTransactionDetails />} />
      },
      {
        path: "/previsao-ia",
        element: <Element children={<AIPrediction />} />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
