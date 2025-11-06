import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex relative'>
      <SidebarDashboard/>
      <BottombarDashboard/>
      <main className="sm:ml-[280px] flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
