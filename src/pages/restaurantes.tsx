import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { RestauranteCard, Restaurante } from '../components/RestauranteCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
// import { Moeda } from '../components/Moeda';

// Dados mockados dos restaurantes
const restaurantesData: Restaurante[] = [
  {
    id: 1,
    nome: "Margarida Pizzas Artesanais",
    descricao: "Pizzas artesanais com ingredientes locais e práticas sustentáveis na pacata vila de pescadores.",
    cidade: "Barra de Mamanguape",
    estado: "PB",
    preco: 0,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noqFz3EJ44W3sR13WYAvUXWmoQAnXYlXw60MmahECvDbvdc0PqGT7tg-yKOfnZeU7gNkP1eAreK52Ra5Lmj3DUUaaU8ghfrqhogj2rhMKJROzuSDIi0FjXq_Idh0K4qWRhWwNsqjQ=w2003-h2700-k-no",
    sustentavel: true,
    especialidades: ["Pizzas", "Regional", "Artesanais"],
    horario_funcionamento: "18:30 - 22:00",
    avaliacao: 4.8,
     // pontos_desconto: 20,
    porcentagem_desconto: 15,
    textoRegiao: "A Barra de Mamanguape é um destino de ecoturismo isolado, onde o rio se encontra com o mar. A vila preserva um estilo de vida simples e integrado à natureza, sendo base para o Projeto Peixe-Boi.",
    boasPraticas: [
      "Uso de ingredientes da agricultura familiar local",
      "Redução drástica de resíduos plásticos",
      "Contratação de funcionários da própria comunidade",
      "Compostagem de resíduos orgânicos",
      "Iluminação de baixo consumo"
    ],
    siteUrl: "https://www.instagram.com/margaridapizzas/"
  },
  {
    id: 2,
    nome: "Oca Natural",
    descricao: "Cozinha natural e intimista com foco em alimentos orgânicos, pratos sem glúten e opções saudáveis que respeitam o meio ambiente.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr4E2HcA1jIHPx_ZANP7JhczxjiN6ZREV6823gVZdi_V2vW6R6_NQyLItJ_p2AqAlK5zDHbTCkWSKixe2K9yc2gx5pt258kVcTmPES7DXyQQYUk2T3TY4vt4Ukt-J8R3kZwMwg=s1360-w1360-h1020-rw",
    sustentavel: true,
    especialidades: ['Natural', 'Saudável', 'Orgânica'],
    horario_funcionamento: "11:30 - 15:00",
    avaliacao: 4.9,
     // pontos_desconto: 30,
    porcentagem_desconto: 20,
    textoRegiao: "Comer bem em João Pessoa também significa escolher opções saudáveis. A Oca Natural se destaca pela qualidade dos ingredientes vindos diretamente de produtores orgânicos da região.",
    boasPraticas: [
      "Ingredientes 100% orgânicos e sazonais",
      "Zero uso de conservantes artificiais",
      "Embalagens biodegradáveis para delivery",
      "Programa de reciclagem de óleo de cozinha"
    ],
    siteUrl: "https://www.instagram.com/ocanaturaljp/"
  },
  {
    id: 3,
    nome: "Restaurante Buckminster",
    descricao: "Inspirado na arquitetura biofílica, o restaurante foi projetado em torno de uma árvore cajueira preservada, integrando-se perfeitamente ao ecossistema local.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    especialidades: ["Regional", "Contemporânea"],
    horario_funcionamento: "12:00 - 23:00",
    avaliacao: 4.7,
     // pontos_desconto: 25,
    porcentagem_desconto: 15,
    textoRegiao: "Localizado no Jardim Oceania, o Buckminster é um exemplo de como a arquitetura pode respeitar a natureza, mantendo a vegetação original como parte do ambiente.",
    boasPraticas: [
      "Arquitetura biofílica integrada",
      "Preservação de árvores nativas no local",
      "Iluminação e ventilação natural otimizadas",
      "Uso de materiais de construção sustentáveis"
    ],
    siteUrl: "https://www.instagram.com/buckminsterjp/"
  },
  {
    id: 4,
    nome: "Quintal Restô",
    descricao: "Alta gastronomia autoral que valoriza o pequeno produtor local e ingredientes sazonais da Paraíba, reduzindo a pegada de carbono do transporte.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    especialidades: ["Autoral", "Contemporânea", "Sazonal"],
    horario_funcionamento: "19:00 - 23:00",
    avaliacao: 4.9,
     // pontos_desconto: 40,
    porcentagem_desconto: 20,
    textoRegiao: "No bairro do Bessa, o Quintal Restô oferece uma experiência intimista onde cada prato conta uma história sobre os produtores e a terra paraibana.",
    boasPraticas: [
      "Fomento direto a pequenos produtores locais",
      "Cardápio baseado exclusivamente em ingredientes da estação",
      "Redução drástica de desperdício na cozinha",
      "Compostagem própria de resíduos orgânicos"
    ],
    siteUrl: "https://quintalresto.com.br"
  },
  {
    id: 5,
    nome: "Casa de Nara",
    descricao: "Referência em alta gastronomia 100% vegetal em João Pessoa, unindo sofisticação, sabor e consciência ambiental à beira-mar.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    sustentavel: true,
    especialidades: ["Vegetariana", "Natural"],
    horario_funcionamento: "12:00 - 21:00",
    avaliacao: 4.8,
     // pontos_desconto: 20,
    porcentagem_desconto: 15,
    textoRegiao: "Localizada em Manaíra, a Casa de Nara prova que a culinária à base de plantas pode ser sofisticada e extremamente saborosa, com uma vista privilegiada do mar.",
    boasPraticas: [
      "Culinária 100% baseada em plantas (vegana)",
      "Uso preferencial de ingredientes orgânicos",
      "Substituição total de plásticos de uso único",
      "Gestão eficiente de água"
    ],
    siteUrl: "https://www.instagram.com/casadenarajp/"
  }
];

import { useLanguage } from '../contexts/LanguageContext';

export default function RestaurantesPage() {
  const [restaurantes] = useState<Restaurante[]>(restaurantesData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const [apenasParceiros, setApenasParceiros] = useState(false);
  const { t } = useLanguage();
  
  // Pontos do usuário (pode ser alterado para testar)
  const [pontosUsuario, setPontosUsuario] = useState(50);

  // Função para filtrar restaurantes
  const restaurantesFiltrados = restaurantes.filter(restaurante => {
    const matchesNome = restaurante.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchesCidade = cidadeFiltro === '' || restaurante.cidade === cidadeFiltro;
    const matchesParceiro = !apenasParceiros || restaurante.parceiro_oficial;
    return matchesNome && matchesCidade && matchesParceiro;
  });

  // Função para ordenar restaurantes
  const restaurantesOrdenados = [...restaurantesFiltrados].sort((a, b) => {
    // Priorizar parceiros oficiais
    if (a.parceiro_oficial && !b.parceiro_oficial) return -1;
    if (!a.parceiro_oficial && b.parceiro_oficial) return 1;

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
      // case 'pontos':
      //   return (b.pontos_desconto ?? 0) - (a.pontos_desconto ?? 0);
      case 'avaliacao':
        return b.avaliacao - a.avaliacao;
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
  const cidades = [...new Set(restaurantes.map(restaurante => restaurante.cidade))];

  return (
    <div className="bg-green-50 min-h-screen">
      <SEO title={t.restaurantes.seoTitle} description={t.restaurantes.subtitle} />
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            {t.restaurantes.title.split(' ').map((word, i) => (
              <span key={i}>
                {word === 'Sustentáveis' || word === 'Sustainable' ? (
                  <span className="text-green-600">{word}</span>
                ) : word}
                {' '}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t.restaurantes.subtitle}
          </p>
          
          {/* Pontos do usuário */}
          {/* <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moeda/>
              <div>
                <div className="text-lg font-bold text-green-700">
                  {t.restaurantes.pointsAvailable.replace('{points}', pontosUsuario.toLocaleString())}
                </div>
                <div className="text-sm text-green-600">
                  {t.restaurantes.usePointsDesc}
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Filtros e busca */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Busca por nome */}
              <div className="relative">
                <SearchRounded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.restaurantes.searchPlaceholder}
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filtro por cidade */}
              <div className="relative">
                <FilterListRounded className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={cidadeFiltro}
                  onChange={(e) => setCidadeFiltro(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t.restaurantes.allCities}</option>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  <option value="nome">{t.restaurantes.sortName}</option>
                  <option value="preco-menor">{t.restaurantes.sortPriceLow}</option>
                  <option value="preco-maior">{t.restaurantes.sortPriceHigh}</option>
                  <option value="economia">{t.restaurantes.sortEconomy}</option>
                  {/* <option value="pontos">{t.restaurantes.sortPoints}</option> */}
                  <option value="avaliacao">{t.restaurantes.sortRating}</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-2">
                <input
                  type="checkbox"
                  id="apenasParceiros"
                  checked={apenasParceiros}
                  onChange={(e) => setApenasParceiros(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                />
                <label htmlFor="apenasParceiros" className="text-sm text-gray-700 cursor-pointer select-none">
                  {t.common.onlyOfficialPartners}
                </label>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {t.restaurantes.foundCount.replace('{count}', restaurantesOrdenados.length.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de restaurantes */}
        <div className="max-w-7xl mx-auto px-4">
          {restaurantesOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {restaurantesOrdenados.map(restaurante => (
                <RestauranteCard key={restaurante.id} restaurante={restaurante} pontosUsuario={pontosUsuario} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {t.restaurantes.notFound}
              </h3>
              <p className="text-gray-500">
                {t.restaurantes.tryAdjustFilters}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
