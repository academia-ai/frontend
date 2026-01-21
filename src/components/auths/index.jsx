
import Login from './login'
// import Signups from './signup'

import {  SignedIn, SignIn, SignUp,  useSignIn, useUser } from '@clerk/clerk-react'
import Register from './register'
import { Chrome, Github } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const AuthIndex = () => {
    const [isLogin, setIsLogin] = useState(true)

const { signIn, isLoaded } = useSignIn()
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

 useEffect(() => {
    if (isSignedIn) navigate('/dashboard')
  }, [isSignedIn])

  const handleGoogleAuth = async () => {
    if (!isLoaded || isSignedIn) return 

    await signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
    })
  }






  return (

    <section id="auth" 
    className="page-section max-w-sm mx-auto min-h-[90vh] flex items-center 
     justify-center bg-black pt-10 pb-20">
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white mb-6">
            <span className="iconify" data-icon="lucide:fingerprint" data-width="20"></span>
          </div>
          <h2 className="text-2xl font-medium text-white tracking-tight mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-neutral-500">
            {isLogin
             ? 'Enter your credentials to access your workspace.'
             : 'Sign up to get started with your account.'}
          </p>
        </div>

        <div className="glass-panel p-1 rounded-2xl border border-white/10 mb-6">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
                isLogin 
                  ? 'text-black bg-white shadow-sm' 
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
                !isLogin 
                  ? 'text-black bg-white shadow-sm' 
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              Sign up
            </button>
          </div>
        </div>

        {isLogin ? <Login /> : <Register/>}

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-[#030303] text-neutral-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 w-full">
          <button className="hidden items-center justify-center gap-2 bg-[#0a0a0a] border border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-medium py-2.5 rounded-lg transition-all">
          <Github  size={16}/>
            GitHub
          </button>

  <button
  // onClick={isLogin ? handleGoogleSignIn : handleGoogleSignUp}
  onClick={handleGoogleAuth}
  className="flex items-center justify-center gap-2 bg-[#0a0a0a] border cursor-pointer
   border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-medium py-2.5 rounded-lg transition-all"
>
    <Chrome size={16} />
  Google
</button>



        </div>

      </div>
    </section>
  )
}

export default AuthIndex