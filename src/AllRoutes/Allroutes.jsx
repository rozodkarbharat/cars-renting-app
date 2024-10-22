import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../Componnts/Wrapper";
import Home from "../Page/Home";
import CarsPage from "../Page/CarsPage";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import IsAuth from "../Componnts/HOC/IsAuth";
import MyCars from "../Page/MyCars";
import Authentication from "../Componnts/HOC/Authentication";
import BookedCars from "../Page/BookedCars";

export const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/cars",
                element: <Authentication><CarsPage /></Authentication>
            },
            {
                path: "/my-cars",
                element: <Authentication> <MyCars /></Authentication>
            },
            {
                path: "/booked-cars",
                element: <Authentication> <BookedCars /></Authentication>
            }
        ]
    },
    {
        path: "/login",
        element: <IsAuth><Login /></IsAuth>
    }
    ,
    {
        path: "/signup",
        element: <IsAuth> <Signup /></IsAuth>
    }
    

])