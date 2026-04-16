import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCcw, Search, ChevronRight, 
  Calendar, User, IndianRupee, FileText,
  AlertCircle, CheckCircle2, RotateCcw, Undo2
} from 'lucide-react';

export default function Returns() {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const fetchBillings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/invoices?size=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const items = data.content || data;
        setBillings(items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Error fetching billings for return:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillings();
  }, []);

  const handleReturn = async (id) => {
    if (!window.confirm("Are you sure you want to mark this invoice as RETURNED? This will update inventory levels.")) return;
    
    setProcessingId(id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/invoices/${id}/status?status=Returned`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setBillings(prev => prev.map(b => b.id === id ? { ...b, paymentStatus: 'Returned' } : b));
      } else {
        alert("Return processing failed.");
      }
    } catch (err) {
      alert("Connection failure: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = billings.filter(b => 
    b.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Returns & Refunds</h1>
        <p className="text-slate-500 font-medium">Process customer returns and manage credit notes.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
         <input 
           type="text" 
           placeholder="Search order ID or customer name..." 
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
         />
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-20">
             <div className="w-8 h-8 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning transactions...</p>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((billing) => (
            <div 
              key={billing.id}
              className={`bg-white p-5 rounded-2xl border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                billing.paymentStatus === 'Returned' ? 'opacity-50' : 'hover:border-emerald-500/30'
              }`}
            >
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    billing.paymentStatus === 'Returned' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                     <FileText className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-900 truncate max-w-[200px]">{billing.customerId || "Walk-in Customer"}</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{billing.invoiceNumber || billing.id.slice(-6).toUpperCase()} • {new Date(billing.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>

               <div className="flex items-center gap-8">
                  <div className="text-right">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AMOUNT</p>
                     <p className="font-black text-slate-900">₹{billing.totalAmount.toLocaleString()}</p>
                  </div>
                  
                  {billing.paymentStatus === 'Returned' ? (
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">RETURNED</span>
                  ) : (
                    <button 
                      onClick={() => handleReturn(billing.id)}
                      disabled={processingId === billing.id}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-600 transition-all shadow-sm"
                    >
                       {processingId === billing.id ? '...' : <RotateCcw className="w-3 h-3" />} 
                       Return
                    </button>
                  )}
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
             <AlertCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No transactions available for return</p>
          </div>
        )}
      </div>
    </div>
  );
}
