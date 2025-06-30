import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const SidebarComponent = () => {
    const location = useLocation();

    return (
        <Sidebar aria-label="Sidebar con menú" className="h-screen w-64 rounded-none border-r border-gray-700">
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem
                        as={Link}
                        to="/admin"
                        icon={HiChartPie}
                        active={location.pathname === "/admin"}
                    >
                        Dashboard
                    </SidebarItem>
                    <SidebarCollapse
                        icon={HiShoppingBag}
                        label="Catálogo"
                        open={location.pathname.startsWith("/admin/products") ||
                              location.pathname.startsWith("/admin/categories") ||
                              location.pathname.startsWith("/admin/refunds") ||
                              location.pathname.startsWith("/admin/shipping")}
                    >
                        <SidebarItem
                            as={Link}
                            to="/admin/products"
                            active={location.pathname === "/admin/products"}
                        >
                            Productos
                        </SidebarItem>
                        <SidebarItem
                            as={Link}
                            to="/admin/categories"
                            active={location.pathname === "/admin/categories"}
                        >
                            Categorías
                        </SidebarItem>
                        <SidebarItem
                            as={Link}
                            to="/admin/refunds"
                            active={location.pathname === "/admin/refunds"}
                        >
                            Refunds
                        </SidebarItem>
                        <SidebarItem
                            as={Link}
                            to="/admin/shipping"
                            active={location.pathname === "/admin/shipping"}
                        >
                            Shipping
                        </SidebarItem>
                    </SidebarCollapse>
                    <SidebarItem
                        as={Link}
                        to="/admin/inbox"
                        icon={HiInbox}
                        active={location.pathname === "/admin/inbox"}
                    >
                        Inbox
                    </SidebarItem>
                    <SidebarItem
                        as={Link}
                        to="/admin/users"
                        icon={HiUser}
                        active={location.pathname === "/admin/users"}
                    >
                        Users
                    </SidebarItem>
                    <SidebarItem
                        as={Link}
                        to="/admin/products"
                        icon={HiShoppingBag}
                        active={location.pathname === "/admin/products"}
                    >
                        Products
                    </SidebarItem>
                    <SidebarItem
                        as={Link}
                        to="/admin/signin"
                        icon={HiArrowSmRight}
                        active={location.pathname === "/admin/signin"}
                    >
                        Sign In
                    </SidebarItem>
                    <SidebarItem
                        as={Link}
                        to="/admin/signup"
                        icon={HiTable}
                        active={location.pathname === "/admin/signup"}
                    >
                        Sign Up
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
};

export default SidebarComponent;