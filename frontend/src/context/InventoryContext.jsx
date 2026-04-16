import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../services/axiosClient';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get('/api/v1/medicines');
      
      // Handle Spring Data Page structure
      const productsData = response.data.content || response.data;
      console.log("Fetched products:", productsData);
      
      // Map backend fields to frontend expected fields if needed
      const mappedProducts = productsData.map(product => ({
        ...product,
        // Ensure we have the fields the frontend expects
        stockCount: product.stockCount || product.stockQuantity || 0,
        price: product.price || product.sellingPrice || 0,
        inStock: product.inStock !== undefined ? product.inStock : (product.stockCount > 0 || product.stockQuantity > 0),
        manufacturer: product.manufacturer?.name || (typeof product.manufacturer === 'string' ? product.manufacturer : null) || 'Unknown Manufacturer'
      }));
      
      console.log("Mapped products:", mappedProducts);
      setProducts(mappedProducts);
    } catch (err) {
      console.error("Critical: Error fetching inventory:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || err.message || 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const adjustStock = async (productId, delta) => {
    try {
      // Find the product
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const newStock = Math.max(0, product.stockCount + delta);
      
      const response = await axiosClient.put(`/api/v1/medicines/${productId}`, {
        ...product,
        stockQuantity: newStock  // Use the correct field name for backend
      });

      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p
      ));
    } catch (err) {
      console.error("Failed to adjust stock:", err);
    }
  };

  const refreshInventory = () => fetchProducts();

  return (
    <InventoryContext.Provider value={{ 
      products, 
      loading,
      error,
      adjustStock, 
      refreshInventory,
      getLowStockItems: () => products.filter(p => p.stockCount < 10 && p.stockCount > 0)
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
