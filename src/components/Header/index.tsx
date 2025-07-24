import { ApartmentRounded, RestaurantRounded, SailingRounded, MenuRounded, CloseRounded, WhatsApp } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  // Fechar menu mobile quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Se clicou fora do header e do menu mobile, fechar
      if (
        headerRef.current && 
        mobileMenuRef.current &&
        !headerRef.current.contains(target) && 
        !mobileMenuRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Fechar diálogo de login com tecla Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLoginDialogOpen(false);
      }
    };

    if (isLoginDialogOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isLoginDialogOpen]);

  const handleLoginClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsLoginDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsappNumber.trim()) {
      // Remove formatação para validar
      const numbersOnly = whatsappNumber.replace(/\D/g, '');
      
      if (numbersOnly.length !== 11) {
        toast.error('Por favor, digite um número válido com DDD (11 dígitos)');
        return;
      }
      
      // Aqui você pode adicionar a lógica para processar o número
      console.log('Número de WhatsApp:', whatsappNumber);
      toast.success(`Obrigado! Você receberá o código para login via Whatsapp`);
      setIsLoginDialogOpen(false);
      setWhatsappNumber('');
    }
  };

  const handleDialogBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsLoginDialogOpen(false);
    }
  };

  const formatWhatsappNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (xx) xxxxx-xxxx
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };
  return (
    <>
      <ToastContainer />
      <header 
        ref={headerRef}
        className="
          bg-white 
          p-3 md:p-4 flex 
          justify-between 
          items-center 
          text-gray-800
          fixed top-0 left-0 w-full
          border-b-2 border-gray-200
          px-4 md:px-6 lg:px-8
          z-50
      ">
        <Link to="/" className="text-2xl md:text-3xl font-semibold text-green-700 hover:text-green-800 transition-colors">
          EcoTurPB
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center justify-center">
              <Link to="/hoteis" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                  <ApartmentRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                  <div className="hidden lg:block">Hoteis</div>
              </Link>
              <Link to="/passeios" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                  <SailingRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                  <div className="hidden lg:block">Passeios</div>
              </Link>
              <Link to="/restaurantes" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                  <RestaurantRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                  <div className="hidden lg:block">Restaurantes</div>
              </Link>
          </nav>

          {/* Desktop Login Button */}
          <nav className="hidden md:block">
              <button 
                onClick={handleLoginClick}
                className="
                  bg-green-600 
                  text-white 
                  px-4 md:px-6
                  py-2 md:py-3 lg:py-4
                  rounded-md
                  hover:bg-green-800
                  transition-colors
                  text-base md:text-lg lg:text-xl
                  flex items-center justify-center
                  font-semibold
                  cursor-pointer
              ">
                  Login
              </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <CloseRounded className="w-6 h-6 text-gray-700" />
            ) : (
              <MenuRounded className="w-6 h-6 text-gray-700" />
            )}
          </button>
      </header>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div 
        ref={mobileMenuRef}
        className="md:hidden fixed top-16 left-0 w-full bg-white border-b-2 border-gray-200 z-[45] shadow-lg"
      >
        <nav className="flex flex-col space-y-4 p-4">
          <button
            onClick={() => handleNavigation('/hoteis')}
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2 cursor-pointer text-left"
          >
            <ApartmentRounded className="w-6 h-6" /> 
            <span>Hoteis</span>
          </button>
          <button
            onClick={() => handleNavigation('/passeios')}
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2 cursor-pointer text-left"
          >
            <SailingRounded className="w-6 h-6" /> 
            <span>Passeios</span>
          </button>
          <button
            onClick={() => handleNavigation('/restaurantes')}
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2 cursor-pointer text-left"
          >
            <RestaurantRounded className="w-6 h-6" /> 
            <span>Restaurantes</span>
          </button>
          <button 
            onClick={handleLoginClick}
            onTouchStart={handleLoginClick}
            className="
              bg-green-600 
              text-white 
              px-6 py-3
              rounded-md
              hover:bg-green-800
              transition-colors
              text-lg
              text-center
              font-semibold
              mt-4
              w-full
              cursor-pointer
            "
          >
            Login
          </button>
        </nav>
      </div>
    )}

    {/* Login Dialog */}
    {isLoginDialogOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
        onClick={handleDialogBackdropClick}
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <WhatsApp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Login via WhatsApp</h2>
            </div>
            <button
              onClick={() => setIsLoginDialogOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseRounded className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Digite seu número de WhatsApp para receber o código de login.
          </p>

          <form onSubmit={handleWhatsappSubmit}>
            <div className="mb-4">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                Número do WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(formatWhatsappNumber(e.target.value))}
                placeholder="(83) 99999-9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={15}
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsLoginDialogOpen(false)}
                className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <WhatsApp className="w-4 h-4" />
                <span>Entrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
    );
}