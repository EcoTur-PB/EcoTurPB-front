import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { PasseioCard, Passeio } from '../components/PasseioCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';

// Dados mockados dos passeios
const passeiosData: Passeio[] = [
  {
    id: 1,
    nome: "Mergulho em Areia Vermelha",
    descricao: "Mergulho com snorkel em uma das piscinas naturais mais belas da Paraíba, com foco na preservação marinha.",
    cidade: "Cabedelo",
    estado: "PB",
    preco: 85.00,
    imagem: "https://originalexperience.com.br/wp-content/uploads/2022/10/MARACAJAU-MERGULHO-CATAMARA-3.jpg",
    sustentavel: true,
    atividades: ["Mergulho", "Observação", "Fotografia"],
    duracao: "4 horas",
    grupo_max: 12,
    pontos_desconto: 25,
    porcentagem_desconto: 15,
    textoRegiao: "Cabedelo, na Grande João Pessoa, é famosa por suas belezas naturais e ecossistemas marinhos preservados. A região de Areia Vermelha é um santuário natural que aparece durante a maré baixa.",
    boasPraticas: [
      'Grupos limitados para proteção dos corais',
      'Equipamentos reutilizáveis e sem químicos nocivos',
      'Educação ambiental sobre vida marinha',
      'Proibição de coleta de animais e corais',
      'Monitoramento da qualidade da água'
    ],
    siteUrl: "https://areiavermelhapb.com.br"
  },
  {
    id: 2,
    nome: "Trilha no Parque da Bica",
    descricao: "Trilha ecológica com observação de fauna e flora nativa, promovendo a conservação da Mata Atlântica.",
    cidade: "Areia",
    estado: "PB",
    preco: 45.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMQr8iJCmjOEgwxPfIy-ZiY8l5QYXPJ6-HFsrxq=w4008-h3006-k-no",
    sustentavel: true,
    atividades: ["Trilha", "Observação", "Educação Ambiental"],
    duracao: "3 horas",
    grupo_max: 15,
    pontos_desconto: 15,
    porcentagem_desconto: 10
  },
  {
    id: 3,
    nome: "Passeio de Catamarã Sustentável",
    descricao: "Navegação responsável com observação de tartarugas marinhas e educação ambiental sobre ecossistemas costeiros.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 120.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipNKsJ9mGzqJvNGM5yVzfqOhKUfEPXXoW4HZjZjQ=w4008-h3006-k-no",
    sustentavel: true,
    atividades: ["Navegação", "Observação", "Educação Ambiental"],
    duracao: "5 horas",
    grupo_max: 20,
    pontos_desconto: 40,
    porcentagem_desconto: 20
  },
  {
    id: 4,
    nome: "Tour pela Mata do Buraquinho",
    descricao: "Caminhada educativa pela maior área verde urbana de João Pessoa, com foco na preservação da biodiversidade.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 35.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipO5KzJvGHJQqMlCy4CvYk9UbzMlKdJ4lMNfCwNa=w4008-h3006-k-no",
    sustentavel: true,
    atividades: ["Caminhada", "Observação", "Educação Ambiental"],
    duracao: "2 horas",
    grupo_max: 10,
    pontos_desconto: 10,
    porcentagem_desconto: 8
  },
  {
    id: 5,
    nome: "Observação de Peixe-Boi no Rio Mamanguape",
    descricao: "Passeio de barco para observação do peixe-boi marinho em seu habitat natural, com guias especializados em conservação.",
    cidade: "Rio Tinto",
    estado: "PB",
    preco: 95.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMVqKpJZGHSzOGMK3PxQwYNFqMQhNwOjYhgJZXk=w4008-h3006-k-no",
    sustentavel: true,
    atividades: ["Observação", "Navegação", "Fotografia"],
    duracao: "6 horas",
    grupo_max: 8,
    pontos_desconto: 30,
    porcentagem_desconto: 18
  },
  {
    id: 6,
    nome: "Trilha do Açude de Bodocongó",
    descricao: "Caminhada ao redor do açude com observação de aves migratórias e aprendizado sobre recursos hídricos da região.",
    cidade: "Campina Grande",
    estado: "PB",
    preco: 25.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMjKPFgWv8BFY6QE7Qhv9zCYg5KxPQnJyHfYjN8=w4008-h3006-k-no",
    sustentavel: true,
    atividades: ["Caminhada", "Observação de Aves", "Educação Ambiental"],
    duracao: "3 horas",
    grupo_max: 12,
    pontos_desconto: 8,
    porcentagem_desconto: 12
  }
];

export default function PasseiosPage() {
  const [passeios] = useState<Passeio[]>(passeiosData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  
  // Pontos do usuário (pode ser alterado para testar)
  const [pontosUsuario, setPontosUsuario] = useState(50);

  // Função para filtrar passeios
  const passeiosFiltrados = passeios.filter(passeio => {
    const matchesNome = passeio.nome.toLowerCase().includes(filtro.toLowerCase());
    const matchesCidade = cidadeFiltro === '' || passeio.cidade === cidadeFiltro;
    return matchesNome && matchesCidade;
  });

  // Função para ordenar passeios
  const passeiosOrdenados = [...passeiosFiltrados].sort((a, b) => {
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
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Passeios <span className="text-blue-600">Sustentáveis</span> 
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Descubra experiências únicas que promovem a conservação ambiental e o turismo responsável na Paraíba.
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-2xl">🌊</div>
              <div>
                <div className="text-lg font-bold text-blue-700">
                  {pontosUsuario.toLocaleString()} pontos disponíveis
                </div>
                <div className="text-sm text-blue-600">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="nome">Nome (A-Z)</option>
                  <option value="preco-menor">Menor preço</option>
                  <option value="preco-maior">Maior preço</option>
                  <option value="economia">Maior economia</option>
                  <option value="pontos">Mais pontos</option>
                  <option value="duracao">Menor duração</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {passeiosOrdenados.length} passeio{passeiosOrdenados.length !== 1 ? 's' : ''} encontrado{passeiosOrdenados.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de passeios */}
        <div className="max-w-7xl mx-auto px-4">
          {passeiosOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {passeiosOrdenados.map(passeio => (
                <PasseioCard key={passeio.id} passeio={passeio} pontosUsuario={pontosUsuario} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🚢</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Nenhum passeio encontrado
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
