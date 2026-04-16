import { X, SlidersHorizontal, ChevronDown, CheckCircle2, Package, Search } from 'lucide-react';
import { categories } from '../data/products';

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showInStockOnly,
  setShowInStockOnly,
  isOpen,
  setIsOpen,
}) {
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' },
  ];

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('default');
    setShowInStockOnly(false);
  };

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-black text-secondary tracking-widest uppercase">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-[10px] text-primary hover:text-primary-dark font-black tracking-widest uppercase transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* Search Input inline */}
      <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
         <input 
           type="text" 
           placeholder="Quick find..." 
           disabled
           className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs focus:bg-white focus:border-primary/20 outline-none transition-all placeholder:text-gray-300"
         />
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/10'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            All Inventory
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/10'
                  : 'text-gray-500 hover:bg-gray-50 group'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${selectedCategory === cat.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{cat.icon}</span>
                {cat.name}
              </div>
              {selectedCategory === cat.id && <ChevronDown className="w-3 h-3 opacity-50 rotate-270" />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Availability</h4>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'Everything', icon: Package, color: 'text-blue-500' },
            { id: 'in', label: 'In Stock', icon: CheckCircle2, color: 'text-success' },
            { id: 'out', label: 'Out of Stock', icon: X, color: 'text-danger' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => {
                if (option.id === 'all') setShowInStockOnly(false);
                else setShowInStockOnly(option.id);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
                (option.id === 'all' && !showInStockOnly) || showInStockOnly === option.id
                  ? 'bg-primary/5 text-primary border-transparent'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <option.icon className={`w-4 h-4 ${option.color}`} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Sort Order</h4>
        <div className="relative group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none transition-transform group-hover:text-primary" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-8 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
          {content}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl p-8 overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-4">{content}</div>
          </div>
        </div>
      )}
    </>
  );
}
