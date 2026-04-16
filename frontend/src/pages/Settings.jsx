import { Bell, Shield, Wallet, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-12 flex items-center justify-between">
        <div>
           <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">System Settings</h1>
           <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
             Configure application preferences
           </p>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-3xl text-sm font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
           <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
        {/* Core Settings */}
        <div className="space-y-8">
           <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-xl">
              <h2 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center gap-3 mb-8">
                 <Shield className="w-5 h-5 text-primary" /> Application Security
              </h2>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold text-secondary text-sm">Two-Factor Authentication</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Require OTP on login</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                       <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold text-secondary text-sm">Auto-Lock Session</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Lock after 15 mins inactivity</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                       <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Notifications */}
        <div className="space-y-8">
           <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] p-10 shadow-xl">
              <h2 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center gap-3 mb-8">
                 <Bell className="w-5 h-5 text-amber-500" /> Alerts & Notifications
              </h2>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold text-secondary text-sm">Low Stock Alerts</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Email when inventory drops</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                       <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold text-secondary text-sm">Expiry Warnings</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Daily report on expiring batches</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                       <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold text-secondary text-sm">System Updates</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Maintenance notifications</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                       <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
