import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { RestauranteCard, Restaurante } from '../components/RestauranteCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
import { Moeda } from '../components/Moeda';

// Dados mockados dos restaurantes
const restaurantesData: Restaurante[] = [
  {
    id: 1,
    nome: "Margarida Pizzas Artesanais",
    descricao: "Pizzas artesanais com ingredientes locais e práticas sustentáveis na pacata vila de pescadores.",
    cidade: "Barra de Mamanguape",
    estado: "PB",
    preco: 35.00,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noqFz3EJ44W3sR13WYAvUXWmoQAnXYlXw60MmahECvDbvdc0PqGT7tg-yKOfnZeU7gNkP1eAreK52Ra5Lmj3DUUaaU8ghfrqhogj2rhMKJROzuSDIi0FjXq_Idh0K4qWRhWwNsqjQ=w2003-h2700-k-no",
    sustentavel: true,
    especialidades: ["Pizzas", "Regional", "Artesanais"],
    horario_funcionamento: "18:30 - 22:00",
    avaliacao: 4.8,
    pontos_desconto: 20,
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
    nome: "Mangai",
    descricao: "Referência em culinária regional nordestina, o Mangai utiliza ingredientes de alta qualidade e apoia pequenos produtores da Paraíba.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 75.00,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noJ9FiUKe48F1cB9A5PqRlA2u152khsNSid6K-XIqCYkB544YJt7ZaqqqI0wPMR7uzdqIx4sRc5dL8Ac-uqlF8QueL_u0UUgw6-BOF4MsFcJ7IVOBciCTiI1UlDMys_b4fAbgLo=s1360-w1360-h1020-rw",
    sustentavel: true,
    especialidades: ["Regional", "Típica", "Nordestina"],
    horario_funcionamento: "11:30 - 22:00",
    avaliacao: 4.8,
    pontos_desconto: 15,
    porcentagem_desconto: 10,
    textoRegiao: "João Pessoa é um polo gastronômico que une tradição e modernidade. O bairro de Manaíra, onde o Mangai está localizado, oferece uma vasta gama de opções que celebram o sabor do sertão e do mar.",
    boasPraticas: [
      "Gestão eficiente de resíduos",
      "Uso de energia solar em suas unidades",
      "Valorização da cultura nordestina através da gastronomia",
      "Apoio a projetos sociais locais"
    ],
    siteUrl: "https://mangai.com.br"
  },
  {
    id: 3,
    nome: "Oca Natural",
    descricao: "Cozinha natural e intimista com foco em alimentos orgânicos, pratos sem glúten e opções saudáveis que respeitam o meio ambiente.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 45.00,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr4E2HcA1jIHPx_ZANP7JhczxjiN6ZREV6823gVZdi_V2vW6R6_NQyLItJ_p2AqAlK5zDHbTCkWSKixe2K9yc2gx5pt258kVcTmPES7DXyQQYUk2T3TY4vt4Ukt-J8R3kZwMwg=s1360-w1360-h1020-rw",
    sustentavel: true,
    especialidades: ['Natural', 'Saudável', 'Orgânica'],
    horario_funcionamento: "11:30 - 15:00",
    avaliacao: 4.9,
    pontos_desconto: 30,
    porcentagem_desconto: 20,
    textoRegiao: "Comer bem em João Pessoa também significa escolher opções saudáveis. A Oca Natural se destaca pela qualidade dos ingredientes vindos diretamente de produtores orgânicos da região.",
    boasPraticas: [
      "Ingredientes 100% orgânicos e sazonais",
      "Zero uso de conservantes artificiais",
      "Embalagens biodegradáveis para delivery",
      "Programa de reciclagem de óleo de cozinha"
    ],
    siteUrl: "https://www.instagram.com/ocanaturaljp/"
  }
];

import { useLanguage } from '../contexts/LanguageContext';

export default function RestaurantesPage() {
  const [restaurantes] = useState<Restaurante[]>(restaurantesData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const { t } = useLanguage();
  
  // Pontos do usuário (pode ser alterado para testar)
  const [pontosUsuario, setPontosUsuario] = useState(50);

  // Função para filtrar restaurantes
  const restaurantesFiltrados = restaurantes.filter(restaurante => {
    const matchesNome = restaurante.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchesCidade = cidadeFiltro === '' || restaurante.cidade === cidadeFiltro;
    return matchesNome && matchesCidade;
  });

  // Função para ordenar restaurantes
  const restaurantesOrdenados = [...restaurantesFiltrados].sort((a, b) => {
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
        return b.pontos_desconto - a.pontos_desconto;
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
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
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
                  <option value="pontos">{t.restaurantes.sortPoints}</option>
                  <option value="avaliacao">{t.restaurantes.sortRating}</option>
                </select>
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
