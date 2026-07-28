import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-slate-100">
      <DashboardSidebar />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
