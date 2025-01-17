import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../shared/ErrorPage";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";


  const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout> ,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
              path: '/allClasses',
              element: <AllClasses></AllClasses>
            },
        ],
    }
  ])
  export default routes;