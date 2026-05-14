import './App.css'
import { Header } from './components/Header'
import { ApartmentRounded, EmojiEventsRounded, QuizRounded, RestaurantRounded, SailingRounded, SearchRounded} from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { useLanguage } from './contexts/LanguageContext'
import { SEO } from './components/SEO'

function App() {
  const { t } = useLanguage();

  return (
    <div className='bg-green-50 top-0 left-0 min-h-screen'>
      <SEO 
        title={t.home.heroTitle} 
        description={t.home.heroSubtitle}
      />
      <Header />

      <div className="first-page pt-24 sm:pt-24 md:pt-32 lg:pt-36 pb-8 md:pb-12 lg:pb-16 grid grid-cols-1 gap-6 md:gap-8 justify-center items-center px-4 md:px-8">
        <div className="left flex flex-col justify-center gap-4 md:gap-8 lg:gap-4 items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-4 md:px-8 lg:px-16 xl:px-32 font-bold opacity-85 text-center">
            {t.home.heroTitle.split(' ').map((word, i) => (
              <span key={i}>
                {['Paraíba', 'cultura', 'consciência', 'culture', 'awareness'].includes(word.replace(/[.,]/g, '')) ? (
                  <span className={word.replace(/[.,]/g, '') === 'Paraíba' ? '' : 'text-green-600'}>{word}</span>
                ) : word}
                {' '}
              </span>
            ))}
          </h1>
          <p className="text-lg mt-4 md-2 md:text-xl lg:text-2xl px-4 md:px-8 lg:px-16 xl:px-32 text-gray-700 text-center">
            {t.home.heroSubtitle}
          </p>
          <Link to="/hospedagem" className="text-2xl bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center">
            {t.home.discoverNow}
          </Link>
        </div>
        <div className="right px-4 md:px-12 lg:px-24 xl:px-48 rounded-lg w-full flex justify-center items-center">
          <img className='object-cover w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-256 h-64 md:h-80 lg:h-96 rounded-2xl md:rounded-3xl shadow-lg' 
            src="https://images.unsplash.com/photo-1642670778570-d7d6e462b98c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Vista aérea de uma praia paradisíaca na Paraíba" />
        </div>
      </div>

      <div className="second-page flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 bg-white px-4 md:px-8">
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 py-4 md:py-6 lg:py-8 text-center'>
          {t.home.sustainableServices}
        </h2>
        <div className="description text-lg md:text-xl lg:text-2xl text-gray-700 px-4 md:px-12 lg:px-24 xl:px-48 text-center">
          {t.home.sustainableServicesDesc}
        </div>

        <div className="servicos grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 lg:mt-16 px-4 md:px-8 w-full max-w-7xl">

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-blue-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-blue-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <SailingRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-blue-600" />
            </div>
            <h3 className="title text-2xl md:text-3xl lg:text-4xl text-blue-800 font-semibold">{t.home.sustainableActivities}</h3>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              {t.home.sustainableActivitiesDesc}
            </div>
            <Link 
              to="/passeios" 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
            >
              {t.home.viewActivities}
            </Link>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-green-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <ApartmentRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-green-600" />
            </div>
            <h3 className="title text-2xl md:text-3xl lg:text-4xl text-green-800 font-semibold">{t.home.sustainableAccommodations}</h3>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              {t.home.sustainableAccommodationsDesc}
            </div>
            <Link 
              to="/hospedagem" 
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
            >
              {t.home.viewAccommodations}
            </Link>
          </div>

          <div className='card bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 border border-green-200 hover:border-green-300 transition flex flex-col gap-1'>
            <div className="icon bg-green-100 w-fit h-fit p-3 md:p-4 rounded-md mb-3 md:mb-4">
              <RestaurantRounded className="min-w-6 min-h-6 md:min-w-8 md:min-h-8 text-green-600" />
            </div>
            <h3 className="title text-2xl md:text-3xl lg:text-4xl text-green-800 font-semibold">{t.home.sustainableRestaurants}</h3>
            <div className="description text-gray-500 text-base md:text-lg font-medium">
              {t.home.sustainableRestaurantsDesc}
            </div>
            <Link 
              to="/restaurantes" 
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
            >
              {t.home.viewRestaurants}
            </Link>
          </div>
         
        </div>

      </div>

      <div className="second-page flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 bg-white px-4 md:px-8">
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 py-4 md:py-6 lg:py-8 text-center'>
          {t.home.knowParaiba}
        </h2>
        <div className="description text-lg md:text-xl lg:text-2xl text-gray-700 px-4 md:px-12 lg:px-24 xl:px-48 text-center">
          {t.home.knowParaibaDesc}
        </div>

        <div className="servicos grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12 lg:mt-16 px-4 md:px-8 w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src="/jogo-1.png" 
                  alt="EcoTermo - Jogo de palavras sustentáveis"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <QuizRounded className="w-6 h-6 mr-2" />
                    <h3 className="text-2xl font-bold">{t.home.ecoTermo}</h3>
                  </div>
                  <p className="text-sm opacity-90">{t.home.ecoTermoDesc}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-green-600">{t.home.upToPoints.replace('{points}', '100')}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <EmojiEventsRounded className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{t.home.easy}</span>
                  </div>
                </div>
                <Link 
                  to="/jogos/termo"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors duration-200"
                >
                  {t.home.playNow}
                </Link>
              </div>
            </div>

            {/* Jogo Caça-palavras */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src="/jogo-2.png" 
                  alt="EcoCaça - Caça-palavras sustentável"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <SearchRounded className="w-6 h-6 mr-2" />
                    <h3 className="text-2xl font-bold">{t.home.cacaPalavras}</h3>
                  </div>
                  <p className="text-sm opacity-90">{t.home.cacaPalavrasDesc}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">{t.home.upToPoints.replace('{points}', '120')}</span>
                  </div>
                  <div className="flex items-center text-orange-500">
                    <EmojiEventsRounded className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{t.home.medium}</span>
                  </div>
                </div>
                <Link 
                  to="/jogos/caca-palavras"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors duration-200"
                >
                  {t.home.playNow}
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
