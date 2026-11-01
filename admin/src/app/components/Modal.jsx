'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Centered modal overlay — with scrollable body so content never hides behind viewport edge.
 * Props: open, onClose, title, children, footer, size ('sm'|'md'|'lg')
 *
 * `footer` — optional sticky footer node (e.g. Cancel/Save buttons).
 *   When provided, buttons stay fixed at the bottom regardless of scroll position.
 *   When omitted, children render as normal (backwards compatible).
 */
export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className={`relative w-full ${widths[size]} bg-white dark:bg-gray-900
        rounded-2xl shadow-2xl border border-line dark:border-gray-800 z-10
        flex flex-col max-h-[90vh]`}>

        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0
          border-b border-line dark:border-gray-800">
          <h2 className="text-base font-semibold text-ink dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:bg-sky dark:hover:bg-gray-800
              hover:text-ink transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1 min-h-0">{children}</div>

        {/* Sticky Footer (optional) */}
        {footer && (
          <div className="px-6 py-4 shrink-0 border-t border-line dark:border-gray-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
