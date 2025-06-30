import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  TextInput,
} from "flowbite-react";
import {
  HiOutlinePlus,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSearch,
} from "react-icons/hi";
import { getProducts, deleteProduct } from "@/api/products";
import { getCategories } from "@/api/categories";
import { useAuth } from "@/admin/context/AuthContext.jsx";

import AddProduct from "./AddProduct.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [alertMsg, setAlertMsg] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedIds([]);
    setAlertMsg();
  };
  const [method, setMethod] = useState("");

  const handleAddProduct = () => {
    setOpenModal(true);
    setMethod("Agregar");
    setSelectedIds([]); // Limpiar selección al abrir el modal
    setAlertMsg(); // Limpiar mensaje de alerta
  };

  const handleUpdateProduct = (product) => {
    setOpenModal(true);
    setMethod("Actualizar");
    setSelectedIds([product.id]); // Set selected ID for update
    setAlertMsg(); // Clear previous alert message
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setAlertMsg({ res: "failure", msg: "Error al obtener los productos" });
    }
  };

  const deleteProducts = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        setAlertMsg({ res: "success", msg: "Producto eliminado correctamente" });
        setSelectedIds(selectedIds.filter((i) => i !== id)); // Elimina el ID eliminado de la selección
        getProducts().then(setProducts); // Actualiza la lista después de eliminar
      } catch {
        setAlertMsg({ res: "failure", msg: "Error al eliminar el producto" });

      }
    }
  };

    useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  useEffect(() => {
    getCategories().then(setCategories);

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    (search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.model.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
    ) &&
    (categoryFilter === '' || product.category_name === categoryFilter)
  );


  return (
    <>
      <div className="w-full p-y-4 h-full flex flex-col flex-1">
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-1">
              Todos los Productos
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <TextInput
              placeholder="Buscar"
              sizing="md"
              className="md:w-96 md:pr-0 w-40"
              value={search}
              icon={HiOutlineSearch}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="rounded px-2 py-1 bg-gray-700 text-white"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => handleAddProduct()}>
              <HiOutlinePlus className="text-lg md:hidden" />
              <span className="hidden md:block">Agregar</span>
            </Button>
            {selectedIds.length > 0 && (
              <Button
                color="red"
                onClick={() => {
                  selectedIds.forEach((id) => deleteProducts(id));
                  setSelectedIds([]);
                }}
              >
                <HiOutlineTrash className="text-lg md:hidden" />
                <span className="hidden md:block">Eliminar</span>
              </Button>
            )}
          </div>
        </div>
        <div className="rounded-xl flex-1 overflow-auto">
          <Table className="w-full text-white " hoverable>
            <TableHead className="bg-transparent">
              <TableRow className="text-gray-400 text-xs uppercase">
                <TableHeadCell className="px-4 py-3">
                  <input type="checkbox" />
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Nombre
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Modelo
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Marca
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Categoría
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Especificaciones
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Precio
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Descripción
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Imagen
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  ACTIONS
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y bg-gray-800 divide-gray-700">
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="text-white">
                  <TableCell className="px-4 py-3">
                    <input
                      type="checkbox"
                      key={product.id}
                      checked={selectedIds.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div>
                      <div className="font-bold">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    {product.brand || <span className="italic">-</span>}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    {product.model}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    {product.category_name}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-mono font-bold">
                    {typeof product.specifications === "string"
                      ? JSON.parse(product.specifications)
                          ? Object.entries(JSON.parse(product.specifications)).map(
                              ([k, v]) => `${k}: ${v}`
                            ).join(", ")
                          : product.specifications
                      : "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    ${product.price}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    {product.description}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].image_url}
                        alt={product.name}
                        style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
                      />
                    ) : (
                      <span className="italic text-gray-400">Sin imagen</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Button
                      size="xs"
                      color="blue"
                      className="flex items-center gap-1"
                      onClick={() => handleUpdateProduct(product)}
                    >
                      <HiOutlinePencilAlt className="text-lg" /> Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal
        onClose={handleCloseModal}
        show={openModal}
        className="flex justify-center items-center"
      >
        <ModalHeader>{method}</ModalHeader>
        <ModalBody>
          <AddProduct
            onSuccess={(msg) => {
              setAlertMsg({ res: msg.res, msg: msg.msg });
              setOpenModal(false);
              fetchProducts(); // Cierra el modal después de éxito
            }}
            update={true}
            id={selectedIds[0]} // Pasa el ID del producto seleccionado para actualizar}
          />
        </ModalBody>
      </Modal>
      {alertMsg && (
        <Alert color={alertMsg.res} onDismiss={() => setAlertMsg()}>
          {alertMsg.msg}
        </Alert>
      )}
    </>
  );
};

export default ProductsPage;
