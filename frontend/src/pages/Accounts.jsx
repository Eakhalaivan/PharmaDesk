import React from 'react';
import { Wallet, Search, TrendingUp, CreditCard } from 'lucide-react';

export default function Accounts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial Accounts</h1>
          <p className="text-slate-500 font-medium">Track operational expenses, revenue, and payroll.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: '₹4.2L', trend: '+12%', color: 'emerald' },
          { label: 'Expenses', value: '₹1.8L', trend: '-2%', color: 'rose' },
          { label: 'Net Profit', value: '₹2.4L', trend: '+15%', color: 'blue' },
          { label: 'Cash on Hand', value: '₹84K', trend: 'Stable', color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <span className={`text-[10px] font-bold text-${stat.color}-600 bg-${stat.color}-50 px-2 py-0.5 rounded-full`}>{stat.trend}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-20 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Accounting Ledger</h3>
        <p className="text-slate-500 max-w-xs mx-auto mt-2">The integrated accounting module will automatically sync with sales and procurement data.</p>
      </div>
    </div>
  );
}
