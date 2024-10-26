import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, getMyBookings } from '../Redux/Slices/carSlice';
import toast from 'react-hot-toast';


const notify = (message, type) => toast[type](message)


function getTimeDate(epochTimestamp) {

    const date = new Date(epochTimestamp * 1000);

    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate;
}

const SingleBookedCar = ({ booking }) => {

    const dispatch = useDispatch()

    async function handleCancel(){
      let cancelRes= await  dispatch(cancelBooking({id:booking._id.toString()}))
      if(cancelRes.payload && cancelRes.payload.data && !cancelRes.payload.data.error){
        dispatch(getMyBookings())
        notify( "Car cancelled successfully",'success')
      }
      else{
        notify(cancelRes?.payload?.message || "something went wrong",'error')
      }
    }

    return (
        <div className="card w-[90%] lg:card-side bg-base-100 shadow-xl flex flex-col md:flex-row lg:flex-row  m-auto items-center mb-10 w-fll lg:w-[50%] md:w-[50%] py-5 justify-around">
            <figure>
                <img className=' w-96'
                    src={booking.carDetails[0].image}
                    alt="Album" />
            </figure>
            <div className="card-body flex flex-col gap-5 pl-3">

                <h2 className="card-title capitalize font-medium text-xl">{booking.carModels[0].brandname + " " + booking.carModels[0].modelname}</h2>
                <p> <span className='font-medium'>From :</span>   {getTimeDate(booking.starttime)}</p>
                <p> <span className='font-medium'>To :</span>   {getTimeDate(booking.endtime)}</p>

                <p> <span className='font-medium'>Car Number:</span> {booking.carDetails[0].carnumber}</p>
                <button onClick={handleCancel} className='bg-blue-700 text-white py-2 w-40 rounded' >Cancel Booking</button>
            </div>
        </div>
    )
}

export default SingleBookedCar