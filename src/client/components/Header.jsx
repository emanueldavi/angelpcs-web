import { useState } from "react";
import { HiOutlineMenu, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/products" },
  { label: "Nosotros", to: "/about" },
  { label: "Contacto", to: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-secondary shadow-sm sticky top-0 z-50 text-text">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/1.svg" alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-xl text-text tracking-tight">Angel PC&apos;s</span>
        </Link>

        {/* Search Input */}
        <div className="hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 border border-secondary/10 rounded-l focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text"
          />
          <button className="px-4 py-2 bg-primary text-white rounded-r hover:bg-secondary transition">
            Buscar
          </button>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded hover:bg-accent/10 transition text-text"
          >
            <HiOutlineUser className="h-5 w-5" />
            Ingresar
          </Link>
          <Link
            to="/cart"
            className="flex items-center px-3 py-1 rounded hover:bg-accent/10 transition text-text"
          >
            <HiOutlineShoppingCart className="h-5 w-5" />
          </Link>
          {/* Botón menú móvil */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <HiOutlineMenu className="h-6 w-6 text-text" />
          </button>
        </div>
      </div>

      {/* Menú desktop */}
      <nav className="hidden md:flex gap-6 items-center px-10 py-2 border-b border-secondary bg-tertiary">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="text-text hover:text-primary transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-tertiary border-t border-secondary">
          <ul className="flex flex-col items-center gap-2 py-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="block px-4 py-2 text-text hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 text-text hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HiOutlineUser className="h-5 w-5" />
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-1 px-4 py-2 text-text hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HiOutlineShoppingCart className="h-5 w-5" />
                Carrito
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;