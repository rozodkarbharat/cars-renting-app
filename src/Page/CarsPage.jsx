import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarCard from '../Componnts/CarCard'
import { bookCar, getFilteredCars } from '../Redux/Slices/carSlice'
import { useSearchParams } from 'react-router-dom';
import Loader from '../Componnts/Loader';
import toast, { Toaster } from 'react-hot-toast';

const notify = (message, type) => toast[type](message)


const CarsPage = () => {
  const { filteredCars, isLoading } = useSelector(state => state.car)

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleBookCar(car){
    let starttime = searchParams.get("starttime")
    let endtime = searchParams.get("endtime")
    let modelid = searchParams.get("modelid")
    let carid = car.carid

    let res = await dispatch(bookCar({carid, modelid,starttime,endtime}))


   if(res?.payload && !res.payload?.error){
    dispatch(getFilteredCars({starttime, endtime,modelid}))
    notify("Car booked successfully",'success')
   }
   else{
    notify(res?.payload?.message || "Error booking car",'error')
 
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
      {isLoading && <Loader/>}
      <Toaster />
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
          filteredCars.length > 0 && filteredCars.map((car, index) => {
            return <CarCard canBook={true} handleBookCar={handleBookCar} key={index} car={car} />
          })
        }
      </div>  
     {!isLoading && filteredCars?.length == 0 && <h2 className='text-2xl font-semibold text-center w-[100%]'>No Cars Found</h2>}

    </div>
  )
}

export default CarsPage