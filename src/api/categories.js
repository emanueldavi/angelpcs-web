import { API_BASE } from "./config";


export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) {
        throw new Error('Error fetching categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
    }
export const createCategory = async (category, token) => {
    try {
        const response = await fetch(`${API_BASE}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error('Error creating category');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to create category:', error);
        throw error;
    }
}
export const updateCategory = async (id, category, token) => {
    try {
        const response = await fetch(`${API_BASE}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error('Error updating category');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to update category:', error);
        throw error;
    }
}
export const deleteCategory = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error deleting category');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to delete category:', error);
        throw error;
    }
}
export const getCategoryById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/categories/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching category');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch category:', error);
        throw error;
    }
}


