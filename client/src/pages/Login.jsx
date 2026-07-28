import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserShield, FaUserTie, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login({ mobile, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-4xl bg-slate-900/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-400">Login to your Pin Money account and continue your application.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-3xl bg-slate-950/80 p-3 text-sm text-slate-300 shadow-inner shadow-black/20">
          <button className="rounded-3xl bg-emerald-600 py-3 font-medium text-white flex items-center justify-center gap-2">
            <FaUser /> Customer
          </button>
          <button className="rounded-3xl py-3 text-slate-400 flex items-center justify-center gap-2">
            <FaUserTie /> Employee
          </button>
          <button className="rounded-3xl py-3 text-slate-400 flex items-center justify-center gap-2">
            <FaUserShield /> Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-200">Mobile Number</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder="Enter mobile number"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-200">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 pr-12 text-white outline-none transition focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500" />
              Remember me
            </label>
            <button type="button" className="text-emerald-400 hover:text-emerald-300">
              Forgot Password?
            </button>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full btn-primary py-3 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Don&apos;t have an account?{' '}
          <Link className="text-emerald-400 hover:text-emerald-300" to="/register">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
