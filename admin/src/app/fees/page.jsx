'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader    from '@/app/components/PageHeader';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { LoadingPage } from '@/app/components/Spinner';
import { Save, Plus, Trash2 } from 'lucide-react';

const EMPTY_FORM = {
  classGroup: '', admissionFee: '', tuitionFeePerMonth: '',
  otherCharges: '', fullSessionTotal: '', notes: '', order: 0,
};

function NumberInput({ label, field, fee, onChange, placeholder = 'Not set' }) {
  return (
    <div>
      <label className="block text-xs text-muted dark:text-gray-400 mb-1">{label}</label>
      <input
        type="number" min="0"
        value={fee[field] ?? ''}
        onChange={e => onChange(fee._id, field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
          bg-white dark:bg-gray-800 text-ink dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-navy/30"
      />
    </div>
  );
}

export default function FeesPage() {
  const [fees,    setFees]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState({});
  const [saved,   setSaved]   = useState({});
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [creating,setCreating]= useState(false);
  const [deleteId,setDeleteId]= useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await adminApi.fees(); setFees(r.data.fees); }
    catch { toast.error('Failed to load fees'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleChange = (id, field, value) => {
    setFees(prev => prev.map(f =>
      f._id === id ? { ...f, [field]: value === '' ? null : (field === 'notes' ? value : Number(value)) } : f
    ));
  };

  const handleSave = async (fee) => {
    setSaving(p => ({ ...p, [fee._id]: true }));
    try {
      await adminApi.updateFee(fee._id, {
        admissionFee:       fee.admissionFee,
        tuitionFeePerMonth: fee.tuitionFeePerMonth,
        otherCharges:       fee.otherCharges,
        fullSessionTotal:   fee.fullSessionTotal,
        notes:              fee.notes,
      });
      toast.success(`Saved: ${fee.classGroup}`);
      setSaved(p => ({ ...p, [fee._id]: true }));
      setTimeout(() => setSaved(p => ({ ...p, [fee._id]: false })), 2000);
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(p => ({ ...p, [fee._id]: false }));
  };

  const handleCreate = async () => {
    if (!form.classGroup.trim()) { toast.error('Class group label is required'); return; }
    setCreating(true);
    try {
      await adminApi.createFee({
        classGroup:         form.classGroup.trim(),
        admissionFee:       form.admissionFee       !== '' ? Number(form.admissionFee)       : null,
        tuitionFeePerMonth: form.tuitionFeePerMonth !== '' ? Number(form.tuitionFeePerMonth) : null,
        otherCharges:       form.otherCharges       !== '' ? Number(form.otherCharges)       : null,
        fullSessionTotal:   form.fullSessionTotal   !== '' ? Number(form.fullSessionTotal)   : null,
        notes:              form.notes,
        order:              fees.length,
      });
      toast.success(`Fee row created: ${form.classGroup}`);
      setModal(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err) { toast.error(err.message || 'Create failed'); }
    setCreating(false);
  };

  const handleDelete = async () => {
    try { await adminApi.deleteFee(deleteId); toast.success('Fee row deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <PageHeader
        title="Fee Structure"
        subtitle="Set fee amounts for each class group. Leave blank if not confirmed."
        actions={
          <button onClick={() => { setForm(EMPTY_FORM); setModal(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2">
            <Plus size={14}/> Add Row
          </button>
        }
      />

      <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200
        dark:border-yellow-800 rounded-xl px-4 py-2 text-xs text-warning">
        Important: Never enter fee amounts that have not been confirmed by school management.
        Conflicts CF-04 and CF-05 are still pending — do not enter Class XI or transport fees until resolved.
      </div>

      <div className="space-y-3">
        {fees.length === 0 && (
          <div className="text-center py-16 text-muted text-sm">
            No fee rows yet. Click "Add Row" to create the first one.
          </div>
        )}

        {fees.map(fee => (
          <div key={fee._id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-navy dark:text-blue-300">
                Classes: {fee.classGroup}
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setDeleteId(fee._id)}
                  className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 size={13}/>
                </button>
                <button onClick={() => handleSave(fee)} disabled={saving[fee._id]}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy text-white
                    text-xs font-medium hover:bg-navy-2 disabled:opacity-50 transition-colors">
                  <Save size={12}/>
                  {saving[fee._id] ? 'Saving...' : saved[fee._id] ? '✓ Saved' : 'Save'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <NumberInput label="Admission Fee (₹)"        field="admissionFee"       fee={fee} onChange={handleChange} />
              <NumberInput label="Tuition Fee/Month (₹)"    field="tuitionFeePerMonth" fee={fee} onChange={handleChange} />
              <NumberInput label="Other Charges (₹)"        field="otherCharges"       fee={fee} onChange={handleChange} />
              <NumberInput label="Full Session Total (₹)"   field="fullSessionTotal"   fee={fee} onChange={handleChange} />
            </div>

            <div className="mt-3">
              <label className="block text-xs text-muted dark:text-gray-400 mb-1">Notes (optional)</label>
              <input type="text" value={fee.notes ?? ''}
                onChange={e => handleChange(fee._id, 'notes', e.target.value)}
                placeholder="e.g. includes lab fee, 3 terms per year"
                className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                  bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-navy/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Create modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Add Fee Row" size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Class Group Label *
            </label>
            <input type="text"
              value={form.classGroup}
              onChange={e => setForm(f => ({ ...f, classGroup: e.target.value }))}
              placeholder="e.g. Play Group – Prep, I – II, VI – VIII, IX"
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-navy/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Admission Fee (₹)', 'admissionFee'],
              ['Tuition Fee/Month (₹)', 'tuitionFeePerMonth'],
              ['Other Charges (₹)', 'otherCharges'],
              ['Full Session Total (₹)', 'fullSessionTotal'],
            ].map(([label, field]) => (
              <div key={field}>
                <label className="block text-xs text-muted dark:text-gray-400 mb-1">{label}</label>
                <input type="number" min="0" value={form[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder="Leave blank if unknown"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                    bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-navy/30" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs text-muted dark:text-gray-400 mb-1">Notes (optional)</label>
            <input type="text" value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="e.g. includes club fee, stream name"
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                bg-white dark:bg-gray-800 text-ink dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-navy/30" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleCreate} disabled={creating}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {creating ? 'Creating...' : 'Create Row'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Fee Row" message="This fee row will be permanently deleted." />
    </div>
  );
}
