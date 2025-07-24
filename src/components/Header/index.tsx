import { ApartmentRounded, FourKOutlined, RestaurantRounded, SailingRounded } from "@mui/icons-material";

export function Header() {
  return (
    <header className="
        bg-white 
        p-4 flex 
        justify-between 
        items-center 
        text-gray-800
        fixed top-0 left-0 w-full
        border-b-2 border-gray-200
        px-8
        z-10
    ">
      <div className="text-3xl font-semibold text-green-700">
        EcoTurPB
      </div>

        <nav className="space-x-8 flex items-center justify-center">
            <a href="/" className="text-gray-500 hover:text-green-700 text-xl space-x-8 flex flex-row">
                <ApartmentRounded className="inline-block mr-1" /> 
                <div>Hoteis</div>
            </a>
            {/* passeios */}
            <a href="/hello-world" className="text-gray-500 hover:text-green-700 text-xl space-x-8 flex flex-row">
                <SailingRounded className="inline-block mr-1" /> 
                <div>Passeios</div>
            </a>
            <a href="/hello-world" className="text-gray-500 hover:text-green-700 text-xl space-x-8 flex flex-row">
                <RestaurantRounded className="inline-block mr-1" /> 
                <div>Restaurantes</div>
            </a>
        </nav>

        <nav>
            {/* login button */}
            <a href="/hello-world" className="
                bg-green-600 
                text-white 
                px-6
                py-4
                rounded-md
                hover:bg-green-800
                transition-colors
                text-xl
                flex items-center justify-center
                font-semibold
            ">
                Login
            </a>
        </nav>

    </header>
    );
}