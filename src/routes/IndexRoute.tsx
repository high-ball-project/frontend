import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";

const WritePage = lazy(() => import("../pages/WritePage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const IndexPage = lazy(() => import("../pages/IndexPage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const FindPage = lazy(() => import("../pages/FindPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));

const IndexRoute: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout middleGNB topVisual />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/detail",
        element: <DetailPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/find",
    element: <FindPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
];

export default IndexRoute;
