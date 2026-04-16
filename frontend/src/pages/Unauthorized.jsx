import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="max-w-md w-full p-8 text-center bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Access Restricted</h1>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          Your credentials do not have the required permissions to access this administrative zone. 
          Please contact the system administrator for heighted access.
        </p>
        <Link 
          to="/login"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Safety
        </Link>
        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">
            Error Code: 403_PD_AUTH_INSUFFICIENT
          </p>
        </div>
      </div>
    </div>
  );
}
