import React from "react";
import ReactDOM from "react-dom/client";
import { createClient, Provider } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersonPage from "./pages/Person/PersonPage";
import HomePage from "./pages/Home/HomePage";
import '@/styles/global.scss';

const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/person/:personId",
    element: <PersonPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
