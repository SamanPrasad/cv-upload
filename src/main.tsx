import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddCandidate from "./pages/AddCandidate.tsx";
import ListView from "./pages/ListView.tsx";
import Candidate from "./pages/Candidate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddCandidate />,
  },
  {
    path: "/list",
    element: <ListView />,
  },
  {
    path: "/view/:userId",
    element: <Candidate />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
