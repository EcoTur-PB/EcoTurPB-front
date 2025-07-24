import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { ApartmentRounded, RestaurantRounded, SailingRounded } from '@mui/icons-material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-50 top-0 left-0 min-h-screen'>
      <Header />

      <div className="first-page pt-48 pb-16 grid grid-cols-1 gap-8 justify-center items-center">
        <div className="left flex flex-col justify-center gap-12 items-center">
          <p className="text-8xl px-32 font-bold opacity-85 text-center">
            <span className=''>Turismo</span> <span className='text-green-600'>sustentável</span> com
            <br /><span className="text-green-600 font-semibold">descontos</span> e
            <span className="border-b-8 border-black font-semibold"> informação</span>
          </p>
          <p className="text-2xl px-32 text-gray-700 text-left">
            Acumule pontos e ganhe descontos em hotéis, passeios e restaurantes.
          </p>
        </div>
        <div className="right px-48 rounded-lg w-full flex justify-center items-center">
          <img className='object-cover w-full max-w-256 h-full rounded-3xl shadow-lg' 
            src="https://originalexperience.com.br/wp-content/uploads/2022/10/MARACAJAU-MERGULHO-CATAMARA-3.jpg" 
          alt="" />
        </div>
      </div>

      <div className="second-page flex flex-col items-center justify-center py-16 bg-white">
        <div className='text-5xl font-bold text-gray-800 py-8'>
          Nossos serviços
        </div>
        <div className="description text-2xl text-gray-700 px-48 text-center ">
          Oferecemos descontos em restaurantes, hotéis e serviços de turismo sustentáveis, com desconto baseado em pontos acumulados
        </div>

        <div className="servicos grid grid-cols-3 md:grid-cols-3 gap-8 mt-16 px-8">

          <div className='card bg-white shadow-lg rounded-lg p-8 border border-green-200  hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-4 rounded-md mb-4">
              <ApartmentRounded className="min-w-8 min-h-8 text-green-600" />
            </div>
            <div className="title text-4xl text-green-800 font-semibold">Hotéis Sustentáveis</div>
            <div className="description text-gray-500 text-lg font-medium">
              Descontos em hotéis que praticam turismo responsável e sustentável.
            </div>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-8 border border-blue-200  hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-blue-100 w-fit h-fit p-4 rounded-md mb-4">
              <SailingRounded className="min-w-8 min-h-8 text-blue-600" />
            </div>
            <div className="title text-4xl text-blue-800 font-semibold">Passeios Sustentáveis</div>
            <div className="description text-gray-500 text-lg font-medium">
              Descontos em passeios que promovem a conservação ambiental.
            </div>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-8 border border-green-200  hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-4 rounded-md mb-4">
              <RestaurantRounded className="min-w-8 min-h-8 text-green-600" />
            </div>
            <div className="title text-4xl text-green-800 font-semibold">Restaurantes Sustentáveis</div>
            <div className="description text-gray-500 text-lg font-medium">
              Descontos em restaurantes que utilizam ingredientes locais e sustentáveis.
            </div>
          </div>
         
        </div>

      </div>

    </div>
  )
}

export default App
