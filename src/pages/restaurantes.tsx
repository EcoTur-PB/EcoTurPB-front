import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { RestauranteCard, Restaurante } from '../components/RestauranteCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';

// Dados mockados dos restaurantes
const restaurantesData: Restaurante[] = [
  {
    id: 1,
    nome: "Casa do Bacalhau",
    descricao: "Restaurante especializado em frutos do mar frescos e pratos regionais, com ingredientes locais e práticas sustentáveis.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 65.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipOFvBzKpDmX4vG7GvQXXoZBK5QYFqJNGMjh4k8I=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Frutos do Mar", "Regional", "Peixes"],
    horario_funcionamento: "11:00 - 22:00",
    avaliacao: 4.8,
    pontos_desconto: 20,
    porcentagem_desconto: 15,
    textoRegiao: "João Pessoa, capital da Paraíba, é famosa por seus frutos do mar frescos e culinária regional única. A cidade possui uma rica tradição pesqueira e gastronômica, oferecendo ingredientes de alta qualidade diretamente dos pescadores locais.",
    boasPraticas: [
      "Parceria direta com pescadores locais",
      "Cardápio sazonal com ingredientes frescos",
      "Redução de plásticos descartáveis",
      "Compostagem de resíduos orgânicos",
      "Apoio à economia local"
    ],
    siteUrl: "https://casadobacalhau.com.br"
  },
  {
    id: 2,
    nome: "Mangai",
    descricao: "Culinária regional nordestina com ingredientes orgânicos e apoio a produtores locais da Paraíba.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 45.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipNQzJvMz5CzHJfY5QBK8fQhNmI9gLqKyL6vQfVe=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Regional", "Típica", "Orgânica"],
    horario_funcionamento: "11:30 - 15:00, 18:00 - 23:00",
    avaliacao: 4.6,
    pontos_desconto: 15,
    porcentagem_desconto: 12
  },
  {
    id: 3,
    nome: "Tábua de Carne",
    descricao: "Churrascaria com carnes de fornecedores locais certificados e compromisso com a sustentabilidade.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 85.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipPdgHjL4zXzBfYpYzKJ8QmJhN5vL4tNgN8fKzN7=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Carnes", "Churrasco", "Local"],
    horario_funcionamento: "18:00 - 24:00",
    avaliacao: 4.7,
    pontos_desconto: 30,
    porcentagem_desconto: 18
  },
  {
    id: 4,
    nome: "Green Garden",
    descricao: "Restaurante vegetariano e vegano com horta própria e foco em alimentação saudável e sustentável.",
    cidade: "Campina Grande",
    estado: "PB",
    preco: 35.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMzL8BYzHgJ4VfRzKvQxLqPwN9mJdL5tXb8cG2f=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Vegetariana", "Vegana", "Orgânica"],
    horario_funcionamento: "08:00 - 20:00",
    avaliacao: 4.5,
    pontos_desconto: 12,
    porcentagem_desconto: 10
  },
  {
    id: 5,
    nome: "Restaurante do Sertão",
    descricao: "Comida típica sertaneja com ingredientes da agricultura familiar local e práticas de comércio justo.",
    cidade: "Patos",
    estado: "PB",
    preco: 40.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipNhZpL7VfKj2YxNzB8QhMvP5wR9qLnXtJ4cG8kM=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Sertaneja", "Regional", "Agricultura Familiar"],
    horario_funcionamento: "11:00 - 21:00",
    avaliacao: 4.4,
    pontos_desconto: 18,
    porcentagem_desconto: 14
  },
  {
    id: 6,
    nome: "Maré Alta",
    descricao: "Vista para o mar com frutos do mar frescos de pescadores locais e compromisso com a pesca sustentável.",
    cidade: "Cabedelo",
    estado: "PB",
    preco: 75.00,
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMkL9zYxJ4RgHvB6VfZ2QhKlN8qPdG7wX5cM9jL=w4008-h3006-k-no",
    sustentavel: true,
    especialidades: ["Frutos do Mar", "Peixes", "Vista Mar"],
    horario_funcionamento: "12:00 - 22:00",
    avaliacao: 4.9,
    pontos_desconto: 25,
    porcentagem_desconto: 16
  }
];

export default function RestaurantesPage() {
  const [restaurantes] = useState<Restaurante[]>(restaurantesData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  
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
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Restaurantes <span className="text-green-600">Sustentáveis</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Saboreie pratos deliciosos em estabelecimentos que valorizam ingredientes locais e práticas sustentáveis na Paraíba.
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-2xl">🍽️</div>
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
                  <option value="avaliacao">Melhor avaliação</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-gray-600 font-medium">
                  {restaurantesOrdenados.length} restaurante{restaurantesOrdenados.length !== 1 ? 's' : ''} encontrado{restaurantesOrdenados.length !== 1 ? 's' : ''}
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
                Nenhum restaurante encontrado
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
