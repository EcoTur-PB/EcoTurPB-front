import { CloseRounded, OpenInNewRounded, LocationOnRounded } from '@mui/icons-material';

interface DetalhesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  imagem: string;
  cidade: string;
  estado: string;
  textoRegiao: string;
  boasPraticas: string[];
  siteUrl: string;
  nomeEstabelecimento: string;
  reqs? : string;
}

export function DetalhesDialog({ 
  isOpen, 
  onClose, 
  titulo, 
  imagem, 
  cidade, 
  estado, 
  textoRegiao, 
  boasPraticas, 
  siteUrl, 
  nomeEstabelecimento,
  reqs
}: DetalhesDialogProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseRounded className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Imagem */}
            <div className="space-y-4">
              <img 
                src={imagem} 
                alt={titulo}
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
              />
              
              {/* Localização */}
              <div className="flex items-center gap-2 text-gray-600">
                <LocationOnRounded className="w-5 h-5" />
                <span className="font-medium">{cidade}, {estado}</span>
              </div>
            </div>

            {/* Texto e informações */}
            <div className="space-y-6">
              {/* Sobre a região */}
              <div>
                <p className="text-gray-600 leading-relaxed">{reqs}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Sobre a Região</h3>
                <p className="text-gray-600 leading-relaxed">{textoRegiao}</p>
              </div>

              {/* Boas práticas */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Práticas Sustentáveis</h3>
                <ul className="space-y-2">
                  {boasPraticas.map((pratica, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-600">{pratica}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Botão para site */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => window.open(siteUrl, '_blank')}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>Visitar site do {nomeEstabelecimento}</span>
              <OpenInNewRounded className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
