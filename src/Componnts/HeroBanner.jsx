import React from 'react'

const HeroBanner = ({togglemodal}) => {
    return (


        <section
            className="relative bg-[url(https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg)] bg-cover bg-center bg-no-repeat h-[70vh]"
        >
            <div
                className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Let us find your

                        <strong className="block font-extrabold text-blue-500"> Favourite Car. </strong>
                    </h1>

                    {/* <p className="mt-4 max-w-lg text-blue-600 sm:text-xl/relaxed">
                        Get your rented car in best prices
                    </p> */}

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <button onClick={togglemodal}
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-lg font-semibold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                        >
                            Book Now
                        </button>

                        {/* <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Learn More
                        </a> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner


