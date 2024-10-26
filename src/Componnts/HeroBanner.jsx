import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroBanner = ({togglemodal, togglAddCarModal}) => {
    const {role} = useSelector(state=>state.auth)
    const navigate = useNavigate()

    function handletogglemodal() {
        if(role){

            togglemodal()
        }
        else{
            navigate("/login")
        }
    }

    return (


        <section
            className="relative bg-cover bg-center bg-no-repeat h-[70vh] flex pt-10 "
        >
            <div
                className="relative mx-auto max-w-screen-xl px-4 py-20 sm:px-6 sm:pt-36 lg:flex  lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    {role == "admin" ? <h1 className="text-3xl font-extrabold  sm:text-5xl text-blue-500">
                        Start Earning With Us.
                        <strong className="block font-extrabold text-black mt-2"> Register Your Car Now. </strong>
                    </h1> : <h1 className="text-3xl font-extrabold  sm:text-5xl text-blue-500">
                        Let us find your
                        <strong className="block font-extrabold text-black"> Favourite Car. </strong>
                    </h1>
                    }

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Get your rented car in best prices
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        {role == "admin" ? <button onClick={togglAddCarModal}
                            className="block w-3/4 rounded-lg px-12 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-smtext-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-lg"
                            >
                                Add Car
                            </button> :
                            <button onClick={handletogglemodal}
                                className="block w-3/4 rounded-lg px-12 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-smtext-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-lg"
                            >
                                Book Now
                            </button>
                        }

                    </div>

                </div>
            </div>
            <img className="hidden lg:block w-[60%]" src='/car.avif' alt=''/>
        </section>
    )
}

export default HeroBanner


