import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./app/App";
import Authorization from "./authorization/Authorization";
import { UserProvider } from "./context/userContext";
import News from "./page/news/News";
import Profile from "./page/profile/Profile";
import Registration from "./registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App></App>
      </UserProvider>
    ),
    children: [
      {
        path: "news",
        element: <News></News>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "authorization",
        element: <Authorization></Authorization>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
