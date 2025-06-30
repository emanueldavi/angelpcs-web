import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavbarComponent from "./components/Navbar.jsx";
import SidebarComponent from "./components/Sidebar.jsx";

const NAVBAR_HEIGHT = "h-16"; // Ajusta si tu navbar tiene otra altura

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      {/* Navbar arriba */}
      <div className={`relative z-30 w-full ${NAVBAR_HEIGHT}`}>
        <NavbarComponent onMenuClick={() => setSidebarOpen((open) => !open)} />
      </div>
      {/* Sidebar móvil debajo del navbar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 md:hidden" style={{ pointerEvents: "auto" }}>
          {/* Fondo oscuro solo debajo del navbar */}
          <div
            className={`absolute left-0 right-0 top-16 bottom-0 bg-black bg-opacity-50`}
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div
            className="absolute left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 shadow-lg pr-4 pt-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            
            <div className="">
              <SidebarComponent />
            </div>
          </div>
        </div>
      )}
      {/* Contenido principal con Sidebar a la izquierda */}
      <div className="flex flex-1 min-h-0 overflow-hidden text-white">
        <div className="hidden md:block">
          <SidebarComponent />
        </div>
        <main className="flex-1 p-5 overflow-auto min-h-0">
          
          <div className="h-full flex flex-col ">
 <Outlet  />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
