import React from 'react'

const Authentication = ({children}) => {
    const token = useSelector((state)=>state.auth.token) 
    if(token){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default Authentication