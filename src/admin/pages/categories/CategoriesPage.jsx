import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
} from "flowbite-react";
import {
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineSearch,
} from "react-icons/hi";
import AddCategory from "./AddCategory";
import { deleteCategory, getCategories } from "@/api/categories.js";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [alertMsg, setAlertMsg] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedIds([]);
    setAlertMsg();
  };
  const [method, setMethod] = useState("Agregar");

  const filteredCategories = categories.filter(
    (category) =>
      search === "" ||
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(category.specs) &&
        category.specs.join(", ").toLowerCase().includes(search.toLowerCase()))
  );

  // Obtener productos al cargar la página o al agregar uno nuevo
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setAlertMsg({ res: "failure", msg: "Error al obtener categorías" });
    }
  };

  const handleAddCategory = () => {
    setOpenModal(true);
    setMethod("Agregar");
    setSelectedIds([]); // Limpiar selección al abrir el modal
    setAlertMsg(); // Limpiar mensaje de alerta
  };

  const handleUpdateCategory = (category) => {
    setOpenModal(true);
    setMethod("Actualizar");
    setSelectedIds([category.id]); // Set selected ID for update
    setAlertMsg(); // Clear previous alert message
  };

  const deleteCategories = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteCategory(id);
        setAlertMsg({
          res: "sucess",
          msg: "Categoría eliminada correctamente",
        });
        fetchCategories(); // Actualiza la lista después de eliminar
      } catch {
        setAlertMsg({ res: "failure", msg: "Error al eliminar categoría" });
      }
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  return (
    <>
      <div className="w-full p-y-4 h-full flex flex-col flex-1">
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-1">
              Todos las Categorías
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <TextInput
              placeholder="Search for products"
              sizing="md"
              className="w-96 pr-5 md:pr-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <HiOutlineSearch />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => handleAddCategory()} popup>
              <HiOutlinePlus className="text-lg md:hidden" />
              <span className="hidden md:block">Agregar</span>
            </Button>
            {selectedIds.length > 0 && (
              <Button
                color="red"
                onClick={() => {
                  selectedIds.forEach((id) => deleteCategories(id));
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
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(categories.id)}
                    onChange={() => handleSelect(categories.id)}
                  />
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Nombre
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Descripción
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Especificaciones
                </TableHeadCell>
                <TableHeadCell className="px-4 py-3 text-left">
                  Acciones
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-700 bg-gray-800">
              {filteredCategories.map((category) => (
                <TableRow key={category.id} className="text-white">
                  <TableCell className="px-4 py-3">
                    <input
                      type="checkbox"
                      key={category.id}
                      checked={selectedIds.includes(category.id)}
                      onChange={() => handleSelect(category.id)}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div>
                      <div className="font-bold">{category.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-bold">
                    {category.description}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="font-mono font-bold">
                      {category.specs ? (
                        category.specs.join(", ")
                      ) : (
                        <span className="italic">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Button
                      size="xs"
                      color="blue"
                      className="flex items-center gap-1"
                      onClick={() => {
                        handleUpdateCategory(category);
                      }}
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
          <AddCategory
            onSuccess={(msg) => {
              setAlertMsg({ res: msg.res, msg: msg.msg });
              setOpenModal(false);

              fetchCategories(); // Cierra el modal después de éxito
            }}
            update={true}
            id={selectedIds[0] || null} // Pass the first selected ID for update
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

export default CategoriesPage;
