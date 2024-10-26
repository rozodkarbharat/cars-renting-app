import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation, useNavigate } from 'react-router-dom'
import { validateUser } from '../../Redux/Slices/AuthSlice'

const IsAuth = ({ children }) => {
    const {role} = useSelector((state) => state.auth)
    const naviget= useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true); 
    const dispatch= useDispatch()

    useEffect(()=>{
        async function fetchUser(){
            dispatch(validateUser())
            setLoading(false)
        }
        fetchUser()
    },[])
    
    if(loading){
        return <div>Loading...</div>;
    }

    if (role) {
        if (location.state && location.state.from) {
            naviget(location.state.from, { replace: true }); // Go back to the last page
        } else {
            naviget("/", { replace: true })
        }
    }
    else {
        return children
    }
}

export default IsAuth
