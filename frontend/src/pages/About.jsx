import { motion } from 'framer-motion';
import { Heart, Shield, Users, Award, Truck, Clock } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Patient First',
      description: 'We prioritize your health and well-being above everything else, providing genuine medications you can trust.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product in our store goes through rigorous quality checks to ensure safety and efficacy.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team of licensed pharmacists is available 24/7 to answer your health-related questions.',
    },
    {
      icon: Award,
      title: 'Certified Products',
      description: 'We only stock FDA-approved and WHO-certified pharmaceutical products from reputable manufacturers.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered right to your doorstep within 24-48 hours across the country.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Our platform is always open. Order anytime, from anywhere — we never close.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products Available' },
    { number: '500+', label: 'Healthcare Brands' },
    { number: '99.8%', label: 'Satisfaction Rate' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
              <Heart className="w-4 h-4" />
              About MediCare
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Caring for Your Health,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Every Day
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Founded in 2020, MediCare is a leading online pharmacy committed to making healthcare accessible, affordable, and convenient for everyone. We believe everyone deserves quality healthcare products without the hassle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
            >
              <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            To revolutionize healthcare delivery by combining technology with compassion. We aim to ensure that every household has access to genuine, affordable medicines and health products — delivered swiftly and safely.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose MediCare</h2>
            <p className="text-gray-500">Our values drive everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
