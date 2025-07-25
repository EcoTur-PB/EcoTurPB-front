import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { PasseioCard, Passeio } from '../components/PasseioCard';
import { SearchRounded, FilterListRounded, SortRounded } from '@mui/icons-material';
import { Moeda } from '../components/Moeda';

// Dados mockados dos passeios
const passeiosData: Passeio[] = [
  {
    id: 0,
    nome: "Mutirão para limpeza de praias",
    descricao: "O objetivo principal do Projeto Mares sem Plástico é apresentar para a sociedade a importância da preservação dos ambientes marinhos e costeiros e demonstrar o impacto do plástico nesses ecossistemas.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 0,
    imagem: "https://maressemplastico.com.br/wp-content/uploads/2022/08/274261049_967278447328268_5677348524536472115_n.jpg",
    sustentavel: true,
    atividades: ["Limpeza", "Educação Ambiental", "Conscientização"],
    duracao: "1 hora",
    grupo_max: 24,
    pontos_desconto: '+25',
    porcentagem_desconto: 15,
    textoRegiao: "O ecossistema das praias de João Pessoa abriga manguezais, recifes de corais e uma rica biodiversidade marinha, sendo essencial para o equilíbrio ambiental e a sustentabilidade costeira.",
    boasPraticas: [
      'Coleta de resíduos plásticos',
      'Educação ambiental sobre poluição marinha',
      'Apoio a projetos de conservação marinha',
    ],
    siteUrl: "https://areiavermelhapb.com.br",
    req: "Leve o plastico da sua casa!"
  },
  {
    id: 0,
    nome: "Guia Carlos Andrade - Tour pelo projeto peixe boi",
    descricao: "O projeto peixe boi tem como objetivo a preservação da espécie e de seu habitat natural.",
    cidade: "Rio Tinto",
    estado: "PB",
    preco: 100,
    imagem: "https://static.wixstatic.com/media/d56100_23204f2e75ad4d8a80fa8b6000348665~mv2.jpg/v1/fit/w_2500,h_1330,al_c/d56100_23204f2e75ad4d8a80fa8b6000348665~mv2.jpg",
    sustentavel: true,
    atividades: ["Limpeza", "Educação Ambiental", "Conscientização"],
    duracao: "3 horas",
    grupo_max: 5,
    pontos_desconto: 25,
    porcentagem_desconto: 15,
    textoRegiao: "O ecossistema das praias de João Pessoa abriga manguezais, recifes de corais e uma rica biodiversidade marinha, sendo essencial para o equilíbrio ambiental e a sustentabilidade costeira.",
    boasPraticas: [
      'Coleta de resíduos plásticos',
      'Educação ambiental sobre poluição marinha',
      'Apoio a projetos de conservação marinha',
    ],
    siteUrl: "https://areiavermelhapb.com.br"
  },

  {
    id: 1,
    nome: "Mergulho em Areia Vermelha",
    descricao: "Mergulho com snorkel em uma das piscinas naturais mais belas da Paraíba, com foco na preservação marinha.",
    cidade: "Cabedelo",
    estado: "PB",
    preco: 200.00,
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
    id: 6,
    nome: "Trilhas dos Potiguaras",
    descricao: "Criado o intuito de proteger o peixe-boi-marinho e o ecossistema de manguezal.", 
    cidade: "Rio Tinto",
    estado: "PB",
    preco: 100.00,
    imagem: "https://trilhasdospotiguaras.pb.gov.br/media/filer_public_thumbnails/filer_public/15/a3/15a3b7b2-ae38-418f-958e-03fd5c604e27/barra-do-mamanguape-bg.jpg__1700x901_q95_crop_subsampling-2_upscale.jpg",
    sustentavel: true,
    atividades: ["Peixe-boi-marinho", "Proteção Ambiental", "Ecossistema de manguezal"],
    duracao: "3 horas",
    grupo_max: 5,
    pontos_desconto: 5,
    porcentagem_desconto: 10
  },
  {
    id: 7,
    nome: "Potiguara Expeditions",
    descricao: "Lhes convidamos a conhecer o norte da Paraíba e sua cultura indígena potiguara.", 
    cidade: "Rio Tinto",
    estado: "PB",
    preco: 25,
    imagem: "https://mytravelimages.blob.core.windows.net/producao0015f00000jfzvjaaw/logo.png",
    sustentavel: true,
    atividades: ["Trilha Ecológica", "Proteção Ambiental", "Potiguaras"],
    duracao: "5 dias",
    grupo_max: 15,
    pontos_desconto: 8,
    porcentagem_desconto: 25
  },
  {
    id: 8,
    nome: "Trilhas Ecológicas",
    descricao: "Trilhas Ecológicas de Orientação: ecoturismo de contemplação e vivência no litoral norte paraibano.",
    cidade: "João Pessoa",
    estado: "PB",
    preco: 150.00,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU10onrV1-CBxXp94w5B3Jrx9RMMb8R05W2A&s",
    sustentavel: true,
    atividades: ["Trilha Ecológica", "Proteção Ambiental", "Potiguaras"],
    duracao: "5 horas",
    grupo_max: 15,
    pontos_desconto: 8,
    porcentagem_desconto: 25
  }
];

export default function PasseiosPage() {
  const [passeios] = useState<Passeio[]>(passeiosData);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('preco-menor');
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
      <Header />
      
      <div className="pt-24 sm:pt-28 pb-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Atividades <span className="text-blue-600">Sustentáveis</span> 
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Atividades locais, preservando o meio ambiente e promovendo a cultura paraibana.
            <br />
            Participe de atividades gratuítas, ganhe pontos e ajude a preservar nosso ecossistema! 
          </p>
          
          {/* Pontos do usuário */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moeda/>
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
