import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export default function Policies() {
  const policies = [
    { title: 'Data Privacy Agreement', icon: Lock, status: 'Active', updated: 'Jan 15, 2026' },
    { title: 'HIPAA Compliance Guidelines', icon: ShieldCheck, status: 'Active', updated: 'Mar 22, 2026' },
    { title: 'Staff Integrity Rules', icon: FileCheck, status: 'Enforced', updated: 'Apr 01, 2026' }
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">Global Policies</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
          Regulatory guidelines and compliance standards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         {policies.map((pol) => (
            <div key={pol.title} className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[32px] p-8 shadow-xl hover:-translate-y-2 transition-transform cursor-pointer">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                 <pol.icon className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-black text-secondary mb-2">{pol.title}</h3>
               <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest">
                 <span className="text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {pol.status}</span>
                 <span className="text-gray-400">{pol.updated}</span>
               </div>
            </div>
         ))}
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-10 border border-white/40 shadow-sm max-w-4xl">
         <h2 className="text-2xl font-black text-secondary mb-6">Terms of Enforcement</h2>
         <div className="space-y-4 text-sm font-bold text-gray-500 leading-relaxed">
            <p>All listed policies are strictly enforced across the PharmaDesk PRO infrastructure. Bypassing compliance measures will result in immediate termination of account access and a mandatory security audit.</p>
            <p>End-to-End Encryption (E2EE) covers all patient data, billing information, and vendor communications. System administrators do not have access to decipher protected data logs.</p>
            <p>Please refer to your branch manager for access to hardcopy records or exceptions to the standard operating protocols.</p>
         </div>
      </div>
    </div>
  );
}
