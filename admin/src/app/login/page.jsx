'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.replace('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-navy to-navy-2 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl
        shadow-2xl border border-line dark:border-gray-800 p-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-navy flex items-center
            justify-center shadow-md">
            <GraduationCap size={28} className="text-gold" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-lg font-semibold text-navy dark:text-gray-100">
              Tilak Global School
            </h1>
            <p className="text-xs text-muted dark:text-gray-400">Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="admin@tilakglobalschool.in"
              className="w-full px-3 py-2 rounded-xl border border-line dark:border-gray-700
                bg-white dark:bg-gray-800 text-sm text-ink dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-navy/40 dark:focus:ring-blue-500/40
                placeholder:text-muted/50 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="********"
                className="w-full px-3 py-2 pr-10 rounded-xl border border-line dark:border-gray-700
                  bg-white dark:bg-gray-800 text-sm text-ink dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-navy/40 dark:focus:ring-blue-500/40
                  placeholder:text-muted/50 transition"
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted
                  hover:text-ink dark:hover:text-gray-300 transition-colors"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-danger bg-red-50 dark:bg-red-900/20
              border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-navy hover:bg-navy-2 text-white
              text-sm font-semibold transition-colors disabled:opacity-60
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

