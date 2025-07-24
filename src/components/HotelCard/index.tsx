import { LocationOnRounded, NatureRounded, WifiRounded, RestaurantRounded, LocalParkingRounded } from '@mui/icons-material';

export interface Hotel {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  preco: number;
  imagem: string;
  sustentavel: boolean;
  comodidades: string[];
  pontos_desconto: number;
  porcentagem_desconto: number;
}

interface HotelCardProps {
  hotel: Hotel;
  pontosUsuario?: number;
}

const comodidadeIcons: { [key: string]: React.ReactNode } = {
  'Wi-Fi': <WifiRounded className="w-4 h-4" />,
  'Restaurante': <RestaurantRounded className="w-4 h-4" />,
  'Estacionamento': <LocalParkingRounded className="w-4 h-4" />,
};

export function HotelCard({ hotel, pontosUsuario = 5000 }: HotelCardProps) {
  // Verificar se o usuário tem pontos suficientes para o desconto
  const temPontosSuficientes = pontosUsuario >= hotel.pontos_desconto;
  const valorDesconto = temPontosSuficientes ? (hotel.preco * hotel.porcentagem_desconto) / 100 : 0;
  const precoComDesconto = hotel.preco - valorDesconto;
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Imagem do hotel */}
      <div className="relative">
        <img 
          src={hotel.imagem} 
          alt={hotel.nome}
          className="w-full h-48 sm:h-56 object-cover"
        />
        {hotel.sustentavel && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <NatureRounded className="w-3 h-3" />
            Sustentável
          </div>
        )}
        {/* <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
          <StarRounded className="w-3 h-3" />
          {hotel.avaliacao.toFixed(1)}
        </div> */}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {hotel.nome}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <LocationOnRounded className="w-4 h-4" />
          <span className="text-sm">{hotel.cidade}, {hotel.estado}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hotel.descricao}
        </p>

        {/* Comodidades */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.comodidades.slice(0, 3).map((comodidade, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
              {comodidadeIcons[comodidade] || <span className="w-3 h-3 bg-gray-400 rounded-full"></span>}
              {comodidade}
            </div>
          ))}
          {hotel.comodidades.length > 3 && (
            <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
              +{hotel.comodidades.length - 3} mais
            </div>
          )}
        </div>

        {/* Preço e desconto */}
        <div className="space-y-2">
          {/* Preço original e com desconto */}
          <div className="flex justify-between items-center">
            <div>
              {valorDesconto > 0 ? (
                <>
                  <div className="text-sm text-gray-500 line-through">
                    R$ {hotel.preco.toFixed(2)}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {precoComDesconto.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold text-green-600">
                  R$ {hotel.preco.toFixed(2)}
                </div>
              )}
              <div className="text-xs text-gray-500">por noite</div>
            </div>
            
            {/* Informações do desconto */}
            <div className="text-right">
              {valorDesconto > 0 && (
                <div className="text-sm font-bold text-red-600 mb-1">
                  -{hotel.porcentagem_desconto}%
                </div>
              )}
              <div className="text-sm font-medium text-green-600">
                {hotel.pontos_desconto} pontos
              </div>
              <div className="text-xs text-gray-500">necessários</div>
            </div>
          </div>
          
          {/* Economia */}
          {valorDesconto > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="text-center">
                <div className="text-sm font-medium text-green-700">
                  Você economiza R$ {valorDesconto.toFixed(2)}
                </div>
                <div className="text-xs text-green-600">
                  Usando {hotel.pontos_desconto} pontos
                </div>
              </div>
            </div>
          )}
          
          {/* Aviso de pontos insuficientes */}
          {!temPontosSuficientes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
              <div className="text-center">
                <div className="text-sm font-medium text-yellow-700">
                  Desconto indisponível
                </div>
                <div className="text-xs text-yellow-600">
                  Você precisa de {hotel.pontos_desconto} pontos (tem {pontosUsuario})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão de reserva */}
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
