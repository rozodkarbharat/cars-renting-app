import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { validateUser } from '../../Redux/Slices/AuthSlice'

const Authentication = ({children}) => {
    const {role} = useSelector(state=>state.auth)
    const [loading, setLoading] = useState(true); 
    const dispatch= useDispatch()

    useEffect(()=>{
        async function fetchUser(){
            dispatch(validateUser())
            setLoading(false)
        }
        fetchUser()
    },[])

    if (loading) {
        return <div>Loading...</div>;
    }

    else if(role){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default Authentication