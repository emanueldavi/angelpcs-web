import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeadCell,
  Badge,
  Button,
} from "flowbite-react";
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { getProducts } from "@/api/products";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <nav className="text-3xl font-bold mb-8 text-white">
        Bienvenido al Panel de Administración
      </nav>
      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-lg font-semibold text-gray-400">Ventas</h5>
              <p className="text-2xl font-bold text-gray-300">$12,340</p>
            </div>
            <Badge color="success" icon={HiArrowSmUp}>
              +12%
            </Badge>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-lg font-semibold text-gray-400">Usuarios</h5>
              <p className="text-2xl font-bold text-gray-300">1,245</p>
            </div>
            <Badge color="failure" icon={HiArrowSmDown}>
              -2%
            </Badge>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-lg font-semibold text-gray-400">Productos</h5>
              <p className="text-2xl font-bold text-gray-300">{products.length}</p>
            </div>
            <Badge color="info">Estable</Badge>
          </div>
        </Card>
      </div>
      {/* Tabla de usuarios recientes */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Usuarios recientes</h2>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Nombre</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Rol</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Editar</span>
              </TableHeadCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>juan@email.com</TableCell>
                <TableCell>
                  <Badge color="info">Admin</Badge>
                </TableCell>
                <TableCell>
                  <Button size="xs">Editar</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>María López</TableCell>
                <TableCell>maria@email.com</TableCell>
                <TableCell>
                  <Badge color="success">Usuario</Badge>
                </TableCell>
                <TableCell>
                  <Button size="xs">Editar</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carlos Ruiz</TableCell>
                <TableCell>carlos@email.com</TableCell>
                <TableCell>
                  <Badge color="warning">Invitado</Badge>
                </TableCell>
                <TableCell>
                  <Button size="xs">Editar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default DashboardPage;
