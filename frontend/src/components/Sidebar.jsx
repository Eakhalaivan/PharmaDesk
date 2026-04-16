import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  PlusCircle, RefreshCcw, FileText, Trash2, 
  Settings, HelpCircle, ShieldCheck, ChevronDown,
  ChevronRight, LogOut, Search, ClipboardList, Activity, Layout,
  FileSpreadsheet
} from 'lucide-react';

export default function Sidebar({ menuGroups = [] }) {
  const [openSubMenus, setOpenSubMenus] = useState([]);
  const { user } = useAuth();

  const toggleSubMenu = (name) => {
    setOpenSubMenus(prev => 
      prev.includes(name) 
        ? prev.filter(i => i !== name) 
        : [...prev, name]
    );
  };

  return (
    <div className="w-72 h-screen bg-slate-900 border-r border-white/5 flex flex-col sticky top-0 overflow-y-auto z-50">
      {/* Brand */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg font-black text-xl">
          P
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight flex items-center gap-1 text-white">
            PharmaDesk <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-md font-black">PRO</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-0.5">EST. 2026</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8">
        {menuGroups.map(group => (
          <div key={group.title}>
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map(item => (
                <div key={item.name}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          openSubMenus.includes(item.name) ? 'text-emerald-500 bg-emerald-500/5' : 'text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </div>
                        {openSubMenus.includes(item.name) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-slate-600" />}
                      </button>
                      
                      {openSubMenus.includes(item.name) && (
                        <div className="ml-9 mt-1 space-y-1 mb-2">
                          {item.subItems.map(sub => (
                            <NavLink
                              key={sub.name}
                              to={sub.path}
                              className={({ isActive }) => 
                                `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                  isActive ? 'text-emerald-500 font-bold' : 'text-slate-500 hover:text-emerald-500'
                                }`
                              }
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          isActive ? 'text-emerald-500 bg-emerald-500/5 shadow-sm' : 'text-slate-400 hover:bg-white/5'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">© 2026 DeepMind Corp.</p>
      </div>
    </div>
  );
}
