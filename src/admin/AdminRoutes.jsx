import { Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel.jsx';
import ProductsPage from './pages/products/ProductsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NotFound from './pages/404.jsx';
import CategoriesPage from './pages/categories/CategoriesPage.jsx';
import AddCategory from './pages/categories/AddCategory.jsx';
import ProtectedRoute from './ProtetedRoute';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './auth/LoginPage.jsx';

// ...otros imports

export default function AdminRoutes() {
    return (
        <AuthProvider>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute> <AdminPanel /> </ProtectedRoute>}>
                <Route index element={<DashboardPage/>} />
                <Route path="/products" element={<ProductsPage/>} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/add" element={<AddCategory />} />
                <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}

            </Route>

            {/* Otras rutas del admin */}
        </Routes>
        </AuthProvider>
    );
}