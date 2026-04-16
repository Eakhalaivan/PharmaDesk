import { BarChart3, TrendingUp, Activity, FileText } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">Performance Reports</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
          Analytical overview of pharmacy operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-xl flex items-center justify-center flex-col min-h-[300px]">
           <BarChart3 className="w-16 h-16 text-primary mb-6" />
           <h2 className="text-xl font-black text-secondary">Sales Growth Chart</h2>
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Data visualization module initializing...</p>
        </div>
        <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-xl flex items-center justify-center flex-col min-h-[300px]">
           <TrendingUp className="w-16 h-16 text-emerald-500 mb-6" />
           <h2 className="text-xl font-black text-secondary">Revenue Projections</h2>
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Predictive modeling module initializing...</p>
        </div>
        <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-xl flex items-center justify-center flex-col min-h-[300px] md:col-span-2">
           <Activity className="w-16 h-16 text-secondary mb-6" />
           <h2 className="text-xl font-black text-secondary">Staff Operational Efficiency</h2>
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Connecting to workforce telemetry...</p>
        </div>
      </div>
    </div>
  );
}
