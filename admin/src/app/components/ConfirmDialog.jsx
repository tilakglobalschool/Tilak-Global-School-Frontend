'use client';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

/**
 * Centered yes/no confirmation dialog.
 * Props: open, onClose, onConfirm, title, message, danger (bool)
 */
export default function ConfirmDialog({
  open, onClose, onConfirm,
  title   = 'Are you sure?',
  message = 'This action cannot be undone.',
  danger  = true,
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        {danger && (
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20
            flex items-center justify-center">
            <AlertTriangle size={24} className="text-danger" />
          </div>
        )}
        <p className="text-sm text-muted dark:text-gray-400">{message}</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl border border-line dark:border-gray-700
              text-sm font-medium text-ink dark:text-gray-100
              hover:bg-sky dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium text-white
              transition-colors disabled:opacity-50
              ${danger
                ? 'bg-danger hover:bg-red-700'
                : 'bg-navy hover:bg-navy-2'
              }`}
          >
            {loading ? 'Processing...' : 'Yes, Confirm'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
