import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { EmojiEventsRounded, ReplayRounded, HelpOutlineRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';

interface Level {
  name: string;
  size: number;
  words: string[];
  points: number;
  directions: number[][]; // [dx, dy]
}

const LEVELS: Level[] = [
  {
    name: 'Fácil',
    size: 10,
    words: ['MACUXI', 'LAJEDO', 'BRAVA', 'INGA'],
    points: 50,
    directions: [[1, 0], [0, 1]]
  },
  {
    name: 'Médio',
    size: 11,
    words: ['RONCADOR', 'KUNHABEBE', 'MARGARIDA', 'MATUTO'],
    points: 100,
    directions: [[1, 0], [0, 1], [1, 1]]
  },
  {
    name: 'Difícil',
    size: 13,
    words: ['DINOSSAUROS', 'CAMARATUBA', 'FLORDEMEL', 'RITADECHICO'],
    points: 150,
    directions: [[1, 0], [0, 1], [1, 1], [-1, 1], [0, -1], [-1, 0]]
  },
  {
    name: 'Mestre',
    size: 14,
    words: ['AREIAVERMELHA', 'PICAOZINHO', 'COQUEIRINHO', 'TAMBABA'],
    points: 200,
    directions: [[1, 0], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1], [0, -1], [-1, 0]]
  },
  {
    name: 'Eco-Lenda',
    size: 15,
    words: ['PAIMATEUS', 'BANANEIRAS', 'CABACEIRAS', 'JACUMA'],
    points: 250,
    directions: [[1, 0], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1], [0, -1], [-1, 0]]
  }
];

const EXPLICACOES_PALAVRAS: { [key: string]: string } = {
  'MACUXI': 'Território indígena no Conde com camping sustentável e preservação de 4 ecossistemas.',
  'LAJEDO': 'Refere-se ao Lajedo de Pai Mateus, uma das formações rochosas mais impressionantes do mundo.',
  'BRAVA': 'Pousada Rural Vaca Brava em Areia, focada em turismo rural e acolhimento familiar.',
  'INGA': 'Sítio Arqueológico Pedra do Ingá, monumento com inscrições rupestres milenares únicas.',
  'RONCADOR': 'Cachoeira exuberante no Brejo Paraibano, entre Bananeiras e Pirpirituba.',
  'KUNHABEBE': 'Coletivo de mulheres indígenas na Baía da Traição focado em protagonismo feminino.',
  'MARGARIDA': 'Pizzaria artesanal em Barra de Mamanguape que utiliza ingredientes da agricultura familiar.',
  'MATUTO': 'Pousada Matuto Sonhador em Cabaceiras, famosa pela gastronomia regional premiada.',
  'DINOSSAUROS': 'Vale em Sousa que abriga um dos maiores sítios paleontológicos do mundo.',
  'CAMARATUBA': 'Vila em Mataraca onde o rio encontra o mar, focada em sustentabilidade.',
  'FLORDEMEL': 'Ecopousada em Bananeiras com horta orgânica e arquitetura integrada à mata.',
  'RITADECHICO': 'Restaurante quilombola em Alagoa Grande que preserva saberes ancestrais.',
  'AREIAVERMELHA': 'Parque Marinho em Cabedelo formado por bancos de areia e corais.',
  'PICAOZINHO': 'Piscinas naturais de João Pessoa famosas pela biodiversidade marinha.',
  'COQUEIRINHO': 'Praia no Conde famosa pelas falésias coloridas e águas cristalinas.',
  'TAMBABA': 'Primeira praia de naturismo do Nordeste, símbolo de liberdade e preservação.',
  'PAIMATEUS': 'O Lajedo de Pai Mateus é um patrimônio histórico e natural único no Cariri.',
  'BANANEIRAS': 'Cidade serrana famosa pelo seu clima ameno e arquitetura ferroviária.',
  'CABACEIRAS': 'A Roliúde Nordestina, cidade cinematográfica no coração do Cariri.',
  'JACUMA': 'Litoral sul da Paraíba, ponto de partida para praias intocadas.'
};

export default function CacaPalavras() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<{r: number, c: number}[]>([]);
  const [selection, setSelection] = useState<{r: number, c: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    iniciarJogo(Math.floor(Math.random() * LEVELS.length));
  }, []);

  const iniciarJogo = (idx: number) => {
    const level = LEVELS[idx];
    setLevelIndex(idx);
    const newGrid = Array(level.size).fill(null).map(() => Array(level.size).fill(''));
    const words = [...level.words].map(w => w.toUpperCase());
    
    // Place words
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const dir = level.directions[Math.floor(Math.random() * level.directions.length)];
        const r = Math.floor(Math.random() * level.size);
        const c = Math.floor(Math.random() * level.size);
        
        if (canPlace(newGrid, word, r, c, dir, level.size)) {
          placeWord(newGrid, word, r, c, dir);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty
    for (let r = 0; r < level.size; r++) {
      for (let c = 0; c < level.size; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWordsToFind(words);
    setFoundWords([]);
    setFoundCells([]);
    setSelection([]);
  };

  const canPlace = (grid: string[][], word: string, r: number, c: number, dir: number[], size: number) => {
    for (let i = 0; i < word.length; i++) {
      const nr = r + i * dir[1];
      const nc = c + i * dir[0];
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
      if (grid[nr][nc] !== '' && grid[nr][nc] !== word[i]) return false;
    }
    return true;
  };

  const placeWord = (grid: string[][], word: string, r: number, c: number, dir: number[]) => {
    for (let i = 0; i < word.length; i++) {
      grid[r + i * dir[1]][c + i * dir[0]] = word[i];
    }
  };

  const handleMouseDown = (r: number, c: number) => {
    setIsSelecting(true);
    setSelection([{r, c}]);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isSelecting) {
      const start = selection[0];
      const dr = r - start.r;
      const dc = c - start.c;
      const steps = Math.max(Math.abs(dr), Math.abs(dc));
      
      if (steps === 0) {
        setSelection([start]);
        return;
      }

      const stepR = dr / steps;
      const stepC = dc / steps;

      if (Number.isInteger(stepR) && Number.isInteger(stepC) && (Math.abs(stepR) <= 1 && Math.abs(stepC) <= 1)) {
        const newSelection = [];
        for (let i = 0; i <= steps; i++) {
          newSelection.push({r: start.r + Math.round(i * stepR), c: start.c + Math.round(i * stepC)});
        }
        setSelection(newSelection);
      }
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const selectedWord = selection.map(s => grid[s.r][s.c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords(prev => {
        const next = [...prev, selectedWord];
        checkWin(next);
        return next;
      });
      setFoundCells(prev => [...prev, ...selection]);
      toast.success(`Encontrou: ${selectedWord}!`);
    } else if (wordsToFind.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords(prev => {
        const next = [...prev, reversedWord];
        checkWin(next);
        return next;
      });
      setFoundCells(prev => [...prev, ...selection]);
      toast.success(`Encontrou: ${reversedWord}!`);
    }
    setSelection([]);
  };

  const checkWin = (currentFound: string[]) => {
    if (currentFound.length === wordsToFind.length) {
      toast.success(`Parabéns! Você completou o nível ${LEVELS[levelIndex].name} e ganhou ${LEVELS[levelIndex].points} pontos!`, {
        autoClose: 5000
      });
    }
  };

  const isCellSelected = (r: number, c: number) => {
    return selection.some(s => s.r === r && s.c === c);
  };

  const isCellFound = (r: number, c: number) => {
    return foundCells.some(s => s.r === r && s.c === c);
  };
  
  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      
      <div className="pt-24 pb-8 px-4 flex flex-col items-center select-none">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">EcoCaça</h1>
        <p className="text-gray-600 mb-4 flex items-center">
          <HelpOutlineRounded className="mr-2" /> 
          Nível: <span className="font-bold text-blue-600 ml-1">{LEVELS[levelIndex].name}</span>
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-6xl">
          {/* Grid */}
          <div 
            className="bg-white p-4 rounded-xl shadow-xl border-4 border-blue-200 cursor-pointer"
            onMouseLeave={() => setIsSelecting(false)}
          >
            <div 
              className="grid gap-1" 
              style={{ gridTemplateColumns: `repeat(${LEVELS[levelIndex].size}, minmax(0, 1fr))` }}
            >
              {grid.map((row, r) => row.map((char, c) => (
                <div
                  key={`${r}-${c}`}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  onMouseUp={handleMouseUp}
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg font-bold rounded transition-colors ${
                    isCellSelected(r, c) 
                      ? 'bg-blue-500 text-white' 
                      : isCellFound(r, c)
                        ? 'bg-green-200 text-green-800'
                        : 'hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  {char}
                </div>
              )))}
            </div>
          </div>

          {/* Word List */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 w-full lg:w-64">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-50 pb-2">
              Palavras ({foundWords.length}/{wordsToFind.length})
            </h2>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {wordsToFind.map(word => (
                <div 
                  key={word}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    foundWords.includes(word) 
                      ? 'bg-green-100 text-green-700 line-through opacity-60' 
                      : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  {word}
                </div>
              ))}
            </div>

            <button
              onClick={() => iniciarJogo(Math.floor(Math.random() * LEVELS.length))}
              className="mt-8 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <ReplayRounded className="mr-2" /> Novo Jogo
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-100 p-4 rounded-lg flex items-center max-w-md w-full">
          <EmojiEventsRounded className="text-yellow-600 mr-3" />
          <p className="text-blue-800 text-sm">
            Complete o caça-palavras para ganhar até <strong>250 pontos</strong>!
          </p>
        </div>

        {/* Explicações das Palavras (Curiosidades) */}
        {foundWords.length === wordsToFind.length && (
          <div className="mt-8 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <HelpOutlineRounded className="mr-2" /> Você sabia?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wordsToFind.map(word => (
                  <div key={word} className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <span className="font-bold text-green-700 block mb-1">{word}</span>
                    <p className="text-sm text-gray-700">{EXPLICACOES_PALAVRAS[word] || 'Localização sustentável da Paraíba.'}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => iniciarJogo(Math.floor(Math.random() * LEVELS.length))}
                className="mt-8 w-full bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Jogar Novo Nível
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
