import React, { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '../../queries';



const Login = () => {
    const {mutateAsync, isPending } = useLoginMutation()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
       const result =  await mutateAsync({
        email: formData.email,
        password: formData.password,
      })

      // Redirect after login
      if (!result.success) {
        setError(result.error || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-sm text-red-400 text-center">{error}</p>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-neutral-400 ml-1">Email address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 
          -sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all"
          placeholder="name@school.edu"
          disabled={isPending}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-neutral-400 ml-1">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-neutral-500 hover:text-white transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/30 focus:ring-1 focus:ring-white/30 outline-none transition-all pr-10"
            placeholder="Enter your password"
            disabled={isPending}
          />

       <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white"
>
  {showPassword ? <EyeOff size={16} /> : <Eye size={16} /> }
</button>


        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center space-x-2 text-neutral-400">
          <input type="checkbox" className="rounded border-white/10 bg-[#0a0a0a]" />
          <span>Remember me</span>
        </label>
        <button type="button" className="text-neutral-500 hover:text-white transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-white text-black hover:bg-neutral-
         font-medium text-sm py-2.5 rounded-lg transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isPending ? (
          <>
            <span className="iconify animate-spin mr-2" data-icon="lucide:loader-circle" data-width="16"></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
}

export default Login