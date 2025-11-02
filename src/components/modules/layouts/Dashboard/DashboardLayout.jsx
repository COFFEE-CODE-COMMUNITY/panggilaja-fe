import { SidebarDashboard } from './SidebarDashboard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex flex-1 overflow-hidden">        
        <SidebarDashboard/>
        <main className="w-full">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
