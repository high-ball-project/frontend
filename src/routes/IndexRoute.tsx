import ResultPage from "@pages/ResultPage";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";

const WritePage = lazy(() => import("../pages/WritePage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const IndexPage = lazy(() => import("../pages/IndexPage"));
const BoardPage = lazy(() => import("../pages/BoardPage"));
const NoticePage = lazy(() => import("../pages/NoticePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const FindPage = lazy(() => import("../pages/FindPage"));
const PredictPage = lazy(() => import("../pages/PredictPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));

const IndexRoute: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout topVisual />,
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
        path: "/board/:id",
        element: <DetailPage />,
      },
      {
        path: "/board",
        element: <BoardPage />,
      },
      {
        path: "/notice",
        element: <NoticePage />,
      },
      {
        path: "/predict",
        element: <PredictPage />,
      },
      {
        path: "/result/:id",
        element: <ResultPage />,
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
