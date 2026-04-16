import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  LayoutDashboard, Package, ShoppingBag, 
  FileText, ClipboardList
} from 'lucide-react';

const employeeMenu = [
  {
    title: 'Daily Operations',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/employee/dashboard' },
      { name: 'New Sale / Billing', icon: ShoppingBag, path: '/employee/new-sale' },
      { name: 'Medicines List', icon: Package, path: '/employee/medicines' },
    ]
  },
  {
    title: 'Personal Records',
    items: [
      { name: 'My Sales History', icon: FileText, path: '/employee/my-sales' },
    ]
  }
];

export default function EmployeeLayout() {
  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar menuGroups={employeeMenu} />
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
