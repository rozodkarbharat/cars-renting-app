import React from 'react'

const CarCard = ({ car, handleBookCar, canBook }) => {
  return (
    <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">

      <img className="h-60 rounded-t-lg object-contain" src={`${car?.image}`} alt="product" />
      <div className="mt-4 px-5 pb-5">

        <h5 className="text-xl font-semibold tracking-tight text-slate-900">{car?.carModels[0]?.brandname} {car?.carModels[0].modelname}</h5>
        <div className="flex items-center justify-between mt-3">
          <p>
            <span className="text-3xl font-bold text-slate-900">₹{car?.charge}</span>
            <span className="text-sm text-slate-900 ">/ hour</span>
          </p>
          {canBook && <button onClick={() => handleBookCar(car)} className='bg-blue-500 text-white py-1 px-4 rounded'>Book Now</button>
          }    </div>
      </div>
    </div>

  )
}

export default CarCard
    