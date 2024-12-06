import { env } from "./core/env";
import { Router } from "./router/main";

function App() {
  console.log(env.api);
  const { DEV, PROD, SSR, BASE_URL, MODE } = import.meta.env;
  console.log({ DEV, PROD, SSR, BASE_URL, MODE });
  return <Router />;
}

export default App;
