import User from "@interfaces/User";
import AuthRoute from "@routes/AuthRoute";
import IndexRoute from "@routes/IndexRoute";
import useAuth from "@store/useAuth";
import { useMemo } from "react";
import { Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const RootRoute = () => {
  const { user } = useAuth<User>();
  const routes: RouteObject[] = useMemo(
    () => [...IndexRoute, ...(user ? AuthRoute : [])],
    [user]
  );

  return <Suspense>{useRoutes(routes)}</Suspense>;
};

export default RootRoute;
