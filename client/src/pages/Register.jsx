import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pan: "",
    aadhaar: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-4xl bg-slate-900/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-slate-400">Register now to explore loan options and manage your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Full Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Mobile Number
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="text"
              placeholder="Enter mobile number"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Email Address
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            PAN Number
            <input
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              type="text"
              placeholder="Enter PAN number"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Aadhaar Number
            <input
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              type="text"
              placeholder="Enter Aadhaar number"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Password
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
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
          </label>

          <div className="sm:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="w-full btn-primary py-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-slate-400 sm:col-span-2">
          Already registered?{' '}
          <Link className="text-emerald-400 hover:text-emerald-300" to="/login">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
