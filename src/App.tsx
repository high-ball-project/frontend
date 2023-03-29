import AppWrapper from "@components/AppWrapper";
import Splash from "@components/Splash";
import useAuth from "@store/useAuth";
import { defaultTheme } from "@theme/theme";
import { BrowserRouter } from "react-router-dom";

import devfiveIcon from "../devfiveicon.svg";
import RootRoutes from "./routes/RootRoute";

export default function App() {
  const { loaded } = useAuth();

  return (
    <AppWrapper appTheme={defaultTheme}>
      <Splash companyName="devfive" imageSrc={devfiveIcon} show={!loaded} />
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </AppWrapper>
  );
}
