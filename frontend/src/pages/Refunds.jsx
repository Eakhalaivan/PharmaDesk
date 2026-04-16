import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCcw, Search, ChevronRight, 
  Calendar, User, IndianRupee, FileText,
  AlertCircle, CheckCircle2, RotateCcw
} from 'lucide-react';

export default function Refunds() {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const fetchBillings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/billings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBillings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Error fetching billings for refund:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillings();
  }, []);

  const handleRefund = async (id) => {
    if (!window.confirm("Are you sure you want to mark this invoice as REFUNDED? This will update financial records.")) return;
    
    setProcessingId(id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/billings/${id}/status?status=Refunded`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setBillings(prev => prev.map(b => b.id === id ? { ...b, status: 'Refunded' } : b));
      } else {
        alert("Refund failed. Could not update record status.");
      }
    } catch (err) {
      alert("Connection failure: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = billings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4 text-amber-600">
           <RefreshCcw className="w-6 h-6" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">OPERATIONS</span>
        </div>
        <h1 className="text-4xl font-black text-secondary tracking-tight">ISSUE REFUNDS</h1>
        <p className="text-gray-400 font-bold text-sm max-w-xl mt-4">
          Manage product returns and credit clinical accounts. Refunds will be tracked in the Sales History.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10 group">
         <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
         <input 
           type="text" 
           placeholder="Search invoices by customer name or serial ID..." 
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full pl-16 pr-6 py-6 bg-white border border-gray-100 rounded-[32px] text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
         />
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20">
             <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading records...</p>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((billing) => (
            <motion.div 
              key={billing.id}
              layout
              className={`bg-white p-8 rounded-[40px] border border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                billing.status === 'Refunded' ? 'opacity-60 grayscale-[0.5]' : 'hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5'
              }`}
            >
               <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    billing.status === 'Refunded' ? 'bg-gray-100 text-gray-400' : 'bg-amber-50 text-amber-600'
                  }`}>
                     <FileText className="w-7 h-7" />
                  </div>
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-secondary uppercase tracking-tighter text-lg">{billing.customerName}</h3>
                        {billing.status === 'Refunded' && (
                          <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[8px] font-black uppercase tracking-widest">REFUNDED</span>
                        )}
                     </div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: #{billing.id.slice(-8).toUpperCase()} • {new Date(billing.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>

               <div className="flex items-center gap-12">
                  <div className="text-right">
                     <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">SETTLEMENT</p>
                     <p className="text-xl font-black text-secondary">₹{billing.totalAmount.toLocaleString()}</p>
                  </div>
                  
                  {billing.status === 'Refunded' ? (
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRefund(billing.id)}
                      disabled={processingId === billing.id}
                      className="h-14 px-8 bg-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-rose-500 transition-all shadow-lg shadow-secondary/20"
                    >
                       {processingId === billing.id ? 'PROCESSING...' : <><RotateCcw className="w-4 h-4" /> ISSUE REFUND</>}
                    </button>
                  )}
               </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-32 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
             <AlertCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
             <p className="text-xs font-black text-gray-300 uppercase tracking-widest">No match found or repository is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
