import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Clock, HeartPulse, Percent, Plus, Stethoscope, Microscope, Pill, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useInventory } from '../context/InventoryContext';
import { categories } from '../data/products';

export default function Home() {
  const { products } = useInventory();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  const mainServices = [
    {
      title: 'Buy Medicines',
      desc: 'Over 2 lakh products',
      icon: Pill,
      color: 'bg-orange-50',
      iconColor: 'text-primary',
      link: '/products'
    },
    {
      title: 'Lab Tests',
      desc: 'Home sample collection',
      icon: Microscope,
      color: 'bg-teal-50',
      iconColor: 'text-accent',
      link: '#'
    },
    {
      title: 'Consult Doctor',
      desc: 'Expert online advice',
      icon: Stethoscope,
      color: 'bg-blue-50',
      iconColor: 'text-secondary',
      link: '#'
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero-banner.png" 
            alt="Healthcare professionals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-black text-secondary leading-[1.1] mb-6">
                Your Health, <br />
                <span className="text-primary italic">Our Priority.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 font-medium">
                Get genuine medicines, expert consultations, and accurate lab tests delivered to your doorstep.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2 group"
                >
                  Order Medicines <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Service Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={service.link}
                className="block group p-6 rounded-3xl bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all border border-white"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-secondary">{service.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">{service.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-secondary uppercase tracking-wider">Shop by Category</h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-2 rounded-full" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-10">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Trust & Promo Strip */}
      <section className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">100% Genuine</h4>
                <p className="text-sm text-white/60">Sourced directly from manufacturers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Express Delivery</h4>
                <p className="text-sm text-white/60">Medicines delivered in 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Expert Support</h4>
                <p className="text-sm text-white/60">Speak with qualified pharmacists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 block">Curated for you</span>
            <h2 className="text-3xl font-black text-secondary">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-primary group"
          >
            VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
