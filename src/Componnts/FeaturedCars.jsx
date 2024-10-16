import React, { useEffect } from 'react'
import { getfeaturesCars } from '../Redux/Slices/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import CarCard from './CarCard'

const FeaturedCars = () => {
    const dispatch =useDispatch()
    const {featuredCars}= useSelector(state=>state.car)
    
    useEffect(() => {
        dispatch(getfeaturesCars())
      }, [])

  return (
    <div className='m-auto w-[90%] mt-5'>
      <h3 className='text-xl font-semibold'>Featured Cars</h3>
        <div className='flex flex-wrap '>
            {
               featuredCars.length>0 && featuredCars.map((car)=>{
                    return <CarCard canBook={false} key={car._id} car={car} />
                })
            }
        </div>
    </div>
  )
}

export default FeaturedCars
