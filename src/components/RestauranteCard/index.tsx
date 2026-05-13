import { useState } from 'react';
import { LocationOnRounded, NatureRounded, RestaurantRounded, AccessTimeRounded, LocalPizzaRounded, FrontHandRounded, Spa, CompostRounded, BlenderRounded} from '@mui/icons-material';
import { DetalhesDialog } from '../DetalhesDialog';

export interface Restaurante {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  preco: number;
  imagem: string;
  sustentavel: boolean;
  especialidades: string[];
  horario_funcionamento: string;
  avaliacao: number;
  pontos_desconto: number;
  porcentagem_desconto: number;
  textoRegiao?: string;
  boasPraticas?: string[];
  siteUrl?: string;
}

interface RestauranteCardProps {
  restaurante: Restaurante;
  pontosUsuario?: number;
}

const especialidadeIcons: { [key: string]: React.ReactNode } = {
  'Frutos do Mar': <RestaurantRounded className="w-4 h-4" />,
  'Regional': <NatureRounded className="w-4 h-4" />,
  'Vegetariana': <NatureRounded className="w-4 h-4" />,
  'Pizzas': <LocalPizzaRounded className="w-4 h-4" />,
  'Artesanais': <FrontHandRounded className="w-4 h-4" />,
  'Orgânica': <CompostRounded className="w-4 h-4" />,
  'Típica': <RestaurantRounded className="w-4 h-4" />,
  'Natural': <Spa className="w-4 h-4" />,
  'Sucos Detox': <BlenderRounded className="w-4 h-4" />
};

import { useLanguage } from '../../contexts/LanguageContext';

export function RestauranteCard({ restaurante, pontosUsuario = 5000 }: RestauranteCardProps) {
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const { t } = useLanguage();
  
  // Verificar se o usuário tem pontos suficientes para o desconto
  const temPontosSuficientes = pontosUsuario >= restaurante.pontos_desconto;
  const valorDesconto = temPontosSuficientes ? (restaurante.preco * restaurante.porcentagem_desconto) / 100 : 0;
  const precoComDesconto = restaurante.preco - valorDesconto;
  
  // Dados padrão para quando não estão definidos
  const textoRegiao = restaurante.textoRegiao || `${restaurante.cidade} é uma cidade encantadora da Paraíba, conhecida por sua rica cultura gastronômica e tradições locais. A região oferece uma variedade de ingredientes frescos e naturais, proporcionando uma experiência culinária única e autêntica.`;
  
  const boasPraticas = restaurante.boasPraticas || [
    'Utilização de ingredientes locais e orgânicos',
    'Apoio a produtores da agricultura familiar',
    'Redução do desperdício de alimentos',
    'Gestão responsável de resíduos',
    'Economia de água e energia'
  ];
  
  const siteUrl = restaurante.siteUrl || '#';
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Imagem do restaurante */}
      <div className="relative">
        <img 
          src={restaurante.imagem} 
          alt={restaurante.nome}
          className="w-full h-48 sm:h-56 object-cover"
        />
        {restaurante.sustentavel && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <NatureRounded className="w-3 h-3" />
            {t.common.sustainable}
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {restaurante.nome}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <LocationOnRounded className="w-4 h-4" />
          <span className="text-sm">{restaurante.cidade}, {restaurante.estado}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {restaurante.descricao}
        </p>

        {/* Horário de funcionamento */}
        <div className="flex items-center gap-1 text-gray-600 mb-4 text-sm">
          <AccessTimeRounded className="w-4 h-4" />
          <span>{restaurante.horario_funcionamento}</span>
        </div>

        {/* Especialidades */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurante.especialidades.slice(0, 3).map((especialidade, index) => (
            <div key={index} className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs text-green-700">
              {especialidadeIcons[especialidade] || <span className="w-3 h-3 bg-green-400 rounded-full"></span>}
              {especialidade}
            </div>
          ))}
          {restaurante.especialidades.length > 3 && (
            <div className="bg-green-100 px-2 py-1 rounded-full text-xs text-green-700">
              {t.common.more.replace('{count}', (restaurante.especialidades.length - 3).toString())}
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
                    R$ {restaurante.preco.toFixed(2)}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {precoComDesconto.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold text-green-600">
                  R$ {restaurante.preco.toFixed(2)}
                </div>
              )}
              <div className="text-xs text-gray-500">{t.common.averagePrice}</div>
            </div>
            
            {/* Informações do desconto */}
            <div className="text-right">
              {valorDesconto > 0 && (
                <div className="text-sm font-bold text-red-600 mb-1">
                  -{restaurante.porcentagem_desconto}%
                </div>
              )}
              <div className="text-sm font-medium text-green-600">
                {restaurante.pontos_desconto} {t.common.points}
              </div>
              <div className="text-xs text-gray-500">{t.common.pointsRequired}</div>
            </div>
          </div>
          
          {/* Economia */}
          {valorDesconto > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="text-center">
                <div className="text-sm font-medium text-green-700">
                  {t.common.youSave.replace('{amount}', `R$ ${valorDesconto.toFixed(2)}`)}
                </div>
                <div className="text-xs text-green-600">
                  {t.common.usingPoints.replace('{points}', restaurante.pontos_desconto.toString())}
                </div>
              </div>
            </div>
          )}
          
          {/* Aviso de pontos insuficientes */}
          {!temPontosSuficientes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
              <div className="text-center">
                <div className="text-sm font-medium text-yellow-700">
                  {t.common.discountUnavailable}
                </div>
                <div className="text-xs text-yellow-600">
                  {t.common.needPoints.replace('{points}', restaurante.pontos_desconto.toString()).replace('{userPoints}', pontosUsuario.toString())}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão de detalhes */}
        <button 
          onClick={() => setDialogoAberto(true)}
          className="cursor-pointer w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          {t.common.viewDetails}
        </button>
      </div>
    </div>

    {/* Diálogo de detalhes */}
    <DetalhesDialog
      isOpen={dialogoAberto}
      onClose={() => setDialogoAberto(false)}
      titulo={restaurante.nome}
      imagem={restaurante.imagem}
      cidade={restaurante.cidade}
      estado={restaurante.estado}
      textoRegiao={textoRegiao}
      boasPraticas={boasPraticas}
      siteUrl={siteUrl}
      nomeEstabelecimento="restaurante"
    />
  </>
  );
}
