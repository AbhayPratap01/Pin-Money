import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaChartBar,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaFolderOpen,
  FaUserCog,
  FaSlidersH,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function DashboardSidebar() {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTab = searchParams.get("tab") || "overview";

  const menuItems = [
    { id: "overview", name: "Dashboard", icon: <FaChartBar /> },
    { id: "applications", name: "My Applications", icon: <FaFileInvoiceDollar /> },
    { id: "emi", name: "EMI Schedule", icon: <FaCalendarAlt /> },
    { id: "documents", name: "Documents", icon: <FaFolderOpen /> },
    { id: "profile", name: "Profile", icon: <FaUserCog /> },
    { id: "settings", name: "Settings", icon: <FaSlidersH /> },
  ];

  const handleTabClick = (tabId) => {
    setSearchParams({ tab: tabId });
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <div>
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black shadow-lg shadow-emerald-600/20 text-sm">
            PM
          </div>
          <div>
            <h2 className="text-white text-base font-bold tracking-wide">PIN MONEY</h2>
            <p className="text-xs text-slate-400">Customer Dashboard</p>
          </div>
        </div>

        {user && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-xs text-slate-400">Welcome back,</p>
              <p className="text-sm font-bold text-slate-100 truncate">{user.name}</p>
            </div>
          </div>
        )}

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-slate-950 px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs">
            PM
          </div>
          <span className="text-white font-bold text-sm">Pin Money</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-slate-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 max-w-[85vw] bg-slate-950 p-5 flex flex-col justify-between overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 xl:w-80 bg-slate-950 border-r border-slate-800 text-slate-300 min-h-screen p-6 flex-col justify-between shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
}

export default DashboardSidebar;
