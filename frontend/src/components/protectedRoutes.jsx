import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

function ProtectedRoutes({children}) { // To get the children
    const [isAuthorized, setIsAuthorized] = useState(null) // To store the authorization status

    useEffect(() => { // To run when the component mounts
        auth().catch(() => setIsAuthorized(false)) // To authenticate the user
    }, [])

    const refreshToken = async () => { // To refresh the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) // To get the refresh token
        try {
            const res = await api.post('/api/token/refresh/', { refresh: refreshToken, }); // To refresh the token
            if (res.status === 200) { // To check if the response is 200
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // To set the access token
                setIsAuthorized(true) // To set the authorization status
            } else {
                setIsAuthorized(false)
            }
        } catch (error) { // To catch the error
            console.log(error) // To log the error
            setIsAuthorized(false) // To set the authorization status
        }
    };

    
    const auth = async () => { // To authenticate the user
        const token = localStorage.getItem(ACCESS_TOKEN) // To get the access token
        if (!token) {   // To check if the token is null
            setIsAuthorized(false)  // To set the authorization status
            return  // To return
        }
        const decoded = jwtDecode(token) // To decode the token
        const tokenExpiration = decoded.exp // To get the expiration date
        const now = Date.now() / 1000  // To get the current date

        if (tokenExpiration < now) { // To check if the token is expired
            await refreshToken()   // To refresh the token
        } else {
            setIsAuthorized(true)   // To set the authorization status
        }
    }

    if (isAuthorized === null) { // To check if the authorization status is null
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" /> // To return the children if the user is authorized
}


export default ProtectedRoutes



// This component is used to protect routes that require authentication.
// It checks if the user is authorized by verifying the access token stored in localStorage.
// If the token is expired, it attempts to refresh it using the refresh token.
// If the user is authorized, it renders the child components; otherwise, it redirects to the login page.
