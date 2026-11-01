'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader from '@/app/components/PageHeader';
import { LoadingPage } from '@/app/components/Spinner';
import { Save } from 'lucide-react';

export default function FeesPage() {
  const [fees,    setFees]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState({});
  const [saved,   setSaved]   = useState({});

  useEffect(() => {
    adminApi.fees().then(r => { setFees(r.data.fees); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleChange = (id, field, value) => {
    setFees(prev => prev.map(f => f._id === id ? { ...f, [field]: value === '' ? null : Number(value) } : f));
  };

  const handleSave = async (fee) => {
    setSaving(p => ({ ...p, [fee._id]: true }));
    try {
      await adminApi.updateFee(fee._id, {
        admissionFee: fee.admissionFee, tuitionFeePerTerm: fee.tuitionFeePerTerm,
        otherCharges: fee.otherCharges, notes: fee.notes,
      });
      toast.success(`Fee saved for ${fee.classGroup}`);
      setSaved(p => ({ ...p, [fee._id]: true }));
      setTimeout(() => setSaved(p => ({ ...p, [fee._id]: false })), 2000);
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(p => ({ ...p, [fee._id]: false }));
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <PageHeader
        title="Fee Structure"
        subtitle="Set fee amounts for each class group. Leave blank if not yet confirmed."
      />
      <p className="text-xs text-warning bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200
        dark:border-yellow-800 rounded-xl px-4 py-2 mb-4">
        Important: Never invent fee amounts. Only enter amounts confirmed by school management.
      </p>

      <div className="space-y-3">
        {fees.map(fee => (
          <div key={fee._id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-line
              dark:border-gray-800 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-navy dark:text-blue-300">
                Classes {fee.classGroup}
              </h3>
              <button onClick={() => handleSave(fee)}
                disabled={saving[fee._id]}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy text-white
                  text-xs font-medium hover:bg-navy-2 disabled:opacity-50 transition-colors">
                <Save size={12} />
                {saving[fee._id] ? 'Saving...' : saved[fee._id] ? 'Saved!' : 'Save'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                ['Admission Fee (₹)', 'admissionFee'],
                ['Tuition Fee/Term (₹)', 'tuitionFeePerTerm'],
                ['Other Charges (₹)', 'otherCharges'],
              ].map(([label, field]) => (
                <div key={field}>
                  <label className="block text-xs text-muted dark:text-gray-400 mb-1">{label}</label>
                  <input
                    type="number"
                    min="0"
                    value={fee[field] ?? ''}
                    onChange={e => handleChange(fee._id, field, e.target.value)}
                    placeholder="Not set"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                      bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-navy/30"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <label className="block text-xs text-muted dark:text-gray-400 mb-1">Notes</label>
              <input
                type="text"
                value={fee.notes ?? ''}
                onChange={e => setFees(prev => prev.map(f => f._id === fee._id ? {...f, notes: e.target.value} : f))}
                placeholder="Optional notes (e.g. includes lab fee)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                  bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

