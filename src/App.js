import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Authentication from "./components/Authentication";
import MusicPlayerDashboard from "./components/page";
import AlbumSongs from "./components/AlbumSongs";


const router = createBrowserRouter([
  { path: "/", element: <Authentication /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {path:"/dashboard",element:<MusicPlayerDashboard/>},
  {path:"/album/:albumId",element:<AlbumSongs/>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
