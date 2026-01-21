import { useMutation, useQuery } from '@tanstack/react-query'
import { loginRequest, logoutRequest, registerRequest, userProfileRequest } from '../api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
// import { UserProfile } from '@clerk/clerk-react'




export const useLoginMutation = () => {

    const navigate = useNavigate()
    
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token.accessToken) 
    toast.success('Login successful') 
       navigate('/dashboard')
  },
    
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Login failed'
      )
    },
  })
}



export const useRegisterMutation = () => {
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: registerRequest,
     
    onSuccess: (data) => {
    localStorage.setItem('token', data.accessToken)
      toast.success('Registration successful')
      navigate('/auth')
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Registration failed'
      )
    },
    })
}

export const useLogoutMutation = () => {
        const navigate = useNavigate()

      
        return useMutation({

       mutationFn: logoutRequest,
               onSuccess: () => {
    localStorage.removeItem('token')
      toast.success('Logout successful')
      navigate('/auth')
    },
        })
        
    

}



export const useUserQuery = (enabled) => {
    return  useQuery({
       queryKey: ['/users/me'],
       queryFn: userProfileRequest,
       enabled,
       staleTime: 1000 * 60 * 5 ,
       retry: false,
          onError: (err) => {
      console.error('Failed to fetch user', err);
    }
    })
}