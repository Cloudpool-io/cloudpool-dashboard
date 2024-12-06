import { Router } from "./router/main";

function App() {
  const { DEV, PROD, SSR, MODE } = import.meta.env;
  console.log({
    DEV,
    PROD,
    SSR,
    MODE,
    CUSTOM_DEV: import.meta.env.VITE_API_URL_DEV,
    CUSTOM_PROD: import.meta.env.VITE_API_URL_PROD,
    CUSTOME_MODE_DEV: import.meta.env.VITE_MODE_DEV,
  });
  return <Router />;
}

export default App;
