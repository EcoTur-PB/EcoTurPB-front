import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HoteisPage from './pages/hoteis.tsx'
import PasseiosPage from './pages/passeios.tsx'
import RestaurantesPage from './pages/restaurantes.tsx'
import JogosPage from './pages/jogos.tsx'
import Termo from './pages/Jogos/Termo.tsx'
import CacaPalavras from './pages/Jogos/CacaPalavras.tsx'

import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { HelmetProvider } from 'react-helmet-async'

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
    path: "/hospedagem",
    element: <HoteisPage/>
  },
  {
    path: "/passeios",
    element: <PasseiosPage/>
  },
  {
    path: "/restaurantes",
    element: <RestaurantesPage/>
  },
  {
    path: "/jogos",
    element: <JogosPage/>
  },
  {
    path: "/jogos/termo",
    element: <Termo/>
  },
  {
    path: "/jogos/caca-palavras",
    element: <CacaPalavras/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <RouterProvider router={router}/>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
)
