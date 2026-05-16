import { useState } from 'react';
import { LocationOnRounded, NatureRounded, AccessTimeRounded, GroupRounded, SailingRounded, MoneyOffRounded } from '@mui/icons-material';
import { DetalhesDialog } from '../DetalhesDialog';

export interface Passeio {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  preco: number;
  imagem: string;
  sustentavel: boolean;
  atividades: string[];
  duracao: string;
  grupo_max: number;
  pontos_desconto: string | number;
  porcentagem_desconto: number;
  textoRegiao?: string;
  boasPraticas?: string[];
  siteUrl?: string;
  req? : string;
}

interface PasseioCardProps {
  passeio: Passeio;
  pontosUsuario?: number;
}

const atividadeIcons: { [key: string]: React.ReactNode } = {
  'Mergulho': <SailingRounded className="w-4 h-4" />,
  'Trilha': <LocationOnRounded className="w-4 h-4" />,
  'Observação': <NatureRounded className="w-4 h-4" />,
};

import { useLanguage } from '../../contexts/LanguageContext';

export function PasseioCard({ passeio, pontosUsuario = 5000 }: PasseioCardProps) {
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const { t } = useLanguage();
  
  // Verificar se o usuário tem pontos suficientes para o desconto
  const temPontosSuficientes = typeof pontosUsuario === "number" ? pontosUsuario >= Number(passeio.pontos_desconto) : false;
  const valorDesconto = temPontosSuficientes ? (passeio.preco * passeio.porcentagem_desconto) / 100 : 0;
  const precoComDesconto = passeio.preco - valorDesconto;
  
  // Dados padrão para quando não estão definidos
  const boasPraticas = passeio.atividades || [
    'Grupos reduzidos para menor impacto ambiental',
    'Guias especializados em educação ambiental',
    'Materiais reutilizáveis e sustentáveis',
    'Apoio à conservação de espécies locais',
    'Parcerias com comunidades locais'
  ];
  
  const siteUrl = passeio.siteUrl || '#';
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
        {/* Imagem do passeio */}
        <div className="relative">
          <img 
            src={passeio.imagem} 
            alt={passeio.nome}
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className='w-full flex gap-2 flex-col justify-between absolute top-0 left-0 p-3'>
            {passeio.sustentavel && (
              <div className="w-fit bg-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                <NatureRounded className="w-3 h-3" />
                {t.common.sustainable}
              </div>
            )}
            {passeio.preco == 0 && (
              <div className="w-fit bg-green-700 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                <MoneyOffRounded className="w-3 h-3" />
                {t.common.free}
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {passeio.nome}
          </h3>
          
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <LocationOnRounded className="w-4 h-4" />
            <span className="text-sm">{passeio.cidade}, {passeio.estado}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {passeio.descricao}
          </p>

          {/* Informações do passeio */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <AccessTimeRounded className="w-4 h-4" />
              <span>{passeio.duracao}</span>
            </div>
            <div className="flex items-center gap-1">
              <GroupRounded className="w-4 h-4" />
              <span>{t.common.upToPeople.replace('{count}', passeio.grupo_max.toString())}</span>
            </div>
          </div>

          {/* Atividades */}
          <div className="flex flex-wrap gap-2 mb-4">
            {passeio.atividades.slice(0, 3).map((atividade, index) => (
              <div key={index} className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700">
                {atividadeIcons[atividade] || <span className="w-3 h-3 bg-blue-400 rounded-full"></span>}
                {atividade}
              </div>
            ))}
            {passeio.atividades.length > 3 && (
              <div className="bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700">
                {t.common.more.replace('{count}', (passeio.atividades.length - 3).toString())}
              </div>
            )}
          </div>

          {/* Preço e desconto */}
          <div className="space-y-2">
            {/* Preço original e com desconto */}
            <div className="flex justify-between items-center">
              <div>
                {passeio.preco > 0 ? (
                  <>
                    {valorDesconto > 0 ? (
                      <>
                        <div className="text-sm text-gray-500 line-through">
                          R$ {passeio.preco.toFixed(2)}
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          R$ {precoComDesconto.toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-blue-600">
                        R$ {passeio.preco.toFixed(2)}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">{t.common.perPerson}</div>
                  </>
                ) : (
                  <div className="text-lg font-bold text-blue-600">
                    {t.common.consultPrice}
                  </div>
                )}
              </div>
              
              {/* Informações do desconto */}
              <div className="text-right">
                {passeio.preco > 0 && valorDesconto > 0 && (
                  <div className="text-sm font-bold text-red-600 mb-1">
                    -{passeio.porcentagem_desconto}%
                  </div>
                )}
                <div className="text-sm font-medium text-blue-600">
                  {passeio.pontos_desconto} {t.common.points}
                </div>
                <div className="text-xs text-gray-500">{t.common.pointsRequired}</div>
              </div>
            </div>
            
            {/* Economia */}
            {passeio.preco > 0 && valorDesconto > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-700">
                    {t.common.youSave.replace('{amount}', `R$ ${valorDesconto.toFixed(2)}`)}
                  </div>
                  <div className="text-xs text-blue-600">
                    {t.common.usingPoints.replace('{points}', passeio.pontos_desconto.toString())}
                  </div>
                </div>
              </div>
            )}
            
            {/* Aviso de pontos insuficientes */}
            {passeio.preco > 0 && !temPontosSuficientes && Number(passeio.pontos_desconto) > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                <div className="text-center">
                  <div className="text-sm font-medium text-yellow-700">
                    {t.common.discountUnavailable}
                  </div>
                  <div className="text-xs text-yellow-600">
                    {t.common.needPoints.replace('{points}', passeio.pontos_desconto.toString()).replace('{userPoints}', pontosUsuario.toString())}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão de detalhes */}
          <button 
            onClick={() => setDialogoAberto(true)}
            className="cursor-pointer w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {t.common.viewDetails}
          </button>
        </div>
      </div>

      {/* Diálogo de detalhes */}
      <DetalhesDialog
        isOpen={dialogoAberto}
        onClose={() => setDialogoAberto(false)}
        titulo={passeio.nome}
        imagem={passeio.imagem}
        cidade={passeio.cidade}
        estado={passeio.estado}
        descricao={passeio.descricao}
        boasPraticas={boasPraticas}
        siteUrl={siteUrl}
        nomeEstabelecimento="passeio"
        reqs={passeio.req}
      />
    </>
  );
}
