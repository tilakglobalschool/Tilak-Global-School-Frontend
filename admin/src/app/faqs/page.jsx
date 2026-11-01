'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader    from '@/app/components/PageHeader';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import Badge         from '@/app/components/Badge';
import { LoadingPage } from '@/app/components/Spinner';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';

export default function FAQsPage() {
  const [faqs,    setFaqs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId,setDeleteId]= useState(null);
  const [form,    setForm]    = useState({ question:'', answer:'', isActive:true, order:0 });
  const [saving,  setSaving]  = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await adminApi.faqs(); setFaqs(r.data.faqs); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ question:'', answer:'', isActive:true, order: faqs.length });
    setModal(true);
  };

  const openEdit = (faq) => {
    setEditing(faq);
    setForm({ question: faq.question, answer: faq.answer, isActive: faq.isActive, order: faq.order });
    setModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) await adminApi.updateFaq(editing._id, form);
      else          await adminApi.createFaq(form);
      toast.success(editing ? 'FAQ updated' : 'FAQ created');
      setModal(false); load();
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    await adminApi.deleteFaq(deleteId).catch(e => toast.error(e.message));
    toast.success('FAQ deleted');
    setDeleteId(null); load();
  };

  return (
    <div>
      <PageHeader
        title="FAQs"
        subtitle="Manage frequently asked questions shown on the Admissions page"
        actions={
          <button onClick={openCreate}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white
              text-xs font-semibold hover:bg-navy-2 transition-colors">
            <Plus size={14} /> Add FAQ
          </button>
        }
      />

      {loading ? <LoadingPage /> : faqs.length === 0 ? (
        <EmptyState message="No FAQs yet." action={
          <button onClick={openCreate} className="text-xs text-navy underline">Add one</button>
        } />
      ) : (
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq._id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-line
                dark:border-gray-800 px-4 py-3 flex items-start gap-3 shadow-sm">
              <GripVertical size={16} className="text-muted mt-1 shrink-0 cursor-grab" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink dark:text-gray-100">{faq.question}</p>
                <p className="text-xs text-muted dark:text-gray-400 mt-0.5 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={faq.isActive ? 'active' : 'inactive'}>
                  {faq.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <button onClick={() => openEdit(faq)} className="p-1 rounded text-muted hover:text-navy transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setDeleteId(faq._id)} className="p-1 rounded text-muted hover:text-danger transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit FAQ' : 'New FAQ'} size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Question</label>
            <input value={form.question} onChange={e => setForm(f => ({...f, question: e.target.value}))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-navy/30
                text-ink dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Answer</label>
            <textarea value={form.answer} onChange={e => setForm(f => ({...f, answer: e.target.value}))}
              rows={4}
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
                bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-navy/30
                text-ink dark:text-gray-100 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="faqActive" checked={form.isActive}
              onChange={e => setForm(f => ({...f, isActive: e.target.checked}))}
              className="w-4 h-4 accent-navy" />
            <label htmlFor="faqActive" className="text-xs text-ink dark:text-gray-300">Active (visible on website)</label>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setModal(false)}
              className="flex-1 py-2 rounded-xl border border-line dark:border-gray-700 text-xs">Cancel</button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium
                hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message="This FAQ will be permanently deleted."
      />
    </div>
  );
}

