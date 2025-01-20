import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../shared/ErrorPage";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CourseDetails from "../pages/CourseDetails";
import Payemnt from "../pages/Payemnt";
import PrivateRoutes from "../shared/PrivateRoutes/PrivateRoutes";
import ApplyTeacher from "../pages/ApplyTeacher";


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
            {
              path: 'register',
              element: <Register></Register>
            },
            {
              path: 'login',
              element: <Login></Login>
            },
            {
              path: '/courseDetails/:id',
              element: <PrivateRoutes><CourseDetails></CourseDetails></PrivateRoutes>
            },
            {
              path: '/payment',
              element: <PrivateRoutes><Payemnt></Payemnt></PrivateRoutes>
            },
            {
              path: 'applyTeacher',
              element: <ApplyTeacher></ApplyTeacher>
            },
        ],
    }
  ])
  export default routes;