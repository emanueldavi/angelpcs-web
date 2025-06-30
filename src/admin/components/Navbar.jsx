import { Navbar, NavbarBrand, Dropdown,DropdownHeader, DropdownItem, Avatar, DropdownDivider } from "flowbite-react";
import { HiMenu } from "react-icons/hi";
import { useAuth} from "../context/AuthContext";


const NavbarComponent = ({onMenuClick }) => {

  const { user, logout } = useAuth();

    const handleLogout = () => {
      logout();
      navigate("/admin/login"); // Redirige al login después de cerrar sesión
  };
  return (
    <Navbar fluid className="border-b border-gray-200">
      <button
      className="md:hidden text-white text-2xl"
      onClick={onMenuClick}
      aria-label="Abrir menú"
      >
      <HiMenu />
    </button>
      <NavbarBrand href="/admin">
        <img src="/1.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AdminPanel</span>
      </NavbarBrand>
      <div className="flex md:order-2 items-center text-white">
        <span className="md:block hidden text-sm justify-end mr-2">{user?.name || user?.username}</span>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          
          <DropdownHeader>
            <span className="block md:hidden text-sm">{user?.name || user?.username || "Admin"}</span>
            
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
      </div>
      {/* <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/admin" active>
          Dashboard
        </NavbarLink>
        <NavbarLink href="/admin/users">
          Usuarios
        </NavbarLink>
        <NavbarLink href="/admin/settings">
          Configuración
        </NavbarLink>
        
      </NavbarCollapse> */}
    </Navbar>
  );
};

export default NavbarComponent;