import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneCar, getMyCars, updateOneCar } from '../Redux/Slices/carSlice'
import toast from 'react-hot-toast'

const notify = (message, type) => toast[type](message)


const CarsTable = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { myAllCars } = useSelector(state => state.car)
    const [editCarId, setEditCarId] = useState("")
    const[priceToEdit,setPriceToEdit]=useState(10)


    useEffect(() => {
        dispatch(getMyCars(token))
    }, [])

    async function handleDeletecar({ id, token }) {
        let deleteRes = await dispatch(deleteOneCar({ id, token }))
        if (deleteRes.payload && !deleteRes.payload?.error) {
            dispatch(getMyCars(token))
            notify("Car deleted successfully",'success')
        }
        else {
            notify(deleteRes?.payload?.message || "Error deleting car data",'error')
        }
    }

    function handleEnableEditing(id, charge) {
        setEditCarId(id)
        setPriceToEdit(charge)
    }

    async function handleUpdate(){
       let updatedres=await dispatch(updateOneCar({token,id:editCarId,charge: priceToEdit}))
       if(updatedres.payload && !updatedres.payload.error){
        dispatch(getMyCars(token))
        setEditCarId("")
        setPriceToEdit(0)
        notify("Car updated successfully",'success')
       }else{
        notify(updatedres?.payload?.message || "Error updating car data",'error')
       }
    }


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[90vh]">
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr className='text-blue-900 bg-blue-300 sticky top-0'>
                        <th scope="col" className="px-16 py-6 sticky top-0">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-6 ">
                            Brand
                        </th>
                        <th scope="col" className="px-6 py-6">
                            Model
                        </th>
                        <th scope="col" className="px-6 py-6 sticky">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-6 sticky">
                            Rate <span className='text-xs font-normal small-cap'>(per hour)</span>
                        </th>
                        <th scope="col" className="px-6 py-6 sticky ">
                            edit
                        </th>
                        <th scope="col" className="px-6 py-6 sticky ">
                            Delete
                        </th>
                    </tr>
                </thead>
                

                <tbody>
                    {
                        myAllCars.length > 0 && myAllCars.map((car,index) => {
                            return <tr key={index} className="bg-blue-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={car?.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                                    {car?.carModels[0]?.brandname}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                                    {car?.carModels[0]?.modelname}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                                    {car?.carnumber}
                                </td>

                                {editCarId == car._id ? <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div>
                                            <input value={priceToEdit} onChange={(e)=>setPriceToEdit(e.target.value)} type="number" className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" />
                                            {/* <input value={priceToEdit} onChange={(e)=>setPriceToEdit(e.target.value)}  type="number" /> */}
                                        </div>
                                    </div>
                                </td> : <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    ₹{car?.charge}
                                </td>


                                }
                                <td className="px-6 py-4">
                                    {editCarId == car._id ?
                                        <button className="inline-flex items-center justify-center w-full px-2 py-1 mb-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}" onClick={handleUpdate} >
                                            save
                                        </button>

                                        :
                                        <button onClick={() => handleEnableEditing(car._id,car.charge)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                                    }

                                </td>

                                <td className="px-6 py-4">
                                    <span onClick={() =>  handleDeletecar({ id: car?._id, token })} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>

                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CarsTable