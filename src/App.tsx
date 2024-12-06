import { env } from "./core/env";
import { Router } from "./router/main";

function App() {
  console.log(env.api);
  return <Router />;
}

export default App;
