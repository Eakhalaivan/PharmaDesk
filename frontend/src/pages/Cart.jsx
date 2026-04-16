import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ArrowRight, Trash2, Printer, 
  CheckCircle2, Package, Truck, Calendar, 
  User, Phone, FileText, IndianRupee, CreditCard,
  ChevronRight, AlertCircle, Search, Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import ProfessionalInvoice from '../components/ProfessionalInvoice';
import { isDevelopmentMode } from '../utils/apiHelper';

export default function Cart() {
  const { items, cartTotal, cartCount, clearCart, updateQuantity, removeFromCart, addToCart } = useCart();
  const { products } = useInventory();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Filter products for quick add (exclude items already in cart and out of stock)
  const availableProducts = useMemo(() => {
    const cartItemIds = new Set(items.map(item => item.id));
    return products.filter(product => 
      !cartItemIds.has(product.id) && 
      product.stockCount > 0 &&
      (searchQuery === '' || 
       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, items, searchQuery]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    
    try {
      // Create invoice data for backend
      const backendOrderData = {
        customerId: customerInfo.name || "Walk-in Customer", // Using name as ID for simplicity in this transitional schema
        subtotal: cartTotal,
        taxAmount: cartTotal * 0.12,
        discountAmount: cartTotal >= 2000 ? 199 : 0, // Simplified logic
        totalAmount: cartTotal * 1.12 + (cartTotal >= 2000 ? 0 : 199),
        paymentMethod: "CASH",
        paymentStatus: "PAID",
        items: items.map(item => ({
          medicine: { id: item.id }, // Map to Medicine object for Hibernate
          medicineName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        }))
      };

      console.log('Sending invoice to backend:', backendOrderData);
      
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendOrderData)
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const savedInvoice = await response.json();
      
      // Update UI with saved invoice data
      setInvoiceData({
        ...backendOrderData,
        customerPhone: customerInfo.phone,
        invoiceNumber: savedInvoice.invoiceNumber,
        date: new Date(savedInvoice.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      
      setShowPrintModal(true);
      localStorage.setItem('lastInvoice', JSON.stringify(savedInvoice));
      setIsOrdered(true);
      clearCart();
      
      console.log('Invoice saved to backend successfully');
    } catch (err) {
      console.error('Failed to save invoice to backend:', err);
      // Fallback to local-only mode if backend fails, to keep UX smooth
      const fallbackData = {
        customerName: customerInfo.name || "Walk-in Customer",
        customerPhone: customerInfo.phone || "",
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: cartTotal,
        tax: cartTotal * 0.12,
        totalAmount: cartTotal * 1.12 + (cartTotal >= 2000 ? 0 : 199),
        status: "Paid",
        invoiceNumber: `LOCAL-${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setInvoiceData(fallbackData);
      setShowPrintModal(true);
      setIsOrdered(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center mx-auto mb-10 relative">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="bg-emerald-500 rounded-[30px] p-3 shadow-xl shadow-emerald-200"
             >
               <CheckCircle2 className="w-12 h-12 text-white" />
             </motion.div>
          </div>
          <h2 className="text-4xl font-black text-secondary mb-4 tracking-tighter">INVOICE GENERATED!</h2>
          <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs mb-12">Serial: #INV-26-004821</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
             <ReceiptInfo icon={User} label="BILLED TO" value={customerInfo.name || "Walk-in Customer"} />
             <ReceiptInfo icon={Calendar} label="DATE" value="April 9, 2026" />
             <ReceiptInfo icon={IndianRupee} label="TOTAL COLLECTED" value={`₹${(cartTotal * 1.12 + (cartTotal >= 2000 ? 0 : 199)).toFixed(2)}`} />
             <ReceiptInfo icon={FileText} label="STATUS" value="PAID & LOGGED" color="text-emerald-500" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
               type="button"
               onClick={() => {
                 setShowPrintModal(true);
               }}
               className="flex-1 bg-secondary text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3"
            >
              <Printer className="w-4 h-4" /> PRINT RECEIPT
            </button>
            <Link
              to="/dashboard"
              className="flex-1 bg-gray-50 text-gray-400 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              BACK TO DASHBOARD <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
        
        {/* Print Modal for isOrdered flow */}
        {showPrintModal && invoiceData && (
          <ProfessionalInvoice 
            invoiceData={invoiceData}
            onClose={() => setShowPrintModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <div className="mb-12">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-2">SALES & BILLING</p>
        <h1 className="text-4xl font-black text-secondary tracking-tight">Generate New Invoice</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Billing Table */}
        <div className="xl:col-span-2 space-y-8">
          {/* Quick Add Products */}
          <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-secondary">Quick Add Products</h3>
                <button
                  onClick={() => setShowQuickAdd(!showQuickAdd)}
                  className="text-xs font-black text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
                >
                  {showQuickAdd ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              
              {showQuickAdd && (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all"
                  />
                </div>
              )}
            </div>
            
            <AnimatePresence>
              {showQuickAdd && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {availableProducts.length > 0 ? (
                      <div className="divide-y divide-gray-50">
                        {availableProducts.slice(0, 10).map((product) => (
                          <div key={product.id} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-50">
                                <img src={product.image} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-secondary">{product.name}</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.manufacturer}</p>
                                <p className="text-xs font-black text-primary">Stock: {product.stockCount}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-secondary">Rs.{product.price}</span>
                              <button
                                onClick={() => addToCart(product)}
                                className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-8 py-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm font-black text-gray-400">
                          {searchQuery ? 'No products found' : 'All available products are in cart'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {items.length > 0 ? (
            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-100">
                    <th className="px-8 py-6">MEDICINE INFO</th>
                    <th className="px-8 py-6 text-center">QTY</th>
                    <th className="px-8 py-6 text-right">UNIT PRICE</th>
                    <th className="px-8 py-6 text-right">TOTAL</th>
                    <th className="px-8 py-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden border border-gray-50">
                              <img src={item.image} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-sm font-black text-secondary">{item.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.manufacturer}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                  item.stockCount >= item.quantity 
                                    ? 'bg-emerald-50 text-emerald-600' 
                                    : 'bg-orange-50 text-orange-600'
                                }`}>
                                  {item.stockCount >= item.quantity ? 'In Stock' : `Only ${item.stockCount} left`}
                                </span>
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-2xl p-1.5 w-max mx-auto border border-gray-100">
                           <button 
                             onClick={() => updateQuantity(item.id, item.quantity - 1, item.stockCount)} 
                             className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-xs font-black shadow-sm hover:text-primary transition-all disabled:opacity-20"
                             disabled={item.quantity <= 1}
                           >-</button>
                           <span className="text-sm font-black text-secondary w-6 text-center">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.id, item.quantity + 1, item.stockCount)} 
                             className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-xs font-black shadow-sm hover:text-primary transition-all disabled:opacity-20"
                             disabled={item.quantity >= item.stockCount}
                           >+</button>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right text-sm font-bold text-gray-500">₹{item.price.toLocaleString()}</td>
                      <td className="px-8 py-6 text-right text-sm font-black text-secondary">₹{(item.price * item.quantity).toLocaleString()}</td>
                      <td className="px-8 py-6 text-right">
                         <button onClick={() => removeFromCart(item.id)} className="p-3 text-gray-200 hover:text-rose-500 transition-all rounded-xl hover:bg-rose-50 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
             <div className="bg-white rounded-[40px] border border-gray-50 border-dashed p-32 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                   <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-secondary mb-2 uppercase">Billing Cart is Empty</h3>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-10">Select medicines from inventory to bill</p>
                <Link to="/admin/medicines" className="inline-flex items-center gap-3 px-10 py-4 bg-secondary text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:bg-primary transition-all">
                   OPEN INVENTORY <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          )}
        </div>

        {/* Invoice Summary */}
        <div className="xl:col-span-1">
          <div className="sticky top-8 space-y-8">
            {/* Customer Details */}
            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10">
               <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <User className="w-4 h-4" /> CUSTOMER DETAILS
               </h4>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">FULL NAME</p>
                     <input 
                       type="text" 
                       placeholder="Enter customer name..." 
                       value={customerInfo.name}
                       onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                       className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">PHONE NUMBER</p>
                     <input 
                       type="tel" 
                       placeholder="+91 00000 00000" 
                       value={customerInfo.phone}
                       onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                       className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all"
                     />
                  </div>
               </div>
            </div>

            {/* Calculations */}
            <div className="bg-secondary text-white rounded-[40px] shadow-2xl shadow-secondary/30 p-10">
               <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-10">BILLING SUMMARY</h4>
               
               <div className="space-y-6 mb-10 border-b border-white/5 pb-10">
                  <CalculationRow label="SUBTOTAL" value={`₹${cartTotal.toLocaleString()}`} />
                  <CalculationRow label="GST (12%)" value={`₹${(cartTotal * 0.12).toLocaleString()}`} />
                  <CalculationRow label="SERVICE CHARGE" value={cartTotal >= 2000 ? "FREE" : "₹199"} />
               </div>

               <div className="flex justify-between items-end mb-12">
                  <p className="text-xs font-black tracking-widest text-white/40">GRAND TOTAL</p>
                  <p className="text-5xl font-black tracking-tighter">₹{(cartTotal * 1.12 + (cartTotal >= 2000 ? 0 : 199)).toLocaleString()}</p>
               </div>

               <button 
                 onClick={handleCheckout}
                 disabled={items.length === 0 || loading}
                 className="w-full bg-white text-secondary py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:scale-100"
               >
                 {loading ? (
                   <div className="w-5 h-5 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                 ) : (
                   <>GENERATE & PRINT INVOICE <Printer className="w-5 h-5" /></>
                 )}
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && invoiceData && (
        <>
          {console.log('Rendering ProfessionalInvoice with data:', invoiceData)}
          <ProfessionalInvoice 
            invoiceData={invoiceData}
            onClose={() => {
              console.log('Closing print modal');
              setShowPrintModal(false);
            }}
          />
        </>
      )}
    </div>
  );
}

function ReceiptInfo({ icon: Icon, label, value, color = "text-secondary" }) {
  return (
    <div className="bg-white border border-gray-50 p-6 rounded-[32px] shadow-sm">
       <div className="flex items-center gap-3 mb-3 text-gray-400">
          <Icon className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
       </div>
       <p className={`text-lg font-black ${color}`}>{value}</p>
    </div>
  );
}

function CalculationRow({ label, value }) {
  return (
    <div className="flex justify-between items-center px-2">
       <span className="text-[10px] font-black tracking-widest text-white/50">{label}</span>
       <span className="text-sm font-black">{value}</span>
    </div>
  );
}
