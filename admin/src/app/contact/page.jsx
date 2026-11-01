'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader    from '@/app/components/PageHeader';
import Badge         from '@/app/components/Badge';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Eye, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['all','unread','read','replied'];

export default function ContactPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [counts,    setCounts]    = useState({});
  const [meta,      setMeta]      = useState({});
  const [loading,   setLoading]   = useState(true);
  const [status,    setStatus]    = useState('all');
  const [page,      setPage]      = useState(1);
  const [detail,    setDetail]    = useState(null);
  const [deleteId,  setDeleteId]  = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ page, limit: 20, ...(status !== 'all' && { status }) }).toString();
    try {
      const r = await adminApi.contacts(`?${q}`);
      setEnquiries(r.data.enquiries); setCounts(r.data.counts); setMeta(r.meta);
    } catch (err) { toast.error('Failed to load enquiries'); }
    setLoading(false);
  }, [page, status]);

  useEffect(() => { load(); }, [load]);

  const openDetail = async (id) => {
    try { const r = await adminApi.contactItem(id); setDetail(r.data.enquiry); load(); }
    catch (err) { toast.error('Could not load enquiry'); }
  };

  const markStatus = async (id, s) => {
    try { await adminApi.updateContactStatus(id, s); toast.success(`Marked as ${s}`); }
    catch (err) { toast.error(err.message || 'Update failed'); }
    if (detail?._id === id) setDetail(d => ({ ...d, status: s }));
    load();
  };

  const handleDelete = async () => {
    try { await adminApi.deleteContact(deleteId); toast.success('Enquiry deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null);
    if (detail?._id === deleteId) setDetail(null);
    load();
  };

  return (
    <div>
      <PageHeader title="Contact Enquiries" subtitle="Messages submitted via the public contact form" />

      {/* Count badges */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[['all','All'], ['unread','Unread'], ['read','Read'], ['replied','Replied']].map(([s,l]) => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors
              ${status === s
                ? 'bg-navy text-white'
                : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky dark:hover:bg-gray-800'
              }`}>
            {l}{s === 'unread' && counts.unread > 0 ? ` (${counts.unread})` : ''}
          </button>
        ))}
      </div>

      {loading ? <LoadingPage /> : enquiries.length === 0 ? (
        <EmptyState message="No enquiries found." />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-line
          dark:border-gray-800 overflow-x-auto shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line dark:border-gray-800 bg-sky/50 dark:bg-gray-800/50">
                {['Name','Email','Subject','Status','Date',''].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 font-semibold text-muted dark:text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map(e => (
                <tr key={e._id}
                  onClick={() => openDetail(e._id)}
                  className={`border-b border-line/50 dark:border-gray-800/50
                    hover:bg-sky/20 dark:hover:bg-gray-800/30 cursor-pointer transition-colors
                    ${e.status === 'unread' ? 'font-semibold' : ''}`}>
                  <td className="px-3 py-2">{e.name}</td>
                  <td className="px-3 py-2 text-muted dark:text-gray-400">{e.email}</td>
                  <td className="px-3 py-2 text-muted dark:text-gray-400 max-w-xs truncate">{e.subject || '-'}</td>
                  <td className="px-3 py-2"><Badge variant={e.status}>{e.status}</Badge></td>
                  <td className="px-3 py-2 text-muted whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button onClick={() => openDetail(e._id)}
                        className="p-1 rounded text-muted hover:text-navy transition-colors"><Eye size={13} /></button>
                      <button onClick={() => setDeleteId(e._id)}
                        className="p-1 rounded text-muted hover:text-danger transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Enquiry Detail" size="md">
        {detail && (
          <div className="space-y-3 text-xs">
            <Row label="Name"    value={detail.name} />
            <Row label="Email"   value={detail.email} />
            <Row label="Phone"   value={detail.phone || '-'} />
            <Row label="Subject" value={detail.subject || '-'} />
            <Row label="Date"    value={new Date(detail.createdAt).toLocaleString()} />
            <div>
              <span className="text-muted dark:text-gray-400">Message</span>
              <p className="mt-1 p-3 bg-sky/50 dark:bg-gray-800 rounded-xl text-ink dark:text-gray-200">
                {detail.message}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => markStatus(detail._id, 'read')}
                disabled={detail.status === 'read'}
                className="flex-1 py-2 rounded-xl border border-line dark:border-gray-700 text-xs
                  hover:bg-sky dark:hover:bg-gray-800 disabled:opacity-40">
                Mark Read
              </button>
              <button onClick={() => markStatus(detail._id, 'replied')}
                disabled={detail.status === 'replied'}
                className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium
                  hover:bg-navy-2 disabled:opacity-40">
                Mark Replied
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Enquiry"
        message="This enquiry will be permanently deleted."
      />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted dark:text-gray-400 w-20 shrink-0">{label}</span>
      <span className="text-ink dark:text-gray-200">{value}</span>
    </div>
  );
}

