import React from 'react'
import CarsTable from '../Componnts/CarsTable'
import Loader from '../Componnts/Loader'
import { useSelector } from 'react-redux'

const MyCars = () => {

    const { isLoading } = useSelector(state => state.car)

    return (

        <div className='pt-[80px] m-auto'>
            {isLoading && <Loader />}
            <CarsTable />
        </div>

    )
}

export default MyCars