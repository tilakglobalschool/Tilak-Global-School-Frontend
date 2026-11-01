'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import { useAuth } from './AuthContext';
import StatCard   from './components/StatCard';
import PageHeader from './components/PageHeader';
import Badge      from './components/Badge';
import { LoadingPage } from './components/Spinner';
import {
  Users, Clock, CheckCircle, Info,
  TrendingUp, BarChart2, Activity, Calendar,
} from 'lucide-react';

// Recharts - loaded client-side only
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip,
  LineChart, Line, Tooltip as LineTool, Legend as LineLegend,
} from 'recharts';

// -- Donut chart - status breakdown -----------------------------------------
const DONUT_COLORS = ['#D98A1F', '#2E8B57', '#C0392B', '#3E7BC4'];

function StatusDonut({ stats }) {
  const bs = stats?.byStatus ?? {};
  const data = [
    { name: 'Pending',      value: bs.pending       || 0 },
    { name: 'Approved',     value: bs.approved      || 0 },
    { name: 'Rejected',     value: bs.rejected      || 0 },
    { name: 'Info Req.',    value: bs.info_requested || 0 },
  ].filter(d => d.value > 0);

  const total = stats?.total || 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Users size={16} className="text-navy dark:text-blue-300" />
        <span className="text-xs font-semibold text-ink dark:text-gray-200">Enquiries by Status</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={45} outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip
                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                formatter={(v, n) => [v, n]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-ink dark:text-gray-100">{total}</span>
            <span className="text-xs text-muted dark:text-gray-400">Total</span>
          </div>
        </div>
        {/* Legend */}
        <ul className="space-y-1.5 flex-1">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                <span className="text-xs text-muted dark:text-gray-400">{d.name}</span>
              </div>
              <span className="text-xs font-semibold text-ink dark:text-gray-200">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -- Bar chart - enquiries by class -----------------------------------------
function ClassBarChart({ byClass = [] }) {
  // Only show classes with data, max 10
  const data = byClass
    .filter(d => d.count > 0)
    .slice(0, 12)
    .map(d => ({ name: d.class, count: d.count }));

  if (!data.length) return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 p-4 shadow-sm flex items-center justify-center h-52">
      <p className="text-xs text-muted dark:text-gray-400">No class data yet</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 size={16} className="text-navy dark:text-blue-300" />
        <span className="text-xs font-semibold text-ink dark:text-gray-200">
          Class-wise Enquiry Distribution
        </span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e9f2" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#5B6785' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#5B6785' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <BarTooltip
            contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
            formatter={v => [v, 'Enquiries']}
          />
          <Bar dataKey="count" fill="#0F2A5C" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// -- Line chart - 30-day trend -----------------------------------------------
function TrendLineChart({ trend = [] }) {
  // Show last 30 days, format date as "DD MMM"
  const data = trend.map(d => ({
    date:  new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    count: d.count,
  }));

  // Only label every 5th date to avoid clutter
  const tickIndices = new Set(data.map((_, i) => i).filter(i => i % 5 === 0));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-navy dark:text-blue-300" />
          <span className="text-xs font-semibold text-ink dark:text-gray-200">
            Enquiry Trend - Last 30 Days
          </span>
        </div>
        <span className="text-xs text-muted dark:text-gray-400">
          Total: {data.reduce((s, d) => s + d.count, 0)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e9f2" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#5B6785' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#5B6785' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <LineTool
            contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
            formatter={v => [v, 'Enquiries']}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0F2A5C"
            strokeWidth={2}
            dot={{ r: 3, fill: '#0F2A5C', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#C9A24A' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// -- Main dashboard ----------------------------------------------------------
export default function DashboardPage() {
  const { can } = useAuth();
  const [stats,    setStats]    = useState(null);
  const [trend,    setTrend]    = useState([]);
  const [byClass,  setByClass]  = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, t, bc, ac] = await Promise.all([
        adminApi.stats(),
        adminApi.trend(30),
        adminApi.byClass(),
        adminApi.activity(10),
      ]);
      setStats(s.data);
      setTrend(t.data.trend);
      setByClass(bc.data.byClass);
      setActivity(ac.data.activity);
    } catch (err) { toast.error('Failed to load dashboard data'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingPage />;

  const bs = stats?.byStatus ?? {};

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Welcome back - here's what's happening today."
      />

      {/* -- Row 1: Stat cards ------------------------------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Enquiries" value={stats?.total}       icon={Users}       color="navy" />
        <StatCard label="Pending"         value={bs.pending}         icon={Clock}       color="warning" />
        <StatCard label="Approved"        value={bs.approved}        icon={CheckCircle} color="success" />
        <StatCard label="Info Requested"  value={bs.info_requested}  icon={Info}        color="gold" />
      </div>

      {/* -- Row 2: Donut + Bar chart side by side ------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
        {/* Donut - 2/5 width */}
        <div className="lg:col-span-2">
          <StatusDonut stats={stats} />
        </div>
        {/* Bar - 3/5 width */}
        <div className="lg:col-span-3">
          <ClassBarChart byClass={byClass} />
        </div>
      </div>

      {/* -- Row 3: Line chart - full width ------------------------------ */}
      <div className="mb-5">
        <TrendLineChart trend={trend} />
      </div>

      {/* -- Row 4: Quick stats ------------------------------------------ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Today"        value={stats?.today}                  icon={Calendar}   color="navy" />
        <StatCard label="This Month"   value={stats?.thisMonth}              icon={TrendingUp}  color="gold" />
        <StatCard label="Enquiries"    value={stats?.bySource?.enquiries}    icon={Users}      color="navy" />
        <StatCard label="Applications" value={stats?.bySource?.applications} icon={CheckCircle} color="success" />
      </div>

      {/* -- Row 5: Recent activity -------------------------------------- */}
      <div className="bg-white dark:bg-gray-900 rounded-xl
        border border-line dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3
          border-b border-line dark:border-gray-800">
          <Activity size={16} className="text-navy dark:text-blue-300" />
          <span className="text-xs font-semibold text-ink dark:text-gray-200">Recent Activity</span>
        </div>
        {activity.length === 0 ? (
          <p className="text-xs text-muted dark:text-gray-400 px-4 py-6 text-center">
            No activity yet.
          </p>
        ) : (
          <ul>
            {activity.map((log) => (
              <li key={log._id}
                className="flex items-start gap-3 px-4 py-2.5
                  border-b border-line/50 dark:border-gray-800/50 last:border-0">
                <div className="w-6 h-6 rounded-full bg-navy/10 dark:bg-navy/30
                  flex items-center justify-center shrink-0 mt-0.5">
                  <Activity size={12} className="text-navy dark:text-blue-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink dark:text-gray-200 truncate">
                    <span className="font-medium">{log.adminName}</span>
                    {' '}{log.action.replace(/_/g, ' ')} in {log.module}
                  </p>
                  {log.detail && (
                    <p className="text-xs text-muted dark:text-gray-500 truncate">{log.detail}</p>
                  )}
                </div>
                <time className="text-xs text-muted dark:text-gray-500 shrink-0">
                  {new Date(log.createdAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
