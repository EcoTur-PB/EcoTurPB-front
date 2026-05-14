import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { PasseioCard, Passeio } from '../components/PasseioCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
import { Moeda } from '../components/Moeda';

// Dados mockados dos passeios
const passeiosData: Passeio[] = [
  {
    id: 1,
    nome: "Mutirão para limpeza de praias",
    descricao: "Participe ativamente da preservação do nosso litoral. O Projeto Mares sem Plástico promove ações de limpeza e conscientização sobre o impacto dos resíduos nos ecossistemas marinhos de João Pessoa.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Limpeza", "Educação Ambiental", "Conscientização"],
    duracao: "3 horas",
    grupo_max: 50,
    pontos_desconto: 0,
    porcentagem_desconto: 0,
    textoRegiao: "As praias de João Pessoa, como Tambaú e Cabo Branco, são cartões-postais da cidade. Preservar sua restinga e limpeza é vital para a biodiversidade local e para o turismo sustentável na capital paraibana.",
    boasPraticas: [
      'Uso de luvas e sacos biodegradáveis',
      'Triagem de microplásticos na areia',
      'Destinação correta para cooperativas de reciclagem',
    ],
    siteUrl: "https://maressemplastico.com.br",
    req: "Leve protetor solar, boné e disposição para ajudar!"
  },
  {
    id: 2,
    nome: "Projeto Peixe-Boi Marinho",
    descricao: "Conheça o trabalho de conservação de um dos mamíferos aquáticos mais ameaçados do Brasil. O tour inclui visita ao centro de visitantes e observação em ambiente natural no estuário.",
    cidade: "Rio Tinto",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Observação", "Educação Ambiental", "Navegação"],
    duracao: "3 horas",
    grupo_max: 10,
    pontos_desconto: 20,
    porcentagem_desconto: 15,
    textoRegiao: "A APA da Barra do Rio Mamanguape é um santuário de biodiversidade, abrigando o principal remanescente de peixe-boi marinho no Brasil, entre manguezais preservados e águas calmas.",
    boasPraticas: [
      'Silêncio durante a observação',
      'Não alimentar ou tocar nos animais',
      'Uso de embarcações de baixo impacto',
    ],
    siteUrl: "https://www.vivaopeixeboi.org"
  },
  {
    id: 3,
    nome: "Mergulho em Areia Vermelha",
    descricao: "Explore as piscinas naturais que se formam na maré baixa. Este passeio foca na observação consciente da vida marinha e na proteção dos recifes de corais de Cabedelo.",
    cidade: "Cabedelo",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Mergulho", "Observação", "Fotografia"],
    duracao: "4 horas",
    grupo_max: 12,
    pontos_desconto: 30,
    porcentagem_desconto: 20,
    textoRegiao: "O Parque Estadual Marinho de Areia Vermelha é uma unidade de conservação que exige cuidados especiais. Suas águas cristalinas revelam um ecossistema coralíneo frágil e exuberante.",
    boasPraticas: [
      'Proibido o uso de calçados nos corais',
      'Uso de protetor solar biodegradável',
      'Não coletar conchas ou pedaços de corais',
      'Distanciamento seguro da fauna marinha'
    ],
    siteUrl: "https://www.cabedelo.pb.gov.br"
  },
  {
    id: 4,
    nome: "Trilhas dos Potiguaras",
    descricao: "Uma imersão na cultura e natureza das terras indígenas Potiguara. Caminhadas por trilhas ancestrais, banhos de rio e vivência com a comunidade local.", 
    cidade: "Baía da Traição",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Cultura Indígena", "Trilha", "Banho de Rio"],
    duracao: "5 horas",
    grupo_max: 15,
    pontos_desconto: 25,
    porcentagem_desconto: 10,
    textoRegiao: "A reserva indígena Potiguara preserva não apenas a cultura de um povo guerreiro, mas também vastas áreas de Mata Atlântica e manguezais no litoral norte paraibano.",
    boasPraticas: [
      'Respeito às tradições e locais sagrados',
      'Contratação de guias locais indígenas',
      'Compra de artesanato direto da comunidade'
    ]
  },
  {
    id: 5,
    nome: "Vivência Potiguara Expeditions",
    descricao: "Expedição completa pelo território Potiguara. Inclui oficina de artesanato, pintura corporal com urucum e pajelança, promovendo o etnoturismo responsável.", 
    cidade: "Baía da Traição",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Etnoturismo", "Oficinas", "Cultura"],
    duracao: "8 horas",
    grupo_max: 8,
    pontos_desconto: 40,
    porcentagem_desconto: 25,
    boasPraticas: [
      'Peça permissão antes de fotografar pessoas',
      'Contribuição para o fundo comunitário da aldeia',
      'Valorização do conhecimento ancestral'
    ]
  },
  {
    id: 6,
    nome: "Trilha no Jardim Botânico",
    descricao: "Caminhada guiada pela Mata do Buraquinho, um dos maiores remanescentes de Mata Atlântica em área urbana no Brasil, focada na botânica e história local.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Trilha Ecológica", "Educação Ambiental", "Observação de Aves"],
    duracao: "2 horas",
    grupo_max: 20,
    pontos_desconto: 10,
    porcentagem_desconto: 50,
    textoRegiao: "O Jardim Botânico Benjamin Maranhão é um oásis verde no coração de João Pessoa, essencial para o microclima da cidade e abrigo de diversas espécies da fauna e flora silvestre.",
    boasPraticas: [
      'Uso obrigatório de calça comprida e calçado fechado',
      'Não retirar mudas ou sementes da floresta',
      'Seguir rigorosamente as trilhas demarcadas'
    ]
  },
  {
    id: 7,
    nome: "Visita à Estátua de Iemanjá",
    descricao: "Conheça um dos marcos culturais e religiosos mais importantes do litoral paraibano. Localizada na Praia do Cabo Branco, a estátua de Iemanjá é um ponto de veneração e respeito às tradições afro-brasileiras.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    atividades: ["Visitação", "Cultura", "Fotografia"],
    duracao: "1 hora",
    grupo_max: 100,
    pontos_desconto: 0,
    porcentagem_desconto: 0,
    textoRegiao: "A Praia do Cabo Branco abriga este monumento icônico, sendo um local de grande importância espiritual para as religiões de matriz africana e um ponto turístico contemplativo.",
    boasPraticas: [
      'Respeito ao silêncio e à devoção alheia',
      'Não deixar lixo no local ou na areia',
      'Preservação do monumento histórico'
    ]
  }
];

import { useLanguage } from '../contexts/LanguageContext';

export default function PasseiosPage() {
  const [passeios] = useState<Passeio[]>(passeiosData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('preco-menor');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const { t } = useLanguage();
  
  // Pontos do usuário (pode ser alterado para testar)
  const [pontosUsuario, setPontosUsuario] = useState(50);

  // Função para filtrar passeios
  const passeiosFiltrados = passeios.filter(passeio => {
    const matchesNome = passeio.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchesCidade = cidadeFiltro === '' || passeio.cidade === cidadeFiltro;
    return matchesNome && matchesCidade;
  });

  // Função para ordenar passeios
  const restaurantesOrdenados = [...passeiosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'preco-menor':
        return a.preco - b.preco;
      case 'preco-maior':
        return b.preco - a.preco;
      case 'economia':
        // Ordena pela maior economia (valor em reais)
        const economiaA = (a.preco * a.porcentagem_desconto) / 100;
        const economiaB = (b.preco * b.porcentagem_desconto) / 100;
        return economiaB - economiaA;
      case 'pontos':
        return  Number(b.pontos_desconto) - Number(a.pontos_desconto);
      case 'duracao':
        // Ordenar por duração (converte para número de horas)
        const duracaoA = parseInt(a.duracao.split(' ')[0]);
        const duracaoB = parseInt(b.duracao.split(' ')[0]);
        return duracaoA - duracaoB;
      default:
        return a.nome.localeCompare(b.nome);
    }
  });

  useEffect(() => {
    // Simulação de chamada para obter pontos do usuário
    const fetchPontosUsuario = async () => {
      // Aqui você poderia fazer uma chamada API real para obter os pontos do usuário
      // Simulando com um valor fixo
      setPontosUsuario(50); // Exemplo: usuário tem 50 pontos
    };
    fetchPontosUsuario();
  }, []);

  // Obter cidades únicas para o filtro
  const cidades = [...new Set(passeios.map(passeio => passeio.cidade))];

  return (
    <div className="bg-blue-50 min-h-screen">
      <SEO title={t.passeios.seoTitle} description={t.passeios.subtitle} />
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            {t.passeios.title.split(' ').map((word, i) => (
              <span key={i}>
                {word === 'Sustentáveis' || word === 'Sustainable' ? (
                  <span className="text-blue-600">{word}</span>
                ) : word}
                {' '}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t.passeios.subtitle}
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moeda/>
              <div>
                <div className="text-lg font-bold text-blue-700">
                  {t.passeios.pointsAvailable.replace('{points}', pontosUsuario.toLocaleString())}
                </div>
                <div className="text-sm text-blue-600">
                  {t.passeios.usePointsDesc}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Busca por nome */}
              <div className="relative">
                <SearchRounded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.passeios.searchPlaceholder}
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro por cidade */}
              <div className="relative">
                <FilterListRounded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={cidadeFiltro}
                  onChange={(e) => setCidadeFiltro(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t.passeios.allCities}</option>
                  {cidades.map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>

              {/* Ordenação */}
              <div className="relative">
                <SortRounded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="nome">{t.passeios.sortName}</option>
                  <option value="preco-menor">{t.passeios.sortPriceLow}</option>
                  <option value="preco-maior">{t.passeios.sortPriceHigh}</option>
                  <option value="economia">{t.passeios.sortEconomy}</option>
                  <option value="pontos">{t.passeios.sortPoints}</option>
                  <option value="duracao">{t.passeios.sortDuration}</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {t.passeios.foundCount.replace('{count}', restaurantesOrdenados.length.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de passeios */}
        <div className="max-w-7xl mx-auto px-4">
          {restaurantesOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {restaurantesOrdenados.map(passeio => (
                <PasseioCard key={passeio.id} passeio={passeio} pontosUsuario={pontosUsuario} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🚢</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {t.passeios.notFound}
              </h3>
              <p className="text-gray-500">
                {t.passeios.tryAdjustFilters}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
