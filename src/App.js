import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {path:"/dashboard",element:<Dashboard/>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
