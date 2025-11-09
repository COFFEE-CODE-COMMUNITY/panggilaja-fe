import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation()

  let style = ''
  if(location.pathname.includes('manage-profile')){
    style = 'p-0'
  }
  return (
    <div className='flex relative'>
      <SidebarDashboard/>
      <BottombarDashboard/>
      <main className={`md:ml-[280px] flex-1`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
