import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const IsAuth = ({ children }) => {
    const {role} = useSelector((state) => state.auth)
    const naviget= useNavigate()
    const location = useLocation()
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
