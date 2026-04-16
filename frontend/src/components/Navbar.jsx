import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Shield, Briefcase, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, getInitials, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h-16 bg-white/50 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2">
         {/* Breadcrumb or Title placeholder can go here */}
      </div>

      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <button
          onClick={() => navigate(isAdmin() ? '/admin/new-sale' : '/employee/new-sale')}
          className="relative p-2 text-slate-600 hover:text-primary hover:bg-primary/5 transition-all rounded-lg"
          title="Shopping Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
        
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col items-end pr-2 border-r border-slate-100">
            <span className="text-xs font-black text-slate-800 uppercase tracking-tight leading-none mb-1">
              {user?.fullName}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{user?.employeeId}</span>
              <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${
                isAdmin() ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {isAdmin() ? <Shield className="w-2 h-2" /> : <Briefcase className="w-2 h-2" />}
                {user?.role}
              </div>
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-inner">
            {getInitials()}
          </div>

          <button 
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
