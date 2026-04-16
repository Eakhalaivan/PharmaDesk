import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <div className="absolute left-4 z-10">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search medicines, health products..."
        className="w-full pl-12 pr-28 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
      />
      <button
        type="submit"
        className="absolute right-1.5 h-[calc(100%-12px)] px-5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-primary-dark transition-all cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
