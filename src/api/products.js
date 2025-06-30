import { API_BASE } from "./config";

// Obtener todos los productos (cada uno tendrá un array images)
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
}

// Eliminar producto
export async function deleteProduct(id, token) {
  const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE', headers: {'Authorization': `Bearer ${token}`} });
  if (!res.ok) throw new Error('Error deleting product');
  return res.json();
}

// Crear producto (data debe incluir images: array de URLs)
export async function createProduct(data, token) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating product');
  return res.json();
}

// Actualizar producto (data puede incluir images: array de URLs)
export async function updateProduct(id, data, token) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating product');
  return res.json();
}

// Obtener producto por ID (incluye images)
export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

// Obtener productos por categoría
export async function getProductsByCategory(category) {
  const res = await fetch(`${API_BASE}/products?category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Error fetching products by category');
  return res.json();
}

// Buscar productos
export async function searchProducts(query) {
  const res = await fetch(`${API_BASE}/products?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Error searching products');
  return res.json();
}


