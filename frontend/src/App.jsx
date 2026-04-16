import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { InventoryProvider } from './context/InventoryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AddMedicine from './pages/AddMedicine';
import SalesHistory from './pages/SalesHistory';
import Refunds from './pages/Refunds';
import ExcelRestock from './pages/ExcelRestock';
import Vendors from './pages/Vendors';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Customers from './pages/Customers';
import Manufacturers from './pages/Manufacturers';
import Invoices from './pages/Invoices';
import Returns from './pages/Returns';
import Accounts from './pages/Accounts';
import Tax from './pages/Tax';
import Staff from './pages/Staff';
import Unauthorized from './pages/Unauthorized';

function RootRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return user.role === 'ADMIN' 
    ? <Navigate to="/admin/dashboard" replace /> 
    : <Navigate to="/employee/dashboard" replace />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<RootRedirect />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="medicines" element={<Products />} />
        <Route path="medicines/:id" element={<ProductDetail />} />
        <Route path="medicines/add" element={<AddMedicine />} />
        <Route path="inventory/restock" element={<ExcelRestock />} />
        <Route path="inventory/refunds" element={<Refunds />} />
        <Route path="sales-history" element={<SalesHistory />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="analytics" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="manufacturers" element={<Manufacturers />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="returns" element={<Returns />} />
        <Route path="reports" element={<Reports />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="tax" element={<Tax />} />
        <Route path="staff" element={<Staff />} />
        <Route path="new-sale" element={<Cart />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<PrivateRoute role="EMPLOYEE"><EmployeeLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="medicines" element={<Products />} />
        <Route path="medicines/:id" element={<ProductDetail />} />
        <Route path="new-sale" element={<Cart />} />
        <Route path="my-sales" element={<SalesHistory />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}
