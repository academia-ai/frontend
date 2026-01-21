
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import Loader from './components/reuseable/loader.jsx'
import SSOCallback from './pages/ssoCallback.jsx'
import { Toaster } from 'sonner'


const AuthWrapper = lazy(() => import('./pages/authPage.jsx'))
const HomeWrapper = lazy(() => import('./pages/homePage.jsx'))
const DashboardWrapper = lazy(() => import('./pages/dashboardPage.jsx'))
const ProfileWrapper = lazy(() => import('./pages/profilePage.jsx'))
const EditorWrapper = lazy(() => import('./pages/editorPage.jsx'))
const ProjectDetailsWrapper = lazy(() => import('./pages/projectDetails.jsx'))

function App() {


  return (
    <>


    <Routes>
<Route  index element={
  <Suspense fallback={<Loader  />}>
  <HomeWrapper />
  </Suspense>
  
  }  />

  <Route path="/sso-callback" element={<SSOCallback />} />


<Route  path='/auth'  element={
  <Suspense fallback={<Loader  />}>
  <AuthWrapper  />
  </Suspense>
  }


/>


<Route  path='/dashboard'  element={
  <Suspense fallback={<Loader  />}>
  <DashboardWrapper  />
  </Suspense>
  }
/>


      <Route
        path="/editor/:id"
        element={
          <Suspense fallback={<Loader  />}>
            {/* <ProtectedRoute > */}
              <EditorWrapper />
            {/* </ProtectedRoute> */}
          </Suspense>
        }
      />

      {/* View book page with dynamic bookId */}
      <Route
        path="/project/:id"
        element={
          <Suspense fallback={<Loader  />}>
            {/* <ProtectedRoute > */}
              <ProjectDetailsWrapper />
            {/* </ProtectedRoute> */}
          </Suspense>
        }
      />

    <Route
        path="/profile"
        element={
          <Suspense fallback={<Loader  />}>
            {/* <ProtectedRoute > */}
              <ProfileWrapper />
            {/* </ProtectedRoute> */}
          </Suspense>
        }
      />


</Routes>

<Toaster 
richColors
position='top-center'
expand
closeButton

/>
    </>
  )
}

export default App
