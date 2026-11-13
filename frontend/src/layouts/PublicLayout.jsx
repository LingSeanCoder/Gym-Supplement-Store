import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

/**
 * PublicLayout - Public page layout (Landing, Pricing, etc.)
 * Includes Navbar (logo, Login button) and Footer.
 */
export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-night text-ink">
      {/* Navbar */}
      <header className="border-b border-line bg-night sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#9aca42] flex items-center justify-center">
              <Shield className="w-5 h-5 text-night" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">FORM<span className="text-[#9aca42]">&amp;</span>FUEL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-[#9aca42]/10 text-[#9aca42]' : 'text-muted hover:text-white'}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-[#9aca42]/10 text-[#9aca42]' : 'text-muted hover:text-white'}`}
            >
              Pricing
            </NavLink>
            <a href="#about" className="px-3 py-2 rounded-lg transition text-muted hover:text-white">
              About Us
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg transition text-muted hover:text-white">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-[#3a4a3e] text-sm font-medium text-white transition hover:bg-[#3a4a3e]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-lg border border-[#9aca42] bg-[#9aca42] text-white font-bold transition hover:bg-[#7cac2c]"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-lg text-white hover:bg-[#3a4a3e]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 py-4 border-b border-[#3a4a3e]">
            <nav className="space-y-3">
              <Link to="/" className="block px-3 py-2 rounded-lg text-white bg-[#9aca42]/10">
                Home
              </Link>
              <Link to="/pricing" className="block px-3 py-2 rounded-lg text-white bg-[#9aca42]/10">
                Pricing
              </Link>
              <Link to="/login" className="block px-3 py-2 rounded-lg border border-[#3a4a3e] text-white">
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-lg border border-[#9aca42] bg-[#9aca42] text-white">
                Register
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3a4a3e] bg-[#18251f] mt-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-[#9aca42] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-night" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">FORM<span className="text-[#9aca42]">&amp;</span>FUEL</span>
              </div>
              <p className="text-sm text-muted">
                Modern gym with international standard equipment, energetic environment and dynamic community.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Products</h4>
              <ul className="space-y-3 text-sm text-muted">
                <li><Link to="/pricing" className="hover:text-[#9aca42] transition">Membership Plans</Link></li>
                <li><a href="#" className="hover:text-[#9aca42] transition">Personal Training</a></li>
                <li><a href="#" className="hover:text-[#9aca42] transition">Group Classes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-muted">
                <li><a href="#" className="hover:text-[#9aca42] transition">User Guide</a></li>
                <li><a href="#" className="hover:text-[#9aca42] transition">FAQ</a></li>
                <li><a href="#" className="hover:text-[#9aca42] transition">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#3a4a3e] text-white hover:bg-[#3a4a3e] transition">
                  <Shield size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#3a4a3e] text-white hover:bg-[#3a4a3e] transition">
                  <Shield size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#3a4a3e] text-white hover:bg-[#3a4a3e] transition">
                  <Shield size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#3a4a3e] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Form &amp; Fuel Gym. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-muted hover:text-white transition">Terms</Link>
              <Link to="#" className="text-muted hover:text-white transition">Privacy Policy</Link>
              <Link to="#" className="text-muted hover:text-white transition">Cookie</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
