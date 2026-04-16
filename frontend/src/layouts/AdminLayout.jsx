import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  LayoutDashboard, Package, ShoppingBag, Users,
  PlusCircle, RefreshCcw, FileText, Trash2, 
  Settings, HelpCircle, ShieldCheck, ClipboardList, Activity, 
  FileSpreadsheet, UserPlus, Stethoscope, Factory, RotateCcw,
  Wallet, Percent, Users2, Receipt, Pill, Warehouse, History, 
  FileBarChart, UserCheck, Gauge, Store, Box, Undo2, Hourglass
} from 'lucide-react';

const adminMenu = [
  {
    title: 'Core Management',
    items: [
      { name: 'Dashboard', icon: Gauge, path: '/admin/dashboard' },
      { name: 'Medicine', icon: Pill, path: '/admin/medicines' },
      { name: 'Customer', icon: Users2, path: '/admin/customers' },
      { name: 'Invoice', icon: Receipt, path: '/admin/invoices' },
      { name: 'Manufacturer', icon: Store, path: '/admin/manufacturers' },
    ]
  },
  {
    title: 'Supply & Operations',
    items: [
      { name: 'Inventory', icon: Box, path: '/admin/medicines' },
      { name: 'Returns', icon: Undo2, path: '/admin/returns' },
      { name: 'Reports', icon: FileBarChart, path: '/admin/reports' },
    ]
  },
  {
    title: 'Financials & HR',
    items: [
      { name: 'Accounts', icon: Wallet, path: '/admin/accounts' },
      { name: 'Tax', icon: Percent, path: '/admin/tax' },
      { name: 'Staffs', icon: UserCheck, path: '/admin/staff' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ]
  }
];

export default function AdminLayout() {
  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar menuGroups={adminMenu} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto anime-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
