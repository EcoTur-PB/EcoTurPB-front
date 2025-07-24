import { Header } from '../components/Header'
import { SportsEsportsRounded, EmojiEventsRounded, QuizRounded, SearchRounded } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function JogosPage() {
  return (
    <div className='bg-green-50 min-h-screen'>
      <Header />
      
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 md:pb-12 lg:pb-16 px-4 md:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 md:p-6 rounded-full">
              <SportsEsportsRounded className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
            <span className="text-green-600">Jogos</span> EcoTurPB
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Divirta-se enquanto acumula pontos para descontos em hotéis, passeios e restaurantes sustentáveis!
          </p>
        </div>

        {/* Como Funciona */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 mb-12 md:mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <EmojiEventsRounded className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mr-3" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Como Funciona</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl md:text-3xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Jogue</h3>
              <p className="text-gray-600">Escolha entre nossos jogos educativos sobre turismo sustentável</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Ganhe Pontos</h3>
              <p className="text-gray-600">Acumule pontos baseados no seu desempenho nos jogos</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl md:text-3xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Troque por Descontos</h3>
              <p className="text-gray-600">Use seus pontos para conseguir descontos em estabelecimentos parceiros</p>
            </div>
          </div>
        </div>

        {/* Jogos Disponíveis */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-8 md:mb-12">
            Jogos Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Jogo Termo */}
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
                    <h3 className="text-2xl font-bold">EcoTermo</h3>
                  </div>
                  <p className="text-sm opacity-90">Descubra palavras sustentáveis</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-green-600">Até 100 pontos</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <EmojiEventsRounded className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Fácil</span>
                  </div>
                </div>
                <Link 
                  to="/jogos/termo"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors duration-200"
                >
                  Jogar Agora
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
                    <h3 className="text-2xl font-bold">Caça Palavras</h3>
                  </div>
                  <p className="text-sm opacity-90">Encontre palavras escondidas</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">Até 120 pontos</span>
                  </div>
                  <div className="flex items-center text-orange-500">
                    <EmojiEventsRounded className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Médio</span>
                  </div>
                </div>
                <Link 
                  to="/jogos/caca-palavras"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors duration-200"
                >
                  Jogar Agora
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sistema de Pontos */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 md:p-8 lg:p-10 mt-12 md:mt-16 text-white max-w-4xl mx-auto">
          <div className="text-center">
            <EmojiEventsRounded className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Sistema de Pontos</h2>
            <p className="text-lg md:text-xl mb-6 text-green-100">
              Seus pontos podem ser trocados por descontos reais nos nossos parceiros!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-green-600">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">100 pontos</div>
                <div className="text-sm text-green-800">5% de desconto</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">300 pontos</div>
                <div className="text-sm text-green-800">15% de desconto</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">500 pontos</div>
                <div className="text-sm text-green-800">25% de desconto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JogosPage
