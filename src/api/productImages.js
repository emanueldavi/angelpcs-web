import { API_BASE } from "./config";
// Obtener todas las imágenes de un producto
export async function getProductImages(productId) {
    const res = await fetch(`${API_BASE}/product-images/product/${productId}`);
    if (!res.ok) {
        throw new Error('Error fetching product images');
    }
    return res.json();
}

// Agregar imágenes a un producto (array de URLs)
export async function addProductImages(productId, images) {
    const res = await fetch(`${API_BASE}/product-images/product/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images }), // <-- debe llamarse "images"
    });
    if (!res.ok) {
        throw new Error('Error adding product images');
    }
    return res.json();
}

// Eliminar una imagen
export async function deleteProductImage(imageId) {
    const res = await fetch(`${API_BASE}/product-images/${imageId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Error deleting product image');
    }
    return res.json();
}

// Obtener una imagen por ID (opcional)
export async function getProductImageById(imageId) {
    const res = await fetch(`${API_BASE}/product-images/${imageId}`);
    if (!res.ok) {
        throw new Error('Error fetching product image');
    }
    return res.json();
}
