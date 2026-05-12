import { useState, useEffect, useCallback } from 'react';
import { Header } from '../../components/Header';
import { EmojiEventsRounded, ReplayRounded, HelpOutlineRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';

const PALAVRAS_TERMO = [
  'LAGOA', 'FAROL', 'PRAIA', 'AREIA', 'SEIXA', 
  'BUSTO', 'MANGA', 'VERDE', 'PICOS', 'HOTEL'
];

const DICAS: { [key: string]: string } = {
  'LAGOA': 'Ponto central de João Pessoa: Parque Solon de Lucena.',
  'FAROL': 'Fica no Cabo Branco, o ponto mais oriental das Américas.',
  'PRAIA': 'João Pessoa é famosa por suas belas...',
  'AREIA': 'A ilha de ____ Vermelha é um ponto turístico famoso.',
  'SEIXA': 'Ponta do _____, o extremo oriente das Américas.',
  'BUSTO': 'O _____ de Tamandaré fica entre as praias de Tambaú e Cabo Branco.',
  'MANGA': 'Ecossistema importante de João Pessoa: _____zal.',
  'VERDE': 'João Pessoa é conhecida como a segunda capital mais _____ do mundo.',
  'PICOS': 'As piscinas naturais de _____zinho.',
  'HOTEL': 'O _____ Tambaú é um ícone da arquitetura na orla.'
};

const MAX_TENTATIVAS = 6;
const TAMANHO_PALAVRA = 5;

export default function Termo() {
  const [palavraDoDia, setPalavraDoDia] = useState('');
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [tentativaAtual, setTentativaAtual] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [venceu, setVenceu] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const palavra = PALAVRAS_TERMO[Math.floor(Math.random() * PALAVRAS_TERMO.length)];
    setPalavraDoDia(palavra);
    setTentativas([]);
    setTentativaAtual('');
    setGameOver(false);
    setVenceu(false);
    setKeyboardStatus({});
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    if (e.key === 'Enter') {
      confirmarTentativa();
    } else if (e.key === 'Backspace') {
      setTentativaAtual(prev => prev.slice(0, -1));
    } else if (/^[a-z]$/i.test(e.key)) {
      if (tentativaAtual.length < TAMANHO_PALAVRA) {
        setTentativaAtual(prev => (prev + e.key).toUpperCase());
      }
    }
  }, [tentativaAtual, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const confirmarTentativa = () => {
    if (tentativaAtual.length !== TAMANHO_PALAVRA) {
      toast.warn('A palavra deve ter 5 letras');
      return;
    }

    const novasTentativas = [...tentativas, tentativaAtual];
    setTentativas(novasTentativas);
    atualizarTeclado(tentativaAtual);

    if (tentativaAtual === palavraDoDia) {
      setVenceu(true);
      setGameOver(true);
      toast.success('Parabéns! Você ganhou 100 pontos!');
    } else if (novasTentativas.length >= MAX_TENTATIVAS) {
      setGameOver(true);
      toast.error(`Fim de jogo! A palavra era ${palavraDoDia}`);
    }

    setTentativaAtual('');
  };

  const atualizarTeclado = (palavra: string) => {
    const status = { ...keyboardStatus };
    palavra.split('').forEach((letra, i) => {
      if (palavraDoDia[i] === letra) {
        status[letra] = 'bg-green-500 text-white';
      } else if (palavraDoDia.includes(letra)) {
        if (status[letra] !== 'bg-green-500 text-white') {
          status[letra] = 'bg-yellow-500 text-white';
        }
      } else {
        if (!status[letra]) {
          status[letra] = 'bg-gray-400 text-white';
        }
      }
    });
    setKeyboardStatus(status);
  };

  const getLetraStatus = (palavra: string, i: number) => {
    const letra = palavra[i];
    if (palavraDoDia[i] === letra) return 'bg-green-500 text-white border-green-600';
    if (palavraDoDia.includes(letra)) return 'bg-yellow-500 text-white border-yellow-600';
    return 'bg-gray-500 text-white border-gray-600';
  };

  const handleKeyClick = (key: string) => {
    if (gameOver) return;
    if (key === 'ENTER') {
      confirmarTentativa();
    } else if (key === 'BACK') {
      setTentativaAtual(prev => prev.slice(0, -1));
    } else {
      if (tentativaAtual.length < TAMANHO_PALAVRA) {
        setTentativaAtual(prev => (prev + key).toUpperCase());
      }
    }
  };

  const teclado = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ];

  return (
    <div className="bg-green-50 min-h-screen">
      <Header />
      
      <div className="pt-24 pb-8 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-700 mb-2">EcoTermo</h1>
        <p className="text-gray-600 mb-6 flex items-center">
          <HelpOutlineRounded className="mr-2" /> 
          Descubra a palavra sobre João Pessoa
        </p>

        {/* Grid do Jogo */}
        <div className="grid grid-rows-6 gap-2 mb-8">
          {[...Array(MAX_TENTATIVAS)].map((_, i) => {
            const tentativa = tentativas[i] || (i === tentativas.length ? tentativaAtual : '');
            const isConfirmed = i < tentativas.length;

            return (
              <div key={i} className="grid grid-cols-5 gap-2">
                {[...Array(TAMANHO_PALAVRA)].map((_, j) => (
                  <div
                    key={j}
                    className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-md transition-all duration-500 ${
                      isConfirmed ? getLetraStatus(tentativas[i], j) : 'bg-white border-gray-300'
                    } ${!isConfirmed && tentativa[j] ? 'border-gray-500 scale-105' : ''}`}
                  >
                    {tentativa[j] || ''}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Teclado Virtual */}
        <div className="w-full max-w-xl">
          {teclado.map((row, i) => (
            <div key={i} className="flex justify-center gap-1 mb-2">
              {row.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`px-2 py-4 md:px-4 md:py-5 rounded font-bold cursor-pointer transition-colors ${
                    key.length > 1 ? 'text-xs md:text-sm px-3 md:px-6' : 'text-sm md:text-lg'
                  } ${keyboardStatus[key] || 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                  {key === 'BACK' ? '⌫' : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Info e Reset */}
        {gameOver && (
          <div className="mt-8 text-center bg-white p-6 rounded-xl shadow-lg border-2 border-green-200 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">
              {venceu ? 'Você Venceu!' : 'Fim de Jogo!'}
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Dica:</strong> {DICAS[palavraDoDia]}
            </p>
            <button
              onClick={iniciarJogo}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center mx-auto hover:bg-green-700 transition-colors"
            >
              <ReplayRounded className="mr-2" /> Jogar Novamente
            </button>
          </div>
        )}

        <div className="mt-8 bg-green-100 p-4 rounded-lg flex items-center max-w-md w-full">
          <EmojiEventsRounded className="text-yellow-600 mr-3" />
          <p className="text-green-800 text-sm">
            Cada acerto garante <strong>100 pontos</strong> que podem ser trocados por descontos!
          </p>
        </div>
      </div>
    </div>
  );
}
