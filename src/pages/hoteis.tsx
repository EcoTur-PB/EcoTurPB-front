import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { HotelCard, Hotel } from '../components/HotelCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
import { Moeda } from '../components/Moeda';

// Dados mockados dos hotéis
const hoteisData: Hotel[] = [
  {
    id: 1,
    nome: "Hotel Nord Easy Green Sunset",
    descricao: "Um hotel para aproveitar a vista panorâmica do mar e práticas ecológicas certificadas.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 198.00,
    imagem: "https://photos.hotelbeds.com/giata/original/16/163075/163075a_hb_a_001.jpg",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Estacionamento", "Piscina", "Spa"],
    pontos_desconto: 50,
    porcentagem_desconto: 20,
    textoRegiao: "João Pessoa, capital da Paraíba, oferece uma combinação única de cultura, história e belezas naturais. A cidade é pioneira em práticas de turismo sustentável no Nordeste brasileiro.",
    boasPraticas: [
      'Sistema de energia solar para aquecimento de água',
      'Programa de reutilização de toalhas e lençóis',
      'Produtos de limpeza biodegradáveis certificados',
      'Jardins com plantas nativas que requerem menos água',
      'Parceria com fornecedores locais e orgânicos'
    ],
    siteUrl: "https://hotelnordeasysunset.com.br"
  },
  {
    id: 3,
    nome: "Pousada Cabo Branco",
    descricao: "Pousada aconchegante em João Pessoa, próxima às principais atrações turísticas e com certificação ambiental.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 420.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipOLx8KzDOBE1X8P6-0BAyKVJceoPBm1Acc1N4O7=w4008-h3005-k-no",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Estacionamento", "Piscina", "Spa", "Academia", "Praia Privada"],
    pontos_desconto: 80,
    porcentagem_desconto: 25
  },
  {
    id: 4,
    nome: "Pousada Luar Nas Dunas",
    descricao: "Pousada familiar em Barra de Mamanguape, com foco em turismo sustentável e experiências locais autênticas.",
    cidade: "Barra de Mamanguape",
    estado: "PB",
    preco: 200.00,
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqEyzhNYuVVhDedgaqvT9KgeOE07RvQjqffJGt0ix8-PIwkKPeKlAJ0bpiZX8UEq2uagmelpyJ-TJm0z6L-_QMM4FR12hhD5r1tZiDuiIX_VOraQYQO1FQNdAqUmRLfQhob8JDI=s5670-k-no",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Estacionamento", "Piscina"],
    pontos_desconto: 60,
    porcentagem_desconto: 18
  },
  {
    id: 5,
    nome: "Pousada potiguara",
    descricao: "Quartos com o conforto que você merece para curtir a Barra de Camaratuba, PB",
    cidade: "Mataraca",
    estado: "PB",
    preco: 150.00,
    imagem: "https://hweb-upload.s3-sa-east-1.amazonaws.com/642dc2aa3c0d4e2d4770b82c/c733cbd6e54c43f0b4eea057262009a8.jpg",
    sustentavel: true,
    comodidades: ["Wi-Fi", "Restaurante", "Estacionamento", "Piscina"],
    pontos_desconto: 40,
    porcentagem_desconto: 10
  }
];

export default function HoteisPage() {
  const [hoteis] = useState<Hotel[]>(hoteisData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  
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
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Hospedagens <span className="text-green-600">Sustentáveis</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Descubra acomodações que se preocupam com o meio ambiente e oferecem experiências autênticas na Paraíba.
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moeda/>
              <div>
                <div className="text-lg font-bold text-green-700">
                  {pontosUsuario.toLocaleString()} pontos disponíveis
                </div>
                <div className="text-sm text-green-600">
                  Use seus pontos para obter descontos!
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
                  placeholder="Buscar por nome..."
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
                  <option value="">Todas as cidades</option>
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
                  <option value="nome">Nome (A-Z)</option>
                  <option value="preco-menor">Menor preço</option>
                  <option value="preco-maior">Maior preço</option>
                  <option value="economia">Maior economia</option>
                  <option value="pontos">Mais pontos</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {hoteisOrdenados.length} hote{hoteisOrdenados.length !== 1 ? 'is' : 'l'} encontrado{hoteisOrdenados.length !== 1 ? 's' : ''}
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
                Nenhum hotel encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar seus filtros de busca.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
