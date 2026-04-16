import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, IndianRupee, Printer, 
  Search, Calendar, User, ChevronDown,
  Filter, Download, ChevronRight, CheckCircle2
} from 'lucide-react';

export default function SalesHistory() {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
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
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBillings();
  }, []);

  const filteredBillings = billings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">SALES REPOSITORY</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Stored history of ALL generated invoices & receipts
          </p>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl">
           <div className="relative flex-1 group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
             <input 
               type="text" 
               placeholder="Search by customer name or invoice ID..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[32px] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
             />
           </div>
           <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-secondary shadow-sm hover:border-primary/20 transition-all">
              <Download className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Invoice List */}
        <div className="xl:col-span-2 space-y-4">
          {loading ? (
            <div className="space-y-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-24 bg-gray-100 rounded-3xl animate-pulse" />
               ))}
            </div>
          ) : filteredBillings.length > 0 ? (
            filteredBillings.map((billing) => (
              <motion.div
                key={billing.id}
                layout
                onClick={() => setSelectedInvoice(billing)}
                className={`group p-6 rounded-[32px] border transition-all cursor-pointer flex items-center justify-between ${
                  selectedInvoice?.id === billing.id 
                    ? 'bg-secondary text-white border-secondary shadow-xl' 
                    : 'bg-white border-gray-50 hover:border-primary/20'
                }`}
              >
                <div className="flex items-center gap-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                     selectedInvoice?.id === billing.id ? 'bg-white/10' : 'bg-gray-50 text-gray-400'
                   }`}>
                      <FileText className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="font-black text-sm uppercase tracking-tight">{billing.customerName}</h3>
                      <p className={`text-[10px] font-bold mt-1 ${
                        selectedInvoice?.id === billing.id ? 'text-white/40' : 'text-gray-400'
                      }`}>
                         ID: #{billing.id.slice(-8).toUpperCase()} • {new Date(billing.createdAt).toLocaleDateString()}
                      </p>
                   </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="text-right hidden sm:block">
                      <p className={`text-[8px] font-black uppercase tracking-widest mb-1 ${
                        selectedInvoice?.id === billing.id ? 'text-white/40' : 'text-gray-400'
                      }`}>AMOUNT</p>
                      <p className="font-black text-lg">₹{billing.totalAmount.toLocaleString()}</p>
                   </div>
                   <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                     selectedInvoice?.id === billing.id ? 'bg-white/10' : 'bg-emerald-50 text-emerald-600'
                   }`}>
                      PAID
                   </div>
                   <ChevronRight className={`w-5 h-5 transition-transform ${
                     selectedInvoice?.id === billing.id ? 'rotate-90 text-white' : 'text-gray-200'
                   }`} />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[40px] border border-gray-50 border-dashed p-32 text-center">
               <FileText className="w-12 h-12 text-gray-200 mx-auto mb-6" />
               <h3 className="text-xl font-black text-secondary">No invoices found</h3>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Repository is empty or search filter returned nothing</p>
            </div>
          )}
        </div>

        {/* Detailed View */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedInvoice ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10 sticky top-8"
              >
                <div className="flex items-center justify-between mb-10">
                   <h2 className="text-xl font-black text-secondary">Invoiced Details</h2>
                   <button 
                     type="button"
                     onClick={() => setTimeout(() => { try { window.print(); } catch(e){ console.warn("Print blocked:", e); } }, 100)}
                     className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                   >
                      <Printer className="w-5 h-5" />
                   </button>
                </div>

                <div className="space-y-8 mb-10 border-b border-gray-50 pb-10">
                   <DetailRow icon={User} label="Customer" value={selectedInvoice.customerName} />
                   <DetailRow icon={Calendar} label="Dated" value={new Date(selectedInvoice.createdAt).toLocaleString()} />
                   <DetailRow icon={CheckCircle2} label="Status" value="Verified & Logged" color="text-emerald-500" />
                </div>

                <div className="space-y-4 mb-10">
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">DRUGS SOLD</p>
                   {selectedInvoice.items.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                        <div>
                           <p className="text-xs font-black text-secondary">{item.productName}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-black text-sm text-secondary">₹{(item.price * item.quantity).toLocaleString()}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-secondary text-white p-8 rounded-[32px] space-y-4 shadow-xl shadow-secondary/10">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>Subtotal</span>
                      <span>₹{selectedInvoice.subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>GST (12%)</span>
                      <span>₹{selectedInvoice.tax.toLocaleString()}</span>
                   </div>
                   <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                      <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                      <span className="text-3xl font-black tracking-tighter">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50/50 rounded-[40px] border border-gray-100 border-dashed p-20 text-center sticky top-8">
                 <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Select an invoice from history to view full clinical receipt details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, color = "text-secondary" }) {
  return (
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
          <Icon className="w-4 h-4" />
       </div>
       <div>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
          <p className={`text-sm font-black ${color}`}>{value}</p>
       </div>
    </div>
  );
}
