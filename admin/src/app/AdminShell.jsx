'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import TopBar  from './components/TopBar';

export default function AdminShell({ children }) {
  const { user, loading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  // null = not yet loaded from localStorage (avoids flash)
  const [dark, setDark] = useState(null);

  // On mount: read saved dark preference, default = light (false)
  useEffect(() => {
    const saved = localStorage.getItem('admin-dark');
    const isDark = saved === 'true';
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev;
      localStorage.setItem('admin-dark', String(next));
      return next;
    });
  };

  // Auth guard
  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.replace('/login');
    }
  }, [loading, user, pathname, router]);

  // Login page — no shell
  if (pathname === '/login') {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    );
  }

  if (loading || dark === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  /*
   * DARK MODE STRATEGY for Tailwind 4:
   *
   *   globals.css defines:
   *     @variant dark (&:where(.dark, .dark *));
   *
   *   This means: any element that is INSIDE a .dark ancestor gets
   *   dark: styles applied. We put class="dark" on the root wrapper
   *   div when dark=true. No need to touch <html>.
   *
   *   The sidebar (navy) and topbar stay the same - they're excluded
   *   from dark mode styling by design per your requirement.
   *   The main content area (right side) picks up dark: classes because
   *   it's inside the .dark wrapper.
   */

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { fontSize: '13px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' },
          success: { iconTheme: { primary: '#2E8B57', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#C0392B', secondary: '#fff' } },
        }}
      />

      {/* Root wrapper - .dark class activates all dark: Tailwind utilities */}
      <div className={`flex h-screen overflow-hidden${dark ? ' dark' : ''}`}>

        {/* Navy sidebar - always dark, unaffected by toggle */}
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

        {/* Content area - changes with dark mode */}
        <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-200
          bg-gray-50 dark:bg-gray-950
          ${collapsed ? 'ml-16' : 'ml-60'}`}>

          {/* Top bar - white in light, dark gray in dark */}
          <TopBar dark={dark} onToggleDark={toggleDark} />

          {/* Page content - scrolls independently */}
          <main className="flex-1 overflow-y-auto p-5 bg-gray-50 dark:bg-gray-950">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
