import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../Componnts/Wrapper";
import Home from "../Page/Home";
import CarsPage from "../Page/CarsPage";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import IsAuth from "../Componnts/HOC/IsAuth";

export const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/cars",
                element: <CarsPage />
            }
        ]
    },
    {
        path: "/login",
        element:<IsAuth><Login/></IsAuth> 
    }
    ,
    {
        path: "/signup",
        element:<IsAuth> <Signup/></IsAuth>
    }
])