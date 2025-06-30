import { Routes, Route } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout.jsx';
import PrincipalPage from './pages/PrincipalPage.jsx';
import ProductPage from './pages/ProductView.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
// ...otros imports

export default function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ClientLayout />} >
                <Route index element={<PrincipalPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                {/* <Route path="/categories" element={<ProductPage />} />
                <Route path="/categories/:id" element={<ProductPage />} />
                <Route path="/search" element={<ProductPage />} />
                <Route path="/about" element={<ProductPage />} />
                <Route path="/contact" element={<ProductPage />} /> */}
            </Route>
            <Route path="*" element={<ProductPage />} /> {/* Ruta 404 */}
            {/* Otras rutas del cliente */}
        </Routes>
    );
}