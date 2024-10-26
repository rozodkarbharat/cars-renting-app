import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../Redux/Slices/AuthSlice'
import toast from 'react-hot-toast'

const notify = (message, type) => toast[type](message)


const Navbar = () => {
    const { role } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        let signoutRes = await dispatch(signOut())

        if (signoutRes?.payload && !signoutRes?.payload?.error) {
            notify("Sign out successfully", "success")
            navigate("/")
        }
        else {
            notify("Error signing out", "error")
        }
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">rentAcar</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {role ? <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button> : <button onClick={() => navigate("/login")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    }
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {role === "admin" && <li>
                            <Link to="/my-cars" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 text-center" aria-current="page">My Cars</Link>
                        </li>}
                        {role === "user" && <li>
                            <Link to="/booked-cars" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 text-center" aria-current="page">My Bookings</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
