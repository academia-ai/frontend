import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import ClerkProviderWithRouter from './components/auths/clerkProvides.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient({
defaultOptions: {
  mutations: {
    retry: false
  }
}
})


createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ClerkProviderWithRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ClerkProviderWithRouter>
       </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>,
)
