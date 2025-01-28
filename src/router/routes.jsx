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
import Dashboard from "../layouts/Dashboard";
import MyEnrollClass from "../pages/DashboardPage/MyEnrollClass";
import Profile from "../pages/DashboardPage/Profile";
import Assignment from "../pages/DashboardPage/Assignment";
import TerModals from "../components/TerModals";
import TeacherRequest from "../pages/TeacherRequest";
import Users from "../pages/Users";
import AdminClasses from "../pages/DashboardPage/AdminClasses";
import AddClass from "../pages/DashboardPage/AddClass";
import MyClass from "../pages/DashboardPage/MyClass";


const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
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
        element: <PrivateRoutes><Payemnt></Payemnt></PrivateRoutes>,
      },
      {
        path: 'applyTeacher',
        element: <ApplyTeacher></ApplyTeacher>
      },
    ],

  },
  // Dashboard
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: 'myEnroll',
        element: <PrivateRoutes><MyEnrollClass></MyEnrollClass></PrivateRoutes>,
      },
      {
        path: 'profile',
        element:<PrivateRoutes> <Profile></Profile></PrivateRoutes>
      },
      {
        path: 'assignment/:id',
        element:<PrivateRoutes> <Assignment></Assignment></PrivateRoutes>
      },
      // admin dashboard
      {
        path: 'teacherRequest',
        element: <PrivateRoutes><TeacherRequest></TeacherRequest></PrivateRoutes>
      },
      {
        path: 'users',
        element: <PrivateRoutes><Users></Users></PrivateRoutes>
      },
      {
        path: 'adminClasses',
        element: <PrivateRoutes><AdminClasses></AdminClasses></PrivateRoutes>
      },
      // Teachers routes
      {
        path: 'addclass',
        element: <PrivateRoutes><AddClass></AddClass></PrivateRoutes>
      },
      {
        path: 'myClass',
        element: <PrivateRoutes><MyClass></MyClass></PrivateRoutes>
      },
    ]
  },
])
export default routes;