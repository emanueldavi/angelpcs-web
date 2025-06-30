import './App.css';
import { Routes, Route } from 'react-router-dom';
import ClientRoutes from '@/client/ClientRoutes.jsx';
import AdminRoutes from '@/admin/AdminRoutes.jsx';

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Rutas del cliente */}
                <Route path="/*" element={<ClientRoutes />} />

                {/* Rutas del admin */}
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
        </div>
    );
}

export default App;
