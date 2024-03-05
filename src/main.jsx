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

// async function exposeComponent(path) {
//   let { default: tempComponentName } = await import(path);
//   return { Component: tempComponentName }
// }

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
        // lazy: () => exposeComponent("./routes/contact"),
        async lazy() {
          let { default: tempComponentName } = await import("./routes/contact");
          return { Component: tempComponentName }
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