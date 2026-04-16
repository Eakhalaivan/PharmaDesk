import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IndianRupee, ShoppingBag, Package, 
  AlertTriangle, Clock, Activity, RefreshCcw,
  CheckCircle2, XCircle, ChevronRight, Plus, FileSpreadsheet,
  ArrowUpRight, BarChart3, TrendingUp, AlertCircle, Shield, Briefcase
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, isAdmin, isEmployee } = useAuth();
  const { products, loading: invLoading } = useInventory();
  const [billings, setBillings] = useState([]);
  const [stats, setStats] = useState({ lowStock: 0, outOfStock: 0, expiringSoon: 0, expired: 0 });
  const [loading, setLoading] = useState(true);
  
  const roleBase = isAdmin() ? '/admin' : '/employee';

  const [financials, setFinancials] = useState({ totalRevenue: 0, totalRefunds: 0, totalOrders: 0, averageOrderValue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        };

        const [statusRes, summaryRes] = await Promise.all([
          fetch('/api/v1/analytics/status', { headers }),
          fetch('/api/v1/analytics/summary', { headers })
        ]);
        
        // Handle unauthorized access (expired or invalid token)
        if (statusRes.status === 401 || statusRes.status === 403 || 
            summaryRes.status === 401 || summaryRes.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setStats(statusData);
        }

        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          setFinancials(summaryData);
        }
      } catch (err) {
        console.error("Dashboard sync error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { totalRevenue, totalRefunds, totalOrders, averageOrderValue } = financials;

  const quickActions = [
    { title: 'NEW ORDER', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50/50', path: `${roleBase}/${isEmployee() ? 'new-sale' : 'medicines'}`, roles: ['ADMIN', 'EMPLOYEE'] },
    { title: 'MY SALES', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50/50', path: `${roleBase}/my-sales`, roles: ['EMPLOYEE'] },
    { title: 'ISSUE REFUND', icon: RefreshCcw, color: 'text-amber-500', bg: 'bg-amber-50/50', path: '/admin/inventory/refunds', roles: ['ADMIN'] },
    { title: 'ADD MEDICINE', icon: Package, color: 'text-indigo-500', bg: 'bg-indigo-50/50', path: '/admin/medicines/add', roles: ['ADMIN'] },
    { title: 'EXCEL RESTOCK', icon: FileSpreadsheet, color: 'text-orange-500', bg: 'bg-orange-50/50', path: '/admin/inventory/restock', roles: ['ADMIN'] },
    { title: 'SYSTEM ANALYTICS', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50/50', path: '/admin/analytics', roles: ['ADMIN'] },
  ].filter(action => action.roles.includes(user?.role));

  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                isAdmin() ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {isAdmin() ? <Shield className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                {user?.role} PORTAL
              </div>
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">
            WELCOME, <span className="text-primary">{user?.fullName}</span>!
          </h1>
          <p className="text-gray-400 font-bold italic flex items-center gap-2">
             <Activity className="w-4 h-4 text-primary" />
             {isAdmin() ? "System-wide overview for central administration." : "Ready to process new prescriptions and view your daily logs."}
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => window.location.reload()}
             className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-secondary hover:bg-gray-50 transition-all shadow-sm"
           >
              <RefreshCcw className="w-4 h-4" />
              SYNC DATA
           </button>
           <div className="px-6 py-2.5 bg-secondary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/20">
              ID: {user?.employeeId}
           </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatusCard title="Inventory: Low Stock" value={stats.lowStock} label="Replenishment Alert" icon={AlertTriangle} type="amber" />
        <StatusCard title="Inventory: Out of Stock" value={stats.outOfStock} label="Critical Shortage" icon={AlertCircle} type="rose" />
        <StatusCard title="Compliance: Expiring" value={stats.expiringSoon} label="Action Required" icon={Clock} type="rose-light" />
        <StatusCard title="Compliance: Expired" value={stats.expired} label="Disposal Needed" icon={XCircle} type="rose-bold" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-3 bg-white/60 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-12">
            <div>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-1">DETAILED PERFORMANCE PULSE</p>
               <h3 className="text-xl font-black text-secondary">Live Metrics</h3>
            </div>
            <div className="bg-secondary text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
               Live Updates
            </div>
          </div>

          <div className="flex items-end justify-around h-64 gap-8">
             <Bar value={totalRevenue} label="REVENUE" color="from-secondary to-primary/80" />
             <Bar value={totalRefunds} label="REFUNDS" color="from-amber-400 to-orange-500" />
             <Bar value={totalOrders} label="ORDERS" color="from-indigo-400 to-purple-600" />
             <Bar value={averageOrderValue} label="AVG RECEIPT" color="from-blue-400 to-blue-700" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
           <p className="px-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-4">QUICK ACTIONS</p>
            {quickActions.map((action, i) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => action.path !== '#' && navigate(action.path)}
                className="w-full group bg-white/40 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between hover:bg-white/70 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 ${action.bg} ${action.color} rounded-xl flex items-center justify-center transition-all group-hover:scale-110`}>
                      <action.icon className="w-5 h-5" />
                   </div>
                   <span className="text-xs font-black text-secondary tracking-widest uppercase">{action.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-primary transition-all" />
             </motion.button>
           ))}
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, value, label, icon: Icon, type }) {
  return (
    <div className="animated-card p-8 rounded-[32px] flex flex-col justify-between h-44 shadow-xl text-white group">
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-wider text-gray-300">{title}</p>
          <p className="text-4xl font-black tracking-tight">{value}</p>
        </div>
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
           <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-300 relative z-10">{label}</p>
    </div>
  );
}

function Bar({ value, label, color }) {
  const height = Math.min(100, Math.max(2, (value / 50000) * 100)); // Ensure at least 2% visibility
  return (
    <div className="flex-1 flex flex-col items-center gap-4 h-full">
       <span className="text-sm font-black text-secondary">₹{value.toLocaleString()}</span>
       <div className="w-16 h-full bg-gray-50 rounded-full flex flex-col justify-end overflow-hidden border border-gray-100/50 shadow-inner">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ type: 'spring', damping: 15, stiffness: 60 }}
            className={`w-full bg-gradient-to-t ${color} rounded-t-full shadow-lg relative z-10`}
          />
       </div>
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}
