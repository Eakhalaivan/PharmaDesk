import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusCircle, Package, IndianRupee, Tag, 
  Warehouse, Calendar, Hash, ArrowLeft,
  Save, X, Info
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function AddMedicine() {
  const navigate = useNavigate();
  const { refreshInventory } = useInventory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tablets',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    stockCount: '',
    manufacturer: '',
    expiryDate: '',
    batchNumber: '',
    lowStockThreshold: 10
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stockCount: parseInt(formData.stockCount) || 0,
        lowStockThreshold: parseInt(formData.lowStockThreshold) || 10,
        inStock: (parseInt(formData.stockCount) || 0) > 0,
        reviews: 0,
        rating: 0,
      };

      console.log("Submitting medicine payload:", payload);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();

      if (response.ok) {
        await refreshInventory();
        navigate('/products');
      } else {
        const errorText = await response.text();
        alert(`API Error: ${errorText || response.statusText}`);
      }
    } catch (err) {
      console.error("Critical failure adding medicine:", err);
      alert(`System Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Inventory</span>
          </button>
          <h1 className="text-4xl font-black text-secondary tracking-tight">ADD NEW MEDICINE</h1>
        </div>
        <div className="w-16 h-16 bg-primary/5 text-primary rounded-[24px] flex items-center justify-center shadow-inner">
           <PlusCircle className="w-8 h-8" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Info Section */}
        <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10">
          <SectionHeader icon={Info} title="CORE IDENTIFICATION" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField 
              label="MEDICINE NAME" 
              name="name" 
              placeholder="e.g. Paracetamol 500mg" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">CATEGORY</p>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all appearance-none"
              >
                <option value="tablets">Tablets</option>
                <option value="syrups">Syrups</option>
                <option value="injections">Injections</option>
                <option value="capsules">Capsules</option>
                <option value="ointments">Ointments</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <FormField 
                label="DESCRIPTION" 
                name="description" 
                placeholder="Clinical indications and usage..." 
                value={formData.description} 
                onChange={handleChange} 
                isTextArea
              />
            </div>
          </div>
        </div>

        {/* Inventory & Pricing Section */}
        <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10">
          <SectionHeader icon={Warehouse} title="INVENTORY & LOGISTICS" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField 
              label="UNIT PRICE (₹)" 
              name="price" 
              type="number"
              placeholder="0.00" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
            <FormField 
              label="STOCK COUNT" 
              name="stockCount" 
              type="number"
              placeholder="0" 
              value={formData.stockCount} 
              onChange={handleChange} 
              required 
            />
            <FormField 
              label="LOW STOCK ALERT" 
              name="lowStockThreshold" 
              type="number"
              placeholder="10" 
              value={formData.lowStockThreshold} 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* Compliance Section */}
        <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10">
          <SectionHeader icon={Save} title="COMPLIANCE & BATCHING" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField 
              label="MANUFACTURER" 
              name="manufacturer" 
              placeholder="e.g. Cipla Pharma" 
              value={formData.manufacturer} 
              onChange={handleChange} 
              required 
            />
            <FormField 
              label="EXPIRY DATE" 
              name="expiryDate" 
              type="date"
              value={formData.expiryDate} 
              onChange={handleChange} 
              required 
            />
            <FormField 
              label="BATCH NUMBER" 
              name="batchNumber" 
              placeholder="e.g. BN-9281" 
              value={formData.batchNumber} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-secondary text-white py-6 rounded-[30px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-secondary/20 hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <><Save className="w-4 h-4" /> SAVE MEDICINE TO CLOUD</>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-10 py-6 bg-gray-50 text-gray-400 rounded-[30px] font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-100 transition-all flex items-center gap-3"
          >
            <X className="w-4 h-4" /> CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-10 border-b border-gray-50 pb-6">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="text-xs font-black text-secondary tracking-[0.3em] uppercase">{title}</h3>
    </div>
  );
}

function FormField({ label, name, type = "text", placeholder, value, onChange, required = false, isTextArea = false }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{label} {required && "*"}</p>
      {isTextArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows="4"
          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 outline-none text-sm font-bold transition-all"
        />
      )}
    </div>
  );
}
