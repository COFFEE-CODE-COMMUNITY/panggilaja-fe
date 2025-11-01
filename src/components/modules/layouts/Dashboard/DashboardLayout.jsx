import { SidebarDashboard } from './SidebarDashboard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex flex-1 overflow-hidden">        
        <SidebarDashboard/>
        <main className="flex flex-1 lg:p-4 overflow-y-auto w-4/5 lg:absolute lg:right-0">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
