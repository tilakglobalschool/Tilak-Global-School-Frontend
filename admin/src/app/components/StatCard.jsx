/**
 * Small dashboard stat card.
 * Props: label, value, icon, color ('navy'|'gold'|'success'|'warning'|'danger')
 */
const COLORS = {
  navy:    'bg-navy/10 text-navy dark:bg-navy/30 dark:text-blue-300',
  gold:    'bg-gold/10 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  danger:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function StatCard({ label, value, icon: Icon, color = 'navy' }) {
  const iconCls = COLORS[color] || COLORS.navy;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line
      dark:border-gray-800 p-4 flex items-center gap-3 shadow-sm">
      {Icon && (
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconCls}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs text-muted dark:text-gray-400 truncate">{label}</p>
        <p className="text-lg font-semibold text-ink dark:text-gray-100 leading-tight">
          {value ?? '-'}
        </p>
      </div>
    </div>
  );
}
