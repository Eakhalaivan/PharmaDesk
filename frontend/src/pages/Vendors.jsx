import { Users, Phone, Mail, MapPin, Search, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Vendors() {
  const vendors = [
    { id: 1, name: 'PharmaCare Labs', contact: 'Ramesh Patel', phone: '+91 98765 43210', email: 'orders@pharmacare.in', rating: 4.8, status: 'Active' },
    { id: 2, name: 'Cipla India Ltd.', contact: 'Support Desk', phone: '+91 1800 234 5678', email: 'supply@cipla.com', rating: 4.9, status: 'Active' },
    { id: 3, name: 'Meditrust Inc.', contact: 'Anita Sharma', phone: '+91 91234 56789', email: 'anita.s@meditrust.in', rating: 4.5, status: 'Active' },
    { id: 4, name: 'FastPharma Logistics', contact: 'Vijay Singh', phone: '+91 99887 76655', email: 'dispatch@fastpharma.in', rating: 3.8, status: 'Review' },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">Vendors & Suppliers</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            Manage your pharmaceutical supply chain
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="Search vendors..." className="pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold" />
           </div>
           <button className="bg-secondary text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-primary transition-all">
             <Plus className="w-4 h-4" /> Add Vendor
           </button>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-100">
              <th className="px-8 py-6">VENDOR DETAILS</th>
              <th className="px-8 py-6">POINT OF CONTACT</th>
              <th className="px-8 py-6">RATING</th>
              <th className="px-8 py-6 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vendors.map((vendor, i) => (
              <motion.tr initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} key={vendor.id} className="group hover:bg-white/60 transition-all cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-secondary">{vendor.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">{vendor.id.toString().padStart(4, 'V-00')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-secondary">{vendor.contact}</p>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Phone className="w-3 h-3" /> {vendor.phone}</span>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Mail className="w-3 h-3" /> {vendor.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-black text-sm">{vendor.rating}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    vendor.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {vendor.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
