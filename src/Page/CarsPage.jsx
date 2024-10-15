import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarCard from '../Componnts/CarCard'
import { bookCar, getFilteredCars } from '../Redux/Slices/carSlice'
import { useSearchParams } from 'react-router-dom';


const CarsPage = () => {
  const { filteredCars } = useSelector(state => state.car)
  const state = useSelector(state => state.auth)
  console.log(state,'state auth')
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleBookCar(car){
    let starttime = searchParams.get("starttime")
    let endtime = searchParams.get("endtime")
    let modelid = searchParams.get("modelid")
    let carid = car.carid

    let res = await dispatch(bookCar({carid, modelid,starttime,endtime}))

   if(res.payload && !res.payload.error){
    dispatch(getFilteredCars({starttime, endtime,modelid}))
   }
  }

  useEffect(()=>{
    let starttime = searchParams.get("starttime")
    let endtime = searchParams.get("endtime")
    let modelid = searchParams.get("modelid")
    dispatch(getFilteredCars({starttime, endtime,modelid}))
  },[])
  
  return (
    <div>
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
          filteredCars.length > 0 && filteredCars.map((car, index) => {
            return <CarCard handleBookCar={handleBookCar} key={index} car={car} />
          })
        }
      </div>

    </div>
  )
}

export default CarsPage