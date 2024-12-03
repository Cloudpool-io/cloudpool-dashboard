import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          <App />
          <Toaster />
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
