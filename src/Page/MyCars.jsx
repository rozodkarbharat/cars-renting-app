import React, { useEffect } from 'react'
import CarsTable from '../Componnts/CarsTable'
import Loader from '../Componnts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { getMyCars } from '../Redux/Slices/carSlice'

const MyCars = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getMyCars(token))
    }, [])

    const { isLoading, myAllCars } = useSelector(state => state.car)
    return (

        <div className='pt-[80px] m-auto'>
            <Toaster />
            {isLoading && <Loader />}
          {myAllCars.length>0?  <CarsTable myAllCars={myAllCars} />:
            <h2 className='text-2xl font-semibold'>No Cars Found</h2>}
        </div>

    )
}

export default MyCars