import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroBanner = ({togglemodal, togglAddCarModal}) => {
    const {role,token} = useSelector(state=>state.auth)
    const navigate = useNavigate()

    function handletogglemodal() {
        if(token){

            togglemodal()
        }
        else{
            navigate("/login")
        }
    }

    return (


        <section
        // bg-[url(https://media.zigcdn.com/media/model/2023/Mar/gla-2024_360x240.jpg)]
            className="relative  bg-cover bg-center bg-no-repeat h-[70vh] flex pt-10 "
        >
            {/* <div
                className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div> */}

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:flex  lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold  sm:text-5xl text-blue-500">
                        Let us find your
                        <strong className="block font-extrabold text-black"> Favourite Car. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Get your rented car in best prices
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        {role=="admin" ? <button onClick={togglAddCarModal}
                            className="block w-3/4 rounded-lg px-12 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-smtext-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add Car
                        </button>:
                        <button onClick={ handletogglemodal }
                            className="block w-3/4 rounded-lg px-12 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-smtext-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Book Now
                        </button>}

                    </div>

                </div>
            </div>
            <img className="hidden lg:block w-[60%]" src='/car.avif' alt=''/>
        </section>
    )
}

export default HeroBanner


