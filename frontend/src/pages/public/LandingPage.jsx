import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import { Shield, Clock, Flame, DollarSign } from 'lucide-react';

/**
 * LandingPage - Gym landing page with dark neon style.
 */
export default function LandingPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data fallback if API fails
  const MOCK_PLANS = [
    {
      id: 1,
      name: '1 Month Pass',
      duration_days: 30,
      price: 250000,
      status: 'active',
      features: ['Gym 24/7 access', 'Group classes', 'Body consultation'],
    },
    {
      id: 2,
      name: '3 Month Pass',
      duration_days: 90,
      price: 690000,
      status: 'active',
      features: ['Gym 24/7 access', 'Group classes', 'Body consultation', 'Body assessment'],
    },
    {
      id: 3,
      name: '6 Month Pass',
      duration_days: 180,
      price: 1290000,
      status: 'active',
      features: [
        'Gym 24/7 access',
        'Group classes',
        'Body consultation',
        'Body assessment',
        'Sports nutrition',
      ],
    },
    {
      id: 4,
      name: '1 Year Pass',
      duration_days: 365,
      price: 2390000,
      status: 'active',
      features: [
        'Gym 24/7 access',
        'Group classes',
        'Body consultation',
        'Body assessment',
        'Sports nutrition',
        'Personal locker',
      ],
    },
  ];

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axiosClient.get('/plans');
        if (response.data?.data && Array.isArray(response.data.data)) {
          setPlans(response.data.data);
        } else {
          setPlans(MOCK_PLANS);
        }
      } catch {
        setPlans(MOCK_PLANS);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);

  return (
    <div className="min-h-screen bg-night text-ink">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9aca42]/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9aca42]/10 border border-[#9aca42]/30 text-[#9aca42] text-xs font-semibold mb-6">
            🏆 Summer 2026 Opening
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Train smart,<br />
            <span className="text-[#9aca42]">feel the difference.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
            Modern gym with international standard equipment, professional trainers and energetic atmosphere. Register now to start your health journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#9aca42] rounded-xl text-[#9aca42] font-bold hover:bg-[#9aca42] hover:text-white transition-all duration-300">
              <Flame size={18} /> Get Started
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#9aca42] text-white font-bold hover:bg-[#7cac2c] transition-all duration-300">
              <DollarSign size={18} /> View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#18251f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Form &amp; Fuel?</h2>
            <p className="text-muted">Everything you need to reach your fitness goals.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Shield />} title="Absolute Safety" desc="Equipment maintained regularly, clean and spacious workout space." />
            <FeatureCard icon={<Clock />} title="Open 24/7" desc="Work out anytime, suitable for every busy schedule." />
            <FeatureCard icon={<Flame />} title="Professional Trainers" desc="Dedicated PT team guiding you toward personal goals." />
            <FeatureCard icon={<DollarSign />} title="Fair Pricing" desc="Flexible membership plans for every budget from beginner to advanced." />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <StatItem number="500+" label="Active Members" />
          <StatItem number="10" label="Trainers" />
          <StatItem number="24/7" label="Opening Hours" />
          <StatItem number="4" label="Flexible Plans" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, src }) {
  return (
    <div className="p-6 rounded-xl border border-[#3a4a3e] bg-[#22332b]/50 hover:border-[#9aca42]/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-[#9aca42]/10 flex items-center justify-center text-[#9aca42] mb-4">
        {icon ? React.cloneElement(icon, { size: 24 }) : <img src={src} alt={title} className="w-8 h-8" />}
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div>
      <div className="text-3xl font-bold text-[#9aca42] mb-1">{number}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}
