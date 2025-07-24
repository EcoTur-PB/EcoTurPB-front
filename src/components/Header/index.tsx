import { ApartmentRounded, RestaurantRounded, SailingRounded, MenuRounded, CloseRounded } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Fechar menu mobile quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
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
  return (
    <>
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
      <div className="text-2xl md:text-3xl font-semibold text-green-700">
        EcoTurPB
      </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center justify-center">
            <a href="/" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                <ApartmentRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                <div className="hidden lg:block">Hoteis</div>
            </a>
            <a href="/hello-world" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                <SailingRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                <div className="hidden lg:block">Passeios</div>
            </a>
            <a href="/hello-world" className="text-gray-500 hover:text-green-700 text-lg lg:text-xl flex flex-row items-center space-x-1 lg:space-x-2">
                <RestaurantRounded className="w-5 h-5 lg:w-6 lg:h-6" /> 
                <div className="hidden lg:block">Restaurantes</div>
            </a>
        </nav>

        {/* Desktop Login Button */}
        <nav className="hidden md:block">
            <a href="/hello-world" className="
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
            ">
                Login
            </a>
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
      <div className="md:hidden fixed top-16 left-0 w-full bg-white border-b-2 border-gray-200 z-40 shadow-lg">
        <nav className="flex flex-col space-y-4 p-4">
          <a 
            href="/" 
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ApartmentRounded className="w-6 h-6" /> 
            <span>Hoteis</span>
          </a>
          <a 
            href="/hello-world" 
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <SailingRounded className="w-6 h-6" /> 
            <span>Passeios</span>
          </a>
          <a 
            href="/hello-world" 
            className="text-gray-500 hover:text-green-700 text-lg flex flex-row items-center space-x-3 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <RestaurantRounded className="w-6 h-6" /> 
            <span>Restaurantes</span>
          </a>
          <a 
            href="/hello-world" 
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
            "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </a>
        </nav>
      </div>
    )}
    </>
    );
}