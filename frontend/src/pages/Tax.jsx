import React from 'react';
import { Percent, Search, Download, FileCheck } from 'lucide-react';

export default function Tax() {
  const handleDownload = async () => {
    try {
      const year = 2026;
      const month = 4;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/v1/tax-reports/download/monthly/${year}/${month}?format=pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to download tax report:', error);
      alert('Failed to generate tax report. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tax & Compliance</h1>
          <p className="text-slate-500 font-medium">Manage GST, VAT, and local pharmaceutical taxes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-none">GST Summary (Q2)</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Pending Filing</p>
            </div>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Input Tax Credit</span>
                <span className="font-bold text-emerald-600">₹24,500</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Output Tax Liability</span>
                <span className="font-bold text-rose-600">₹82,100</span>
             </div>
             <div className="pt-4 border-t border-slate-100 flex justify-between font-black text-slate-900">
                <span>Net Payable</span>
                <span>₹57,600</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Generate Report</h3>
              <p className="text-slate-400 text-sm font-medium mb-6">Download your automated tax reports for direct submission to the portal.</p>
              <button 
                onClick={handleDownload}
                className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                Download PDF Report
              </button>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        </div>
      </div>
    </div>
  );
}
