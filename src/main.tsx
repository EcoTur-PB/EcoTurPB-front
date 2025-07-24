import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HoteisPage from './pages/hoteis.tsx'
import PasseiosPage from './pages/passeios.tsx'
import RestaurantesPage from './pages/restaurantes.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/hello-world",
    element: <h1 className='text-red-500'>Hello World</h1>
  },
  {
    path: "/hoteis",
    element: <HoteisPage/>
  },
  {
    path: "/passeios",
    element: <PasseiosPage/>
  },
  {
    path: "/restaurantes",
    element: <RestaurantesPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
