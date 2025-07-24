import { Header } from '../components/Header';

export default function RestaurantesPage() {
  return (
    <div className="bg-green-50 min-h-screen">
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="text-green-600">Restaurantes</span> Sustentáveis
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Em breve! Página de restaurantes sustentáveis será implementada.
          </p>
        </div>
      </div>
    </div>
  );
}
