import { useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

/**
 * CheckInScreen - Staff page to check in a member.
 * POST /checkins with { user_id, method }.
 * GET /checkins/today to list today's check-ins.
 */
export default function CheckInScreen() {
  const [userId, setUserId] = useState('');
  const [method, setMethod] = useState('manual');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: 'success' | 'error', message: string }
  const [checkins, setCheckins] = useState([]);

  async function handleCheckIn(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await axiosClient.post('/checkins', {
        user_id: Number(userId),
        method,
      });
      setResult({
        type: 'success',
        message: response.data?.data?.message || 'Check-in successful.',
      });
    } catch (err) {
      setResult({
        type: 'error',
        message: err.message || 'Check-in failed.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchTodayCheckins() {
    try {
      const response = await axiosClient.get('/checkins/today');
      if (response.data?.data && Array.isArray(response.data.data)) {
        setCheckins(response.data.data);
      }
    } catch {
      setCheckins([]);
    }
  }

  // Load today's check-ins on mount
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    setLoaded(true);
    fetchTodayCheckins();
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Check-in</h1>
            <p className="text-sm text-muted">Record member gym entry.</p>
          </div>
        </div>

        {/* Check-in Form */}
        <div className="rounded-xl border border-[#e3e9e1] bg-white shadow-card p-6 mb-8">
          <form onSubmit={handleCheckIn} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-ink">User ID</label>
                <Input
                  type="number"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-ink">Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-[#3a4a3e] rounded-lg text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                >
                  <option value="manual">Manual</option>
                  <option value="qr">QR Code</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" loading={loading}>
                  <Clock size={18} /> Check-in
                </Button>
              </div>
            </div>
          </form>

          {/* Result */}
          {result && (
            <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
              result.type === 'success'
                ? 'bg-[#9aca42]/10 border border-[#9aca42]/30 text-[#9aca42]'
                : 'bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444]'
            }`}>
              {result.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span className="text-sm font-medium">{result.message}</span>
            </div>
          )}
        </div>

        {/* Today's Check-ins Table */}
        <div className="rounded-xl border border-[#e3e9e1] bg-white shadow-card">
          <div className="px-6 py-4 border-b border-[#e3e9e1] flex justify-between items-center">
            <h2 className="text-lg font-bold text-ink">Today's Check-ins</h2>
            <span className="text-sm font-medium text-muted">{checkins.length} check-ins</span>
          </div>
          <div className="overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e3e9e1] bg-[#f4f6f3]">
                  <th className="px-4 py-3 text-sm font-semibold text-muted">User ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-muted">Time</th>
                  <th className="px-4 py-3 text-sm font-semibold text-muted">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3e9e1]">
                {checkins.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted">No check-ins today.</td>
                  </tr>
                ) : (
                  checkins.map((c) => (
                    <tr key={c.checkin_id} className="hover:bg-[#f4f6f3]/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-ink">{c.user_id}</td>
                      <td className="px-4 py-3 text-sm text-muted">{c.checkin_time}</td>
                      <td className="px-4 py-3 text-sm text-muted">{c.method}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
