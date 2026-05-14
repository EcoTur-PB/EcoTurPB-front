import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { HotelCard, Hotel } from '../components/HotelCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
import { Moeda } from '../components/Moeda';
import { SEO } from '../components/SEO';

// Dados mockados dos hotéis
  const hoteisData: Hotel[] = [
  {
    id: 1,
    nome: "Eco Sítio Flor de Mel",
    descricao: "Ecopousada nota 5 no coração do Brejo Paraibano, em Bananeiras. Chalés aconchegantes com cozinha equipada, varanda com redes e trilhas guiadas pela mata. O café da manhã é totalmente regional e caseiro, com produtos da própria horta.",
    cidade: "Bananeiras",
    estado: "PB",
    preco: 0,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipO8JbREnaxbOJ_zrRfAJI6MyiCusaMDZ4pS08fi=s1360-w1360-h1020-rw",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Café da Manhã Incluso", "Trilhas Guiadas", "Varanda com Rede", "Cozinha Equipada"],
    pontos_desconto: 40,
    porcentagem_desconto: 15,
    textoRegiao: "Bananeiras, no Brejo Paraibano, é um refúgio verde a mais de 500m de altitude, com clima ameno, mata atlântica preservada e rica cultura regional. É um dos destinos de ecoturismo mais bem avaliados do interior da Paraíba.",
    boasPraticas: [
      "Horta orgânica própria que abastece o café da manhã",
      "Captação e reuso de água da chuva",
      "Trilhas guiadas com educação ambiental",
      "Resíduos orgânicos transformados em compostagem",
      "Arquitetura integrada à mata sem supressão de vegetação nativa"
    ],
    siteUrl: "https://www.instagram.com/ecositioflordemel/",
  },
  {
    id: 2,
    nome: "Pousada Rural Vaca Brava",
    descricao: "Pousada encravada em sítio histórico próximo a um engenho em Areia, no Brejo Paraibano. Área arborizada, fogueira, piscina e acolhimento familiar genuíno. Ótima base para explorar cachoeiras, engenhos e a história da região.",
    cidade: "Areia",
    estado: "PB",
    preco: 0,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEw1BTt0aiKmoXr3r_dCQBjkbiV8io0Zbk5h1BHwlsKP9lagkDPJV5OBnDaNbv94F6PmrNzgr4W5gLph6ygTZG5Udn6naZj3IB6_67Pt4kj2QKft3xoVyHPuKVvaH2K0NIPkyh2Cd_ylLM=w324-h312-n-k-no",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Café da Manhã Incluso", "Piscina", "Fogueira", "Estacionamento"],
    pontos_desconto: 35,
    porcentagem_desconto: 10,
    textoRegiao: "Areia é a cidade mais antiga do Brejo Paraibano, berço de personalidades históricas como José Américo de Almeida. A região possui cachoeiras, engenhos centenários, a Mata do Pau-Ferro e clima fresco durante todo o ano.",
    boasPraticas: [
      "Gastronomia 100% regional com produtos de agricultores locais",
      "Uso de madeira de reflorestamento nas instalações",
      "Iluminação com aproveitamento de luz natural",
      "Coleta seletiva de resíduos",
      "Apoio à agricultura familiar da região do Brejo"
    ],
    siteUrl: "https://www.instagram.com/pousadavacabrava/",
  },
  {
    id: 3,
    nome: "Fazenda Poço das Pedras",
    descricao: "Fazenda nota 5 em São João do Cariri, no semiárido paraibano. Banho de rio em poço natural entre pedras, céu estrelado deslumbrante sem poluição luminosa, comida sertaneja autêntica e fogueira à noite. A imersão no Cariri mais genuína que existe.",
    cidade: "São João do Cariri",
    estado: "PB",
    preco: 0,
    imagem: "https://cf.bstatic.com/xdata/images/hotel/square600/514264069.webp?k=ec1b755c26255f7899e17dcffca3cff2ccddb303add5f0c00db87ed86edcce51&o=",
    sustentavel: true,
    comodidades: ["Café da Manhã Incluso", "Refeições Regionais", "Banho de Rio", "Fogueira", "Observação de Estrelas"],
    pontos_desconto: 30,
    porcentagem_desconto: 10,
    textoRegiao: "O Cariri Paraibano é uma das regiões mais secas e encantadoras do Brasil. Com formações rochosas únicas, a caatinga em toda sua riqueza e o céu mais estrelado do Nordeste, é destino de quem busca turismo de natureza autêntico e desconectado.",
    boasPraticas: [
      "Uso de cisternas para captação de água da chuva",
      "Alimentação baseada integralmente na produção familiar local",
      "Zero geração de lixo plástico descartável para hóspedes",
      "Conservação da caatinga nativa na propriedade",
      "Energia gerada parcialmente por painéis solares"
    ],
    siteUrl: "https://www.instagram.com/fazendapocodaspedras/",
  },
  {
    id: 4,
    nome: "Pousada Matuto Sonhador",
    descricao: "Pousada rústica nota 4.8 em Cabaceiras, município mais seco do Brasil. Ambiente sertanejo aconchegante com o restaurante Sol dos Cariris no local, premiado pela gastronomia regional. Próxima ao Lajedo de Pai Mateus, uma das formações rochosas mais impressionantes do Nordeste.",
    cidade: "Cabaceiras",
    estado: "PB",
    preco: 0,
    imagem: "https://pousadamatutosonhador.com/wp-content/uploads/2022/08/5-1.jpg",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Café da Manhã Incluso", "Estacionamento", "Área de Lazer"],
    pontos_desconto: 45,
    porcentagem_desconto: 15,
    textoRegiao: "Cabaceiras é o município com menor índice pluviométrico do Brasil e palco do famoso Festival de Cinema de Cabaceiras. O Lajedo de Pai Mateus, com suas rochas graníticas e figuras rupestres, é patrimônio natural e histórico único.",
    boasPraticas: [
      "Gastronomia regional com receitas tradicionais do sertão",
      "Sistema de captação de água pluvial para uso geral",
      "Aproveitamento da arquitetura de pedra local para termorregulação natural",
      "Parcerias com artesãos e produtores rurais de Cabaceiras",
      "Plantio e manutenção de espécies da caatinga no entorno"
    ],
    siteUrl: "https://pousadamatutosonhador.com/",
  },
  {
    id: 5,
    nome: "Hotel Fazenda Rancho da Ema",
    descricao: "Fazenda em Cabaceiras com animais nativos (inclusive emas!), aviário, chalés de madeira rústicos e café da manhã farto com produtos regionais. Perfeita para famílias que querem vivenciar o sertão de forma autêntica e responsável.",
    cidade: "Cabaceiras",
    estado: "PB",
    preco: 0,
    imagem: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/7f/7b/25/rancho-da-ema-hotel.jpg?w=1400&h=-1&s=1",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Café da Manhã Incluso", "Estacionamento", "Área de Lazer", "Aviário"],
    pontos_desconto: 30,
    porcentagem_desconto: 10,
    textoRegiao: "Cabaceiras e o Cariri Paraibano formam um dos cenários mais cinematográficos do sertão nordestino. Fauna típica como emas, teiús e preás coexistem com o turismo rural responsável em propriedades que preservam a caatinga.",
    boasPraticas: [
      "Criação e preservação de animais nativos da caatinga",
      "Chalés construídos com madeira de lei certificada",
      "Café da manhã com produtos da própria fazenda e vizinhos",
      "Reaproveitamento de água para irrigação de jardins",
      "Educação ambiental para visitantes sobre fauna da caatinga"
    ],
    siteUrl: "https://www.instagram.com/ranchodaema/",
  },
  {
    id: 6,
    nome: "Território Macuxí Ecoturismo",
    descricao: "Território indígena às margens do Rio Gurugi, em Jacumã, no litoral sul da Paraíba. Camping sustentável em meio a 4 ecossistemas (mata atlântica, mangue, restinga e litoral). Trilhas ecológicas, banho de argila, piscina natural, caiaque e frutas colhidas na hora.",
    cidade: "Conde",
    estado: "PB",
    preco: 0,
    imagem: "https://lemeshotel.com.br/wp-content/uploads/casa-riomar-praia-do-arrombado-300x200.jpg",
    sustentavel: true,
    comodidades: ["Camping", "Trilhas Ecológicas", "Banho de Argila", "Piscina Natural", "Caiaque"],
    pontos_desconto: 20,
    porcentagem_desconto: 10,
    textoRegiao: "O litoral sul da Paraíba, no município do Conde, guarda praias intocadas como Tabatinga, Tambaba e Coqueirinho. O Território Macuxí representa a aliança entre preservação ambiental, cultura indígena e turismo de base comunitária.",
    boasPraticas: [
      "Turismo de base comunitária com gestão pelo povo indígena Macuxí",
      "Zero uso de produtos químicos no território",
      "Frutas e alimentos colhidos organicamente na propriedade",
      "Preservação ativa de 4 ecossistemas distintos",
      "Educação ambiental e cultural integrada às visitas"
    ],
    siteUrl: "https://www.instagram.com/territoriomacuxi/",
  },
  {
    id: 7,
    nome: "Slow Hostel – Hospedagem Criativa",
    descricao: "Hostel consciente e acolhedor em João Pessoa, a uma quadra da praia de Manaíra. Muito recomendado por viajantes nacionais e internacionais pelo ambiente sustentável, dicas de passeios ecológicos e gastronomia vegana próxima. Ideal para mochileiros conscientes.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhEeQkUxrdKHZvlVsLgrUwTccoc1Nk7bOv7Vdslo8L6TBKWY3KRYByaPL8ebbC2e67iTisuTsEeAqIE2WMU_vVXhknqfmBPNqWYNW3l2GhPFeJJwilbWlZ88CAShtNfrRm0_p27gfRDfgVGx5UMkEz7Co8UefxMBWEVx42d_nKIQDMe_X-3ZMReLNN2p=w324-h312-n-k-no",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Cozinha Compartilhada", "Área de Convivência", "Estacionamento para Bikes", "Quartos Compartilhados e Privativos"],
    pontos_desconto: 15,
    porcentagem_desconto: 10,
    textoRegiao: "João Pessoa, capital da Paraíba, é considerada uma das cidades mais arborizadas do Brasil e oferece praias de águas mornas, o Parque Estadual Marinho de Areia Vermelha e uma gastronomia nordestina rica e diversa.",
    boasPraticas: [
      "Política de coleta seletiva e compostagem",
      "Incentivo ao uso de transporte ativo (bike e a pé)",
      "Produtos de higiene biodegradáveis disponíveis",
      "Parceria com restaurantes e produtores veganos locais",
      "Reutilização de mobiliário e decoração de segunda mão"
    ],
    siteUrl: "https://slow-hostel.hotels-joao-pessoa.com/pt/",
  },
  {
    id: 8,
    nome: "Pousada Estação Bananeiras",
    descricao: "Pousada boutique instalada na histórica estação ferroviária de Bananeiras, inaugurada em 1922. Une patrimônio histórico preservado com conforto sofisticado, alta gastronomia regional e a paisagem do vale do Brejo Paraibano. Membro dos Roteiros de Charme.",
    cidade: "Bananeiras",
    estado: "PB",
    preco: 0,
    imagem: "https://instagram.fjpa1-1.fna.fbcdn.net/v/t51.82787-15/670980095_18588272182061356_3997343901691140570_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=Mzg4MDk2OTk2MDcwMTE0MjE4MjE4NTg4MjcyMTc5MDYxMzU2.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=TyCRe0KpADIQ7kNvwG31b0H&_nc_oc=AdrT6v_bHJJ6N0s1tNhfbx85kTeUttoOAUO7gGj1SMX5yqfgdbxb4EpTP-Ov04ix1TNLtuDxZe2D1yEax6r-jAnT&_nc_ad=z-m&_nc_cid=1295&_nc_zt=23&_nc_ht=instagram.fjpa1-1.fna&_nc_gid=qHG1_W2XdkBm_-_IdRaFng&_nc_ss=7a22e&oh=00_Af63jT1aLEkMA5MI-69JlvCFCsVT4OaO2CPTmY6yC-7YSw&oe=6A07CD78",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Spa", "Piscina", "Café da Manhã Incluso", "Estacionamento"],
    pontos_desconto: 60,
    porcentagem_desconto: 20,
    textoRegiao: "Bananeiras é o coração do Brejo Paraibano, com clima serrano, temperatura média de 19°C à noite, vales verdes e uma rica herança da era do açúcar e do algodão. A Estação Ferroviária, patrimônio histórico, foi revitalizada como símbolo do turismo sustentável da região.",
    boasPraticas: [
      "Requalificação e preservação de patrimônio histórico ferroviário",
      "Alta gastronomia with ingredientes 100% regionais e sazonais",
      "Sistema de tratamento e reuso de água",
      "Energia complementada por fontes renováveis",
      "Geração de emprego e renda para comunidade local de Bananeiras"
    ],
    siteUrl: "https://www.instagram.com/estacaobananeiras/",
  }
]

import { useLanguage } from '../contexts/LanguageContext';

export default function HoteisPage() {
  const [hoteis] = useState<Hotel[]>(hoteisData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const { t } = useLanguage();
  
  // Pontos do usuário (pode ser alterado para testar)
  const [pontosUsuario, setPontosUsuario] = useState(50);

  // Função para filtrar hotéis
  const hoteisFiltrados = hoteis.filter(hotel => {
    const matchesNome = hotel.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchesCidade = cidadeFiltro === '' || hotel.cidade === cidadeFiltro;
    return matchesNome && matchesCidade;
  });

  // Função para ordenar hotéis
  const hoteisOrdenados = [...hoteisFiltrados].sort((a, b) => {
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
  const cidades = [...new Set(hoteis.map(hotel => hotel.cidade))];

  return (
    <div className="bg-green-50 min-h-screen">
      <SEO 
        title={t.hoteis.seoTitle} 
        description={t.hoteis.subtitle}
      />
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            {t.hoteis.title.split(' ').map((word, i) => (
              <span key={i}>
                {word === 'Sustentáveis' || word === 'Sustainable' ? (
                  <span className="text-green-600">{word}</span>
                ) : word}
                {' '}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t.hoteis.subtitle}
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moeda/>
              <div>
                <div className="text-lg font-bold text-green-700">
                  {t.hoteis.pointsAvailable.replace('{points}', pontosUsuario.toLocaleString())}
                </div>
                <div className="text-sm text-green-600">
                  {t.hoteis.usePointsDesc}
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
                  placeholder={t.hoteis.searchPlaceholder}
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
                  <option value="">{t.hoteis.allCities}</option>
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
                  <option value="nome">{t.hoteis.sortName}</option>
                  <option value="preco-menor">{t.hoteis.sortPriceLow}</option>
                  <option value="preco-maior">{t.hoteis.sortPriceHigh}</option>
                  <option value="economia">{t.hoteis.sortEconomy}</option>
                  <option value="pontos">{t.hoteis.sortPoints}</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {t.hoteis.foundCount.replace('{count}', hoteisOrdenados.length.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de hotéis */}
        <div className="max-w-7xl mx-auto px-4">
          {hoteisOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {hoteisOrdenados.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} pontosUsuario={pontosUsuario} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🏨</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {t.hoteis.notFound}
              </h3>
              <p className="text-gray-500">
                {t.hoteis.tryAdjustFilters}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
