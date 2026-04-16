import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FALLBACK = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const location = useLocation();
  const isAvailable = product.stockCount > 0;
  const isExpired = product.expiryDate && new Date(product.expiryDate) <= new Date();
  
  // Determine the correct path based on current location
  const getDetailPath = () => {
    const path = location.pathname;
    if (path.includes('/admin/')) {
      return `/admin/medicines/${product.id}`;
    } else if (path.includes('/employee/')) {
      return `/employee/medicines/${product.id}`;
    }
    return `/medicines/${product.id}`; // fallback
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable && !isExpired) addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="book-card"
    >
      {/* ── INNER PAGE (back of book — visible after cover opens) ── */}
      <div className="book-card-inner">
        <p className="book-title">{product.name}</p>
        <p className="book-mfr">{product.manufacturer || 'Unknown Manufacturer'}</p>

        <div className="book-stats">
          <div className="book-stat">
            <span className="bstat-value">₹{product.price}</span>
            <span className="bstat-label">Price</span>
          </div>
          <div className="book-stat">
            <span className="bstat-value" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'3px' }}>
              {product.rating > 0 ? product.rating : '—'}
              {product.rating > 0 && <Star style={{ width:12,height:12,color:'#fbbf24',fill:'#fbbf24' }} />}
            </span>
            <span className="bstat-label">Rating</span>
          </div>
          <div className="book-stat">
            <span className="bstat-value" style={{ color: isAvailable ? '#34d399' : '#f87171' }}>
              {product.stockCount}
            </span>
            <span className="bstat-label">In Stock</span>
          </div>
        </div>

        <div className="book-actions">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || isExpired}
            className="book-btn"
          >
            <ShoppingCart style={{ width:12,height:12 }} />
            {isAvailable && !isExpired ? 'Add to Cart' : isExpired ? 'Expired' : 'No Stock'}
          </button>
          <Link to={getDetailPath()} className="book-btn">
            View
          </Link>
        </div>
      </div>

      {/* ── COVER (front of book — opens on hover from the left spine) ── */}
      <div className="book-card-cover">
        {/* Product photo fills the cover */}
        <img
          src={product.image || FALLBACK}
          alt={product.name}
          onError={(e) => { e.target.src = FALLBACK; }}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', borderRadius:10 }}
        />
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, borderRadius:10, background:'linear-gradient(to top, rgba(0,0,0,0.65) 35%, transparent 70%)' }} />

        {/* Status badge */}
        <div style={{ position:'absolute', top:12, right:12, zIndex:10 }}>
          {isExpired ? (
            <span style={{ background:'#ef4444', color:'#fff', fontSize:8, fontWeight:900, padding:'3px 8px', borderRadius:6, textTransform:'uppercase', letterSpacing:2 }}>EXPIRED</span>
          ) : !isAvailable ? (
            <span style={{ background:'rgba(0,0,0,0.75)', color:'#fff', fontSize:8, fontWeight:900, padding:'3px 8px', borderRadius:6, textTransform:'uppercase', letterSpacing:2 }}>OUT OF STOCK</span>
          ) : (
            <button
              onClick={handleAddToCart}
              style={{ background:'rgba(15,23,42,0.85)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:10, padding:7, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
            >
              <Plus style={{ width:16, height:16, color:'#fff' }} />
            </button>
          )}
        </div>

        {/* Name at bottom of cover */}
        <div style={{ position:'relative', zIndex:10, padding:'0 16px 16px', width:'100%' }}>
          <p style={{ color:'#fff', fontWeight:900, fontSize:14, lineHeight:1.3, margin:0 }}>{product.name}</p>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:9, textTransform:'uppercase', letterSpacing:2, marginTop:3 }}>{product.manufacturer}</p>
        </div>
      </div>
    </motion.div>
  );
}
