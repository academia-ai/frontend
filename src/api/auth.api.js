// import axios from "axios"
import { baseUrl } from "./baseUrl"



export const loginRequest = async({email,password}) => {

    const res = await  baseUrl.post('/auth/login', {
        email,password
    })

    return res.data

}

export const registerRequest = async({ fullName, email,password}) => {
    const res = await  baseUrl.post('/auth/register', {
fullName,email,password
    })

    return res.status
}

export const logoutRequest = async() => {
       const token = localStorage.getItem('token')
const res = await baseUrl.post('/auth/logout', {
    token
})

return res.status
}


export const userProfileRequest = async() => {
    const token = localStorage.getItem('token')
    const res = await baseUrl.get('/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.data.user
}

