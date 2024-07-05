import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AddCandidatePage from "./pages/AddCandidatePage.tsx";
import CandidateListPage from "./pages/CandidateListPage.tsx";
import CandidatePage from "./pages/CandidatePage.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddCandidatePage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/list",
    element: <CandidateListPage />,
  },

  {
    path: "/view/:candidateId",
    element: <CandidatePage />,
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
