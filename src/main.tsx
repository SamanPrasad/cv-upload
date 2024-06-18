import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  RouterProvider,
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import AddCandidate from "./pages/AddCandidate.tsx";
import ListView from "./pages/ListView.tsx";
import Candidate from "./pages/Candidate.tsx";
import PageNotFound from "./components/PageNotFound.tsx";

const validateUserId = async ({ params }: LoaderFunctionArgs) => {
  const userId = Number(params.userId);
  if (isNaN(userId)) {
    return redirect("/page-not-found");
  } else if (userId === 0) {
    return redirect("/page-not-found");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddCandidate />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/list",
    element: <ListView />,
  },

  {
    path: "/view/:userId",
    element: <Candidate />,
    loader: validateUserId,
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
