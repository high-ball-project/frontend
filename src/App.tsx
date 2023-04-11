import AppWrapper from "@components/AppWrapper";
import { defaultTheme } from "@theme/theme";
import { BrowserRouter } from "react-router-dom";

import RootRoutes from "./routes/RootRoute";

export default function App() {
  return (
    <AppWrapper appTheme={defaultTheme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RootRoutes />
      </BrowserRouter>
    </AppWrapper>
  );
}
