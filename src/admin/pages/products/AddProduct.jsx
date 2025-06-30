import { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { getCategories } from "@/api/categories";
import { createProduct, getProductById, updateProduct } from "@/api/products";
import { uploadToCloudinary } from "@/helpers/uploadToCloudinary";
import { useAuth } from "@/admin/context/AuthContext";

const AddProduct = ({ onSuccess, update, id }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [specs, setSpecs] = useState({});
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]); // Estado para las URLs de las imágenes
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        return;
      }
    };
    fetchCategories();
  }, []);

  // Si es actualización, cargar datos del producto
  useEffect(() => {
    if (update && id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setName(product.name || "");
          setBrand(product.brand || "");
          setModel(product.model || "");
          setCategoryId(product.category_id?.toString() || "");
          setPrice(product.price?.toString() || "");
          setDescription(product.description || "");
          // Parsear especificaciones si vienen como string
          let parsedSpecs = {};
          if (typeof product.specifications === "string") {
            try {
              parsedSpecs = JSON.parse(product.specifications);
            } catch {
              parsedSpecs = {};
            }
          } else if (
            typeof product.specifications === "object" &&
            product.specifications !== null
          ) {
            parsedSpecs = product.specifications;
          }
          setSpecs(parsedSpecs);
          setImageUrls(product.images || []); // Cargar imágenes si existen
        } catch {
          return;
        }
      };
      fetchProduct();
    }
  }, [update, id]);

  const selectedCategory = categories.find(
    (cat) => cat.id === Number(categoryId)
  );
  const specsFields = selectedCategory?.specs || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let urls = imageUrls; // Por si ya hay imágenes (en edición)
      if (selectedFiles.length > 0) {
        urls = await Promise.all(
          selectedFiles.map((file) => uploadToCloudinary(file))
        );
        setImageUrls(urls);
      }
      const payload = {
        name,
        brand,
        model,
        category_id: categoryId,
        price: parseFloat(price),
        description,
        specifications: JSON.stringify(specs),
        images: imageUrls.map((img) =>
          typeof img === "string" ? img : img.image_url
        ),
      };
      if (update && id) {
        await updateProduct(id, payload, token);
        if (onSuccess)
          onSuccess({
            res: "success",
            msg: "Producto actualizado correctamente.",
          });
      } else {
        await createProduct(payload, token);
        setName("");
        setBrand("");
        setModel("");
        setCategoryId("");

        setPrice("");
        setSpecs({});
        setDescription("");
        setImageUrls([]); // Limpiar imágenes
        if (onSuccess)
          onSuccess({
            res: "success",
            msg: "Producto agregado correctamente.",
          });
      }
    } catch {
      if (onSuccess)
        onSuccess({ res: "failure", msg: "Error al guardar producto." });
    }
    setUploading(false);
  };

  const handleFileChange = async (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div className="justify-center items-center flex flex-col h-full ">
      <form
        className="flex max-w-md flex-col pt-3 gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor="name">Nombre</Label>
          <TextInput
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Marca</Label>
            <TextInput
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="model">Modelo</Label>
            <TextInput
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="price">Precio</Label>
          <TextInput
            id="price"
            type="number"
            placeholder="100"
            addon="$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select
            id="category"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSpecs({});
            }}
            required
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>
        {specsFields.length > 0 && (
          <div>
            <Label>Especificaciones</Label>
            {specsFields.map((field, idx) => (
              <div key={idx} className="mb-2">
                <TextInput
                  placeholder={field}
                  value={specs[field] || ""}
                  onChange={(e) =>
                    setSpecs({ ...specs, [field]: e.target.value })
                  }
                  required
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="images">Imágenes</Label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-auto h-28 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
            {/* Si editas, también muestra las imágenes ya subidas */}
            {imageUrls.map((url, idx) => (
              <div key={idx + selectedFiles.length} className="relative">
                <img
                  src={typeof url === "string" ? url : url.image_url}
                  alt="preview"
                  className="w-auto h-28 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImageUrls(imageUrls.filter((_, i) => i !== idx))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={uploading || imageUrls.length === 0}>
          {uploading
            ? "Subiendo imágenes..."
            : update
            ? "Actualizar"
            : "Agregar"}
        </Button>
        {uploading && (
          <div className="text-sm text-blue-400 mt-2">
            Subiendo imágenes, por favor espera...
          </div>
        )}
      </form>
      <div className="flex gap-2 mt-2"></div>
    </div>
  );
};

export default AddProduct;
