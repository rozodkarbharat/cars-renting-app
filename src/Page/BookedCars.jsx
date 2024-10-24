import React, { useEffect } from 'react'
import SingleBookedCar from '../Componnts/SingleBookedCar'
import { useDispatch, useSelector } from 'react-redux'
import { getMyBookings } from '../Redux/Slices/carSlice'
import Loader from '../Componnts/Loader'
import { Toaster } from 'react-hot-toast'

const BookedCars = () => {
  const dispatch = useDispatch()
  const {token} = useSelector(state=>state.auth)
  const {myBookings,isLoading} = useSelector(state=>state.car)
    useEffect(()=>{
      dispatch(getMyBookings(token))
    },[])

  return (
    <div className='pt-20 m-auto w-[100%]'>
      <Toaster/>
      {!isLoading &&<p className='w-[100%] m-auto text-center my-10 font-extrabold text-2xl'>My Bookings</p>}
      {
       !isLoading && myBookings.length>0 && myBookings.map((elem)=>{
          return <SingleBookedCar key={elem._id} booking={elem} />
        })
      }
      {
        !isLoading && myBookings.length==0 && <h2 className='text-2xl font-semibold text-center w-[100%] text-red-500'>No Bookings Found!</h2>  
      }
    {isLoading && <Loader/>}
        
    </div>
  )
}

export default BookedCars