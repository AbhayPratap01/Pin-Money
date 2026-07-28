import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Loans", path: "/products" },
    { name: "CIBIL", path: "/cibil-score" },
    { name: "EMI Calculator", path: "/emi-calculator" },
    { name: "Reviews", path: "/reviews" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-600 text-white text-xl font-bold shadow-lg shadow-emerald-600/30">
              PM
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">PIN MONEY</h2>
              <p className="text-sm text-slate-400">Loans Made Simple</p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-xl border border-slate-700 bg-slate-900/90 p-3 text-slate-200 shadow-sm shadow-black/10"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? "text-emerald-400 font-semibold" : "text-slate-200 hover:text-emerald-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-2 text-slate-300">
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </div>
            {user ? (
              <>
                <span className="text-slate-200">Hi, {user.name.split(" ")[0]}</span>
                <Link
                  to="/dashboard"
                  className="btn-primary px-5 py-3"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-emerald-500 bg-slate-900 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-6 py-3"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-4 rounded-3xl border border-slate-700 bg-slate-950/95 p-5 shadow-2xl shadow-black/20 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm ${
                      isActive ? "bg-emerald-500/10 text-emerald-300 font-semibold" : "text-slate-200 hover:bg-slate-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full rounded-2xl border border-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;