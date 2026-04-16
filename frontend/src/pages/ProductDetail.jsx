import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Package, AlertTriangle, BookOpen, Building2, ShieldCheck, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { products } = useInventory();
  const product = products.find((p) => String(p.id) === String(id));
  
  // Determine the correct back path based on current location
  const getBackPath = () => {
    const path = location.pathname;
    if (path.includes('/admin/')) {
      return '/admin/medicines';
    } else if (path.includes('/employee/')) {
      return '/employee/medicines';
    }
    return '/medicines'; // fallback
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          to={getBackPath()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: BookOpen },
    { id: 'usage', label: 'Usage', icon: Package },
    { id: 'sideEffects', label: 'Side Effects', icon: AlertTriangle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-md">
              -{discount}% OFF
            </span>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-2">
            {product.category}
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                Save ₹{(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl">
              <Building2 className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Manufacturer</p>
                <p className="text-xs font-semibold text-gray-700">{product.manufacturer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl">
              <Package className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Pack Size</p>
                <p className="text-xs font-semibold text-gray-700">{product.packSize}</p>
              </div>
            </div>
          </div>

          {/* Stock Status Integration */}
          <div className="mb-6">
            {product.stockCount === 0 ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">
                <Package className="w-3.5 h-3.5" /> Out of Stock
              </span>
            ) : product.stockCount < 10 ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100">
                <Activity className="w-3.5 h-3.5" /> Only {product.stockCount} left in stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" /> In Stock
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-end gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-4xl font-black text-secondary tracking-tighter">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">
                  Save ₹{product.originalPrice - product.price} ({Math.round((1 - product.price/product.originalPrice) * 100)}% OFF)
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={product.stockCount === 0}
                className="w-12 h-12 flex items-center justify-center text-secondary hover:text-primary transition-colors disabled:opacity-30"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center font-black text-secondary">{product.stockCount === 0 ? 0 : quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                disabled={product.stockCount === 0 || quantity >= product.stockCount}
                className="w-12 h-12 flex items-center justify-center text-secondary hover:text-primary transition-colors disabled:opacity-30"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={product.stockCount === 0}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl ${
                product.stockCount > 0 
                  ? 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 shadow-primary/20 cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> 
              {product.stockCount > 0 ? 'Add to Cart' : 'Currently Unavailable'}
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed p-2">
              {activeTab === 'description' && product.description}
              {activeTab === 'usage' && product.usage}
              {activeTab === 'sideEffects' && product.sideEffects}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
