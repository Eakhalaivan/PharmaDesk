import { motion } from 'framer-motion';
import { Microscope, Activity, ShieldCheck, Clock, FileText, ChevronRight, TestTube, Thermometer, Heart } from 'lucide-react';

const popularPackages = [
  {
    id: 1,
    name: "Full Body Checkup",
    count: "82 Tests Included",
    price: 1999,
    originalPrice: 3999,
    tag: "Best Value",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    name: "Vitamin Profile",
    count: "2 Tests Included",
    price: 999,
    originalPrice: 1599,
    color: "bg-amber-50 text-amber-600"
  },
  {
    id: 3,
    name: "Diabetes Care",
    count: "12 Tests Included",
    price: 599,
    originalPrice: 899,
    color: "bg-emerald-50 text-emerald-600"
  }
];

const categories = [
  { icon: Microscope, label: "Fever", color: "text-red-500" },
  { icon: Activity, label: "Diabetes", color: "text-emerald-500" },
  { icon: Heart, label: "Heart", color: "text-pink-500" },
  { icon: TestTube, label: "Bone", color: "text-amber-500" },
  { icon: Thermometer, label: "Kidney", color: "text-blue-500" },
];

export default function LabTests() {
  return (
    <div className="bg-gray-50/30 min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6"
            >
              NABL Accredited Labs
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black mb-6 leading-tight"
            >
              Accurate Reports, <br />
              <span className="text-primary">Trusted by Millions.</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider">100% Safe Sample Collection</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider">Reports in 24 Hours</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.button 
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <cat.icon className={`w-10 h-10 ${cat.color} mb-4 group-hover:scale-110 transition-transform`} />
              <p className="font-black text-secondary uppercase tracking-widest text-[10px]">{cat.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Popular Packages */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-secondary tracking-tight">POPULAR HEALTH PACKAGES</h2>
              <p className="text-gray-400 text-sm font-medium">Curated checkups for your well-being</p>
            </div>
            <button className="text-primary font-black uppercase text-xs tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPackages.map((pkg, i) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden group"
              >
                {pkg.tag && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
                    {pkg.tag}
                  </span>
                )}
                <div className={`w-14 h-14 ${pkg.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Microscope className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-6">{pkg.count}</p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl font-black text-secondary">₹{pkg.price}</span>
                  <span className="text-gray-400 line-through text-sm">₹{pkg.originalPrice}</span>
                </div>

                <button className="w-full bg-secondary text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-colors shadow-lg shadow-secondary/10">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-[3rem] border border-gray-100 p-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <h2 className="text-2xl font-black text-secondary tracking-tight mb-12 flex items-center gap-3">
             <Activity className="text-primary" /> HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-xl font-black text-primary">1</div>
              <div>
                <h4 className="font-black text-secondary text-sm uppercase tracking-widest mb-2">Book Online</h4>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Choose your test package and select a convenient time slot for home collection.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-xl font-black text-primary">2</div>
              <div>
                <h4 className="font-black text-secondary text-sm uppercase tracking-widest mb-2">Home Collection</h4>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Our certified phlebotomists will visit your home for safe sample collection.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-xl font-black text-primary">3</div>
              <div>
                <h4 className="font-black text-secondary text-sm uppercase tracking-widest mb-2">Digital Reports</h4>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Access your detailed digital reports on your dashboard within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
