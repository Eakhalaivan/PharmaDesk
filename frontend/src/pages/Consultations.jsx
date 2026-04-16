import { motion } from 'framer-motion';
import { User, Video, Shield, Clock, Search, MessageSquare, ChevronRight, Star, Heart, Activity } from 'lucide-react';

const specialties = [
  { label: "General Physician", count: "150+ Doctors", icon: User, color: "bg-blue-50 text-blue-600" },
  { label: "Dermatology", count: "80+ Doctors", icon: Heart, color: "bg-pink-50 text-pink-600" },
  { label: "Pediatrics", count: "60+ Doctors", icon: Activity, color: "bg-orange-50 text-orange-600" },
  { label: "Gynaecology", count: "100+ Doctors", icon: Shield, color: "bg-purple-50 text-purple-600" },
  { label: "Dietitians", count: "40+ Doctors", icon: Activity, color: "bg-emerald-50 text-emerald-600" },
  { label: "Mental Health", count: "50+ Doctors", icon: MessageSquare, color: "bg-indigo-50 text-indigo-600" },
];

const topDoctors = [
  { img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", name: "Dr. Aristhoth", specialty: "General Physician", exp: "12 Years", rating: 4.9 },
  { img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", name: "Dr. Sarah Miller", specialty: "Dermatologist", exp: "8 Years", rating: 4.8 }
];

export default function Consultations() {
  return (
    <div className="bg-gray-50/30 min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl lg:text-6xl font-black mb-6 leading-tight whitespace-pre-line"
            >
              Consult Top Doctors{'\n'}
              <span className="text-secondary">Online, Instantly.</span>
            </motion.h1>
            <p className="text-white/80 text-lg font-medium mb-10 max-w-xl mx-auto lg:mx-0">
              Get medical advice from India's best doctors from the comfort of your home. Video call or chat within 15 minutes.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-white transition-all shadow-xl shadow-black/10">
                Consult Now
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="aspect-square bg-white/10 rounded-[4rem] backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&fit=crop" 
                  alt="Doctor" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <p className="text-xs font-black uppercase tracking-widest mb-1">Live Consultation</p>
                    <p className="text-[10px] opacity-80">Connecting you to the best care...</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto -mt-24 mb-20 relative z-20">
          <div className="bg-white rounded-[2rem] p-4 shadow-2xl shadow-primary/20 border border-gray-100 flex items-center gap-4">
            <Search className="w-6 h-6 text-primary ml-4" />
            <input 
              type="text" 
              placeholder="Search for specialty or doctor name..." 
              className="flex-1 py-1.5 text-sm font-medium text-secondary focus:outline-none placeholder:text-gray-400"
            />
            <button className="bg-primary text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Specialty Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-secondary tracking-tight mb-8">SELECT A SPECIALTY</h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {specialties.map((s, i) => (
              <motion.button 
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-primary transition-all group text-center"
              >
                <div className={`w-12 h-12 mx-auto ${s.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-secondary mb-1">{s.label}</h4>
                <p className="text-[9px] font-medium text-gray-400">{s.count}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">100% Private</p>
              <p className="text-[10px] text-gray-400 font-medium">Safe & secure medical data</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">Video Consultation</p>
              <p className="text-[10px] text-gray-400 font-medium">High quality video calls</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">Instant Connect</p>
              <p className="text-[10px] text-gray-400 font-medium">Get connected in 15 mins</p>
            </div>
          </div>
        </div>

        {/* Top Doctors */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-secondary tracking-tight">TOP DOCTORS FOR YOU</h2>
            <button className="text-primary font-black uppercase text-xs tracking-widest flex items-center gap-1">
              View All Doctors <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topDoctors.map((doc, i) => (
              <motion.div 
                key={doc.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all"
              >
                <img src={doc.img} alt={doc.name} className="w-24 h-24 rounded-3xl object-cover shadow-md" />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-black text-secondary">{doc.rating}</span>
                  </div>
                  <h4 className="text-lg font-black text-secondary mb-1">{doc.name}</h4>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{doc.specialty}</p>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.exp} XP</span>
                    <button className="text-xs font-black text-secondary uppercase tracking-[0.2em] border-b-2 border-primary hover:text-primary transition-colors pb-0.5">
                      Consult Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
