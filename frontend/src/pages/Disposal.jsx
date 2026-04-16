import { Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Disposal() {
  const disposals = [
    { id: 'LOG-001', name: 'Amoxicillin 500mg', batch: 'AMX202', quantity: 24, date: '2026-04-01', method: 'Incineration', status: 'Completed' },
    { id: 'LOG-002', name: 'Cough Syrup (Expired)', batch: 'CGS091', quantity: 8, date: '2026-04-05', method: 'Chemical Neutralization', status: 'Completed' },
    { id: 'LOG-003', name: 'Damaged Syringes', batch: 'SYR444', quantity: 150, date: '2026-04-08', method: 'Biohazard Bin', status: 'Pending Pickup' },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-secondary tracking-tight mb-2">Disposal Logs</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
          Biohazard and expired module tracking
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-100">
              <th className="px-8 py-6">LOG ID</th>
              <th className="px-8 py-6">ITEM / BATCH</th>
              <th className="px-8 py-6">DISPOSAL METHOD</th>
              <th className="px-8 py-6 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {disposals.map((log) => (
              <tr key={log.id} className="hover:bg-white/60 transition-all cursor-pointer">
                <td className="px-8 py-6">
                  <span className="text-sm font-black text-secondary">{log.id}</span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{log.date}</p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-secondary flex items-center gap-2"><Trash2 className="w-4 h-4 text-rose-500" /> {log.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Batch: {log.batch} • QTY: {log.quantity}</p>
                </td>
                <td className="px-8 py-6">
                   <span className="text-xs font-bold text-gray-600">{log.method}</span>
                </td>
                <td className="px-8 py-6 text-right">
                   <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1 ${
                     log.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                   }`}>
                     {log.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                     {log.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
