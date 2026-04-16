import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, Upload, CheckCircle2, 
  AlertTriangle, ArrowRight, Table as TableIcon,
  Trash2, Save, X, Info
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

export default function ExcelRestock() {
  const { products, fetchProducts } = useInventory();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleParse = () => {
    // Expect: "Medicine Name, Quantity" or "ID, Quantity" per line
    const lines = inputText.split('\n');
    const data = lines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length < 2) return null;
      
      const identifier = parts[0];
      const quantityToAdd = parseInt(parts[1]);
      
      if (isNaN(quantityToAdd)) return null;

      const product = products.find(p => 
        p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase()
      );

      return {
        identifier,
        quantityToAdd,
        product,
        status: product ? 'valid' : 'not_found'
      };
    }).filter(d => d !== null);

    setParsedData(data);
  };

  const handleCommit = async () => {
    setLoading(true);
    const validData = parsedData.filter(d => d.status === 'valid');
    
    try {
      for (const item of validData) {
        const newStock = item.product.stockCount + item.quantityToAdd;
        await fetch(`/api/v1/medicines/${item.product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...item.product,
            stockCount: newStock,
            inStock: newStock > 0
          })
        });
      }
      
      setIsSuccess(true);
      fetchProducts(); // Refresh global state
      setTimeout(() => navigate('/products'), 2000);
    } catch (err) {
      alert("Restock failed for some items. Connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4 text-orange-600">
           <FileSpreadsheet className="w-6 h-6" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">SUPPLY CHAIN</span>
        </div>
        <h1 className="text-4xl font-black text-secondary tracking-tight">EXCEL RESTOCK TOOL</h1>
        <p className="text-gray-400 font-bold text-sm max-w-xl mt-4">
          Bulk update your inventory levels by pasting clinical supply data. Use the format: <code className="bg-gray-100 px-2 py-0.5 rounded">Medicine Name, Quantity</code>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Input Area */}
        <div className="space-y-6">
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-secondary tracking-[0.2em] uppercase">PASTE DATA (CSV FORMAT)</h3>
                <div className="text-[10px] text-gray-400 font-bold flex items-center gap-2">
                   <Info className="w-3 h-3" /> One entry per line
                </div>
              </div>
              <textarea 
                placeholder="e.g.&#10;Paracetamol, 500&#10;Amoxicillin, 200"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-80 bg-gray-50 rounded-3xl p-8 text-sm font-bold border-2 border-transparent focus:border-primary/10 focus:bg-white outline-none transition-all resize-none shadow-inner"
              />
              <button 
                onClick={handleParse}
                className="w-full mt-6 bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3"
              >
                <TableIcon className="w-4 h-4" /> PARSE SUPPLY DATA
              </button>
           </div>
        </div>

        {/* Validation Area */}
        <div className="space-y-6">
           {parsedData.length > 0 ? (
             <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-10 border-b border-gray-50">
                   <h3 className="text-xs font-black text-secondary tracking-[0.2em] uppercase mb-1">PARSED RESULTS</h3>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">{parsedData.length} records detected</p>
                </div>
                
                <div className="flex-1 overflow-y-auto max-h-[400px]">
                   <table className="w-full text-left">
                     <thead className="bg-gray-50/50 sticky top-0 backdrop-blur-sm">
                        <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                           <th className="px-8 py-4">PRODUCT IDENTIFIER</th>
                           <th className="px-8 py-4 text-center">ADD QTY</th>
                           <th className="px-8 py-4 text-right">STATUS</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {parsedData.map((item, i) => (
                           <tr key={i} className="text-xs font-bold text-secondary">
                              <td className="px-8 py-6">{item.identifier}</td>
                              <td className="px-8 py-6 text-center text-primary">+{item.quantityToAdd}</td>
                              <td className="px-8 py-6 text-right">
                                 {item.status === 'valid' ? (
                                   <span className="text-emerald-500 flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3" /> MATCHED</span>
                                 ) : (
                                   <span className="text-rose-500 flex items-center justify-end gap-1"><AlertTriangle className="w-3 h-3" /> UNKNOWN</span>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                   </table>
                </div>

                <div className="p-10 bg-gray-50/50 flex flex-col gap-4">
                   <button 
                     disabled={loading || parsedData.every(d => d.status !== 'valid')}
                     onClick={handleCommit}
                     className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-20"
                   >
                     {loading ? 'COMMITTING...' : <><Save className="w-4 h-4" /> COMMIT UPDATES TO CLOUD</>}
                   </button>
                   <button 
                     onClick={() => setParsedData([])}
                     className="w-full bg-white text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                   >
                     <X className="w-3 h-3" /> CLEAR ALL
                   </button>
                </div>
             </div>
           ) : (
             <div className="h-full min-h-[500px] border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-20 text-center text-gray-300">
                <Upload className="w-16 h-16 mb-6 opacity-20" />
                <p className="text-xs font-black uppercase tracking-[0.3em]">Parsed data will appear here</p>
             </div>
           )}
        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-secondary/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white p-16 rounded-[60px] max-w-lg w-full text-center shadow-2xl"
             >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10">
                   <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-secondary mb-4 tracking-tighter">RESTOCK SUCCESSFUL!</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-12">The inventory database has been updated in real-time.</p>
                <button 
                  onClick={() => navigate('/products')}
                  className="w-full bg-secondary text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-secondary/20 hover:bg-primary transition-all flex items-center justify-center gap-3"
                >
                  RETURN TO INVENTORY <ArrowRight className="w-4 h-4" />
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
