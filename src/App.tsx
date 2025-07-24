import './App.css'
import { Header } from './components/Header'
import { ApartmentRounded, RestaurantRounded, SailingRounded } from '@mui/icons-material'

function App() {

  return (
    <div className='bg-green-50 top-0 left-0 min-h-screen'>
      <Header />

      <div className="first-page pt-24 sm:pt-28 md:pt-32 lg:pt-48 pb-8 md:pb-12 lg:pb-16 grid grid-cols-1 gap-6 md:gap-8 justify-center items-center px-4 md:px-8">
        <div className="left flex flex-col justify-center gap-6 md:gap-8 lg:gap-12 items-center">
          <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl px-4 md:px-8 lg:px-16 xl:px-32 font-bold opacity-85 text-center">
            <span className=''>Turismo</span> <span className='text-green-600'>sustentável</span> com
            <br /><span className="text-green-600 font-semibold">descontos</span> e
            <span className="border-b-4 md:border-b-6 lg:border-b-8 border-black font-semibold"> informação</span>
          </p>
          <p className="text-lg md:text-xl lg:text-2xl px-4 md:px-8 lg:px-16 xl:px-32 text-gray-700 text-center">
            Acumule pontos e ganhe descontos em hotéis, passeios e restaurantes.
          </p>
        </div>
        <div className="right px-4 md:px-12 lg:px-24 xl:px-48 rounded-lg w-full flex justify-center items-center">
          <img className='object-cover w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-256 h-64 md:h-80 lg:h-96 rounded-2xl md:rounded-3xl shadow-lg' 
            src="https://originalexperience.com.br/wp-content/uploads/2022/10/MARACAJAU-MERGULHO-CATAMARA-3.jpg" 
          alt="" />
        </div>
      </div>

      <div className="second-page flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 bg-white px-4 md:px-8">
        <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 py-4 md:py-6 lg:py-8 text-center'>
          Nossos serviços
        </div>
        <div className="description text-lg md:text-xl lg:text-2xl text-gray-700 px-4 md:px-12 lg:px-24 xl:px-48 text-center">
          Oferecemos descontos em restaurantes, hotéis e serviços de turismo sustentáveis, com desconto baseado em pontos acumulados
        </div>

        <div className="servicos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 lg:mt-16 px-4 md:px-8 w-full max-w-7xl">

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-green-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <ApartmentRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-green-600" />
            </div>
            <div className="title text-2xl md:text-3xl lg:text-4xl text-green-800 font-semibold">Hotéis Sustentáveis</div>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              Descontos em hotéis que praticam turismo responsável e sustentável.
            </div>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-blue-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-blue-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <SailingRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-blue-600" />
            </div>
            <div className="title text-2xl md:text-3xl lg:text-4xl text-blue-800 font-semibold">Passeios Sustentáveis</div>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              Descontos em passeios que promovem a conservação ambiental.
            </div>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-green-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <RestaurantRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-green-600" />
            </div>
            <div className="title text-2xl md:text-3xl lg:text-4xl text-green-800 font-semibold">Restaurantes Sustentáveis</div>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              Descontos em restaurantes que utilizam ingredientes locais e sustentáveis.
            </div>
          </div>
         
        </div>

      </div>

    </div>
  )
}

export default App
