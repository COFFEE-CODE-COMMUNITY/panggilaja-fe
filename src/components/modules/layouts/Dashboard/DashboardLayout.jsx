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
      <main className={`sm:ml-[280px] flex-1 ${location.pathname.includes('manage-profile') ? 'p-0' : 'p-10'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
