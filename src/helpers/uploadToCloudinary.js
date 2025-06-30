export async function uploadToCloudinary(file, folder = 'productos') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'angelpcs'); // Cambia por tu preset
  formData.append('folder', folder); // Si quieres organizar en carpetas

  const res = await fetch('https://api.cloudinary.com/v1_1/dkiyzyv7s/image/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Error al subir imagen');
  return data.secure_url;
}