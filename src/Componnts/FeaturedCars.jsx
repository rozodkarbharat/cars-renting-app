import React, { useEffect } from 'react'
import { getfeaturesCars } from '../Redux/Slices/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import CarCard from './CarCard'

const FeaturedCars = () => {
  const dispatch = useDispatch()
  const { featuredCars } = useSelector(state => state.car)

  useEffect(() => {
    dispatch(getfeaturesCars())
  }, [])

  return (
    <section className='bg-[#f8f8f8] py-10'>

    <div className='m-auto w-[90%]'>
      <h3 className='text-2xl font-bold mb-5'>Featured Cars</h3>
        <div className='flex flex-wrap justify-center gap-10'>
            {
               featuredCars.length>0 && featuredCars.map((car)=>{
                    return <CarCard canBook={false} key={car._id} car={car} />
                })
            }
        </div>
    </div>
    </section>
  )
}

export default FeaturedCars
