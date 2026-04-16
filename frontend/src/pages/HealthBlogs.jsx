import { motion } from 'framer-motion';
import { BookOpen, Clock, User, ChevronRight, Tag, Share2, Heart, Search } from 'lucide-react';

const featuredPost = {
  title: "10 Superfoods for a Healthy Heart in 2026",
  excerpt: "Discover the latest research on nutritional powerhouses that can transform your cardiovascular health...",
  category: "Nutrition",
  author: "Dr. Elena Smith",
  time: "8 min read",
  date: "April 08, 2026",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&fit=crop"
};

const posts = [
  {
    title: "Understanding Mental Wellness in the Digital Age",
    category: "Mental Health",
    author: "James Wilson",
    time: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop"
  },
  {
    title: "The Ultimate Guide to Seasonal Allergies",
    category: "Health Tips",
    author: "Dr. Sarah Lee",
    time: "10 min read",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&fit=crop"
  },
  {
    title: "How Digital Consultations are Changing Healthcare",
    category: "Technology",
    author: "Tech Desk",
    time: "4 min read",
    image: "https://images.unsplash.com/photo-1576091160550-217359f49fdb?w=800&fit=crop"
  }
];

export default function HealthBlogs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Search & Header */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-primary mb-6"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">The Health Hub</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-7xl font-black text-secondary leading-[0.9] tracking-tighter"
            >
              KNOWLEDGE IS THE <br />
              <span className="text-primary italic">BEST MEDICINE.</span>
            </motion.h1>
          </div>
          <div className="w-full lg:w-96 relative">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative bg-gray-900 rounded-[3rem] overflow-hidden mb-24 cursor-pointer"
        >
          <div className="aspect-[21/9] lg:aspect-[3/1]">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5" /> {featuredPost.time}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
              {featuredPost.title}
            </h2>
            <p className="text-white/60 text-lg max-w-xl mb-10 line-clamp-2">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">ES</div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">{featuredPost.author}</p>
                  <p className="text-[10px] text-white/40">{featuredPost.date}</p>
                </div>
              </div>
              <button className="bg-white text-secondary w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-8 mb-12 no-scrollbar">
          {["All Posts", "Nutrition", "Mental Health", "Fitness", "Chronic Care", "Medicine Guide"].map((cat, i) => (
            <button 
              key={cat}
              className={`whitespace-nowrap px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                i === 0 ? 'bg-secondary text-white shadow-xl shadow-secondary/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.article 
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-red-500 transition-all border border-white/20">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{post.category}</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.time}</span>
              </div>
              <h3 className="text-xl font-black text-secondary leading-tight mb-6 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                    {post.author[0]}
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{post.author}</span>
                </div>
                <button className="text-gray-300 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-24 bg-gray-50 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <Tag className="w-10 h-10 text-primary mx-auto mb-8" />
            <h2 className="text-3xl lg:text-5xl font-black text-secondary mb-6 tracking-tighter">NEVER MISS A HEALTH UPDATE.</h2>
            <p className="text-gray-400 font-medium mb-12">Get expert health tips and latest medical research delivered to your inbox every week.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white border border-gray-100 rounded-2xl px-8 py-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
