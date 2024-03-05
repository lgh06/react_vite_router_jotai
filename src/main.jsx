import * as React from "react";
import * as ReactDOM from "react-dom/client";

import Root from "./routes/root";
import ErrorPage from "./error-page";
// import Contact from "./routes/contact";


import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        // element: <Contact />,
        // lazy: () => import("./routes/contact"),
        async lazy() {
          let { default: Contact } = await import("./routes/contact");
          return { Component: Contact }
        },
      },
    ],
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);