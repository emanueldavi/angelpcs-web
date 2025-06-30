import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { createCategory, getCategoryById, updateCategory } from '@/api/categories';

const AddCategory = ({ onSuccess ,update, id}) => { // el update es un boolean para saber si es una actualización o no
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState(['']); // Un array de strings para los campos

  // Manejar cambio de cada input de especificación
  const handleSpecChange = (idx, value) => {
    const newSpecs = [...specs];
    newSpecs[idx] = value;
    setSpecs(newSpecs);
  };

  // Agregar un nuevo campo de especificación
  const handleAddSpec = () => setSpecs([...specs, '']);

  // Eliminar un campo de especificación
  const handleRemoveSpec = (idx) => {
    const newSpecs = specs.filter((_, i) => i !== idx);
    setSpecs(newSpecs);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que al menos un campo de especificación esté lleno
      if (specs.every(s => s.trim() === '')) {
        if (onSuccess) onSuccess({ res: 'failure', msg: 'Debe ingresar al menos un campo de especificación.' });
        return;
      }

      // Si es una actualización, usa el id para actualizar la categoría
      if (update && id) {
        await updateCategory( id, {name, description, specs: specs.filter(s => s.trim() !== '') });
        if (onSuccess) onSuccess({ res: 'success', msg: 'Categoría actualizada correctamente.' });
        return;
      }
      // Filtra campos vacíos y envía el array de especificaciones
      await createCategory({ name, description, specs: specs.filter(s => s.trim() !== '') });
      setName('');
      setDescription('');
      setSpecs(['']);
      if (onSuccess) onSuccess({ res: 'success', msg: 'Categoría agregada correctamente.' });
    } catch {
      if (onSuccess) onSuccess({ res: 'failure', msg: 'Error al agregar categoría.' });
    }
  };

  useEffect(() => {
    if (update && id) {
      // Si es una actualización, carga los datos de la categoría
      const fetchCategory = async () => {
        try {
          const category = await getCategoryById(id);
          setName(category.name);
          setDescription(category.description || '');
          // Si specs es un array vacío, pon [''], si no, usa los valores
          if (Array.isArray(category.specs) && category.specs.length > 0) {
            setSpecs([...category.specs, '']); // Agrega un campo vacío al final
          } else {
            setSpecs(['']);
          }
        } catch (error) {
          console.error('Error al cargar la categoría:', error);
        }
      };
      fetchCategory();
    }
  }, [update, id]);

  return (
    <div className='justify-center items-center flex flex-col h-full '>
      <form className="flex max-w-md flex-col pt-3 gap-4 w-full" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Nombre</Label>
          <TextInput id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <Label>Campos de especificaciones</Label>
          {specs.map((spec, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <TextInput
                value={spec}
                onChange={e => handleSpecChange(idx, e.target.value)}
                placeholder="Ej: RAM, Disco, Pantalla..."
                required
              />
              {specs.length > 1 && (
                <Button color="red" type="button" onClick={() => handleRemoveSpec(idx)}>
                  Quitar
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={handleAddSpec} color="gray" className="mt-2">
            + Agregar campo
          </Button>
        </div>
        <Button type="submit">{update ? "Actualizar" : "Agregar"}</Button>
      </form>
    </div>
  );
};

export default AddCategory;