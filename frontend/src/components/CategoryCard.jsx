import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/products?category=${category.id}`}
        className="group flex flex-col items-center gap-3"
      >
        <div className={`w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-3xl group-hover:border-primary group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}>
          <span className="group-hover:scale-110 transition-transform">{category.icon}</span>
        </div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-tight group-hover:text-primary transition-colors text-center px-1">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}
