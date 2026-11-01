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
import { Search, Eye, Trash2, CheckCircle, XCircle, Info } from 'lucide-react';

const STATUS_OPTIONS = ['all','pending','approved','rejected','info_requested'];
const CLASS_OPTIONS  = ['all','Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
const STATUS_LABELS  = { pending:'Pending', approved:'Approved', rejected:'Rejected', info_requested:'Info Requested' };

export default function AdmissionsPage() {
  const [apps,    setApps]    = useState([]);
  const [meta,    setMeta]    = useState({});
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [status,  setStatus]  = useState('all');
  const [cls,     setCls]     = useState('all');
  const [page,    setPage]    = useState(1);
  const [detail,   setDetail]  = useState(null);
  const [detailLoading, setDL] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusAction, setSA]         = useState({ id: null, status: '' });
  const [statusNote,   setSN]         = useState('');
  const [saving,       setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ page, limit: 20,
      ...(search && { search }),
      ...(status !== 'all' && { status }),
      ...(cls    !== 'all' && { class: cls }),
    }).toString();
    try { const r = await adminApi.applications(`?${q}`); setApps(r.data.applications); setMeta(r.meta); }
    catch (err) { toast.error(err.message || 'Failed to load applications'); }
    setLoading(false);
  }, [page, search, status, cls]);

  useEffect(() => { load(); }, [load]);

  const openDetail = async (id) => {
    setDL(true);
    setDetail({ _loading: true });
    try { const r = await adminApi.application(id); setDetail(r.data.application); }
    catch { toast.error('Could not load application detail'); setDetail(null); }
    setDL(false);
  };

  const openStatusModal = (e, id, newStatus) => {
    e.stopPropagation();
    setSA({ id, status: newStatus }); setSN(''); setStatusModal(true);
  };

  const handleStatusSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateAppStatus(statusAction.id, { status: statusAction.status, note: statusNote });
      toast.success(`Application ${statusAction.status}`);
      setStatusModal(false); setDetail(null); load();
    } catch (err) { toast.error(err.message || 'Update failed'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    try { await adminApi.deleteApp(deleteId); toast.success('Application deleted'); load(); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null);
  };

  return (
    <div>
      <PageHeader
        title="Admissions"
        subtitle={`${meta.total ?? '-'} total applications`}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" placeholder="Search name, ID..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900 text-ink dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/30" />
        </div>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          {STATUS_OPTIONS.map(o => <option key={o} value={o}>{STATUS_LABELS[o] || 'All Status'}</option>)}
        </select>
        <select value={cls} onChange={e => { setCls(e.target.value); setPage(1); }}
          className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          {CLASS_OPTIONS.map(o => <option key={o} value={o}>{o === 'all' ? 'All Classes' : `Class ${o}`}</option>)}
        </select>
      </div>

      {loading ? <LoadingPage /> : apps.length === 0 ? <EmptyState message="No applications found." /> : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-x-auto shadow-sm">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  {['App ID','Student','Class','Parent','Status','Date','Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-muted dark:text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.map(app => (
                  <tr key={app._id}
                    onClick={() => openDetail(app._id)}
                    className="border-b border-gray-100 dark:border-gray-800/60 last:border-0
                      hover:bg-blue-50/50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors">
                    <td className="px-4 py-3 font-mono text-navy dark:text-blue-300 font-medium">{app.applicationId}</td>
                    <td className="px-4 py-3 font-medium text-ink dark:text-gray-100">{app.studentName}</td>
                    <td className="px-4 py-3 text-muted dark:text-gray-400">{app.classApplying}</td>
                    <td className="px-4 py-3 text-muted dark:text-gray-400">{app.parentName}</td>
                    <td className="px-4 py-3"><Badge variant={app.status}>{STATUS_LABELS[app.status] || app.status}</Badge></td>
                    <td className="px-4 py-3 text-muted dark:text-gray-400 whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <Btn onClick={() => openDetail(app._id)} title="View"><Eye size={13}/></Btn>
                        <Btn onClick={e => openStatusModal(e, app._id, 'approved')} title="Approve" color="green"><CheckCircle size={13}/></Btn>
                        <Btn onClick={e => openStatusModal(e, app._id, 'rejected')} title="Reject"  color="red"><XCircle size={13}/></Btn>
                        <Btn onClick={e => openStatusModal(e, app._id, 'info_requested')} title="Request info" color="blue"><Info size={13}/></Btn>
                        <Btn onClick={e => { e.stopPropagation(); setDeleteId(app._id); }} title="Delete" color="red"><Trash2 size={13}/></Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} page={page} onChange={setPage} />
        </>
      )}

      {/* Detail modal - opens on row click */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Application Detail" size="lg">
        {detail?._loading ? <LoadingPage /> : detail ? (
          <div className="space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2.5">
              <Row label="Application ID" value={detail.applicationId} mono />
              <Row label="Status"><Badge variant={detail.status}>{STATUS_LABELS[detail.status]}</Badge></Row>
              <Row label="Student Name"    value={detail.studentName} />
              <Row label="Class Applying"  value={detail.classApplying} />
              <Row label="Date of Birth"   value={detail.dateOfBirth ? new Date(detail.dateOfBirth).toLocaleDateString() : '-'} />
              <Row label="Previous School" value={detail.previousSchool || '-'} />
              <Row label="Parent Name"  value={detail.parentName} />
              <Row label="Phone"        value={detail.phone} />
              <Row label="Email"        value={detail.email || '-'} />
              <Row label="Address"      value={detail.address || '-'} />
            </div>
            {detail.message    && <div className="pt-1"><Row label="Message"     value={detail.message} /></div>}
            {detail.statusNote && <div className="pt-1"><Row label="Status Note" value={detail.statusNote} /></div>}
            {detail.statusHistory?.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-muted dark:text-gray-400 mb-2">Status History</p>
                <div className="space-y-1.5">
                  {detail.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                      <Badge variant={h.status}>{h.status}</Badge>
                      <span className="flex-1">{h.note || '-'}</span>
                      <span>{new Date(h.changedAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => openStatusModal({ stopPropagation:()=>{} }, detail._id, 'approved')}
                className="flex-1 py-2 rounded-xl bg-green-600 text-white text-xs font-medium hover:bg-green-700">Approve</button>
              <button onClick={() => openStatusModal({ stopPropagation:()=>{} }, detail._id, 'info_requested')}
                className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2">Request Info</button>
              <button onClick={() => openStatusModal({ stopPropagation:()=>{} }, detail._id, 'rejected')}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-medium hover:bg-red-700">Reject</button>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Status update modal */}
      <Modal open={statusModal} onClose={() => setStatusModal(false)}
        title={`${statusAction.status === 'approved' ? 'Approve' : statusAction.status === 'rejected' ? 'Reject' : 'Request Info'}`} size="sm">
        <div className="space-y-3">
          <label className="block text-xs font-medium text-ink dark:text-gray-300">Note (optional)</label>
          <textarea value={statusNote} onChange={e => setSN(e.target.value)} rows={3}
            placeholder="Add a note..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-ink dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none" />
          <div className="flex gap-2">
            <button onClick={() => setStatusModal(false)}
              className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
            <button onClick={handleStatusSave} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Application" message="This will permanently delete the application." />
    </div>
  );
}

function Btn({ onClick, title, color, children }) {
  const cls = { green:'hover:text-green-600', red:'hover:text-red-600', blue:'hover:text-blue-500' }[color] || 'hover:text-navy dark:hover:text-blue-300';
  return <button onClick={onClick} title={title} className={`p-1 rounded text-muted transition-colors ${cls}`}>{children}</button>;
}
function Row({ label, value, mono, children }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted dark:text-gray-500 w-28 shrink-0 font-medium">{label}</span>
      <span className={`text-ink dark:text-gray-200 flex-1 min-w-0 ${mono ? 'font-mono' : ''}`}>{children ?? value ?? '-'}</span>
    </div>
  );
}
function Pagination({ meta, page, onChange }) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-3">
      <p className="text-xs text-muted dark:text-gray-400">
        {(page-1)*meta.limit+1}-{Math.min(page*meta.limit,meta.total)} of {meta.total}
      </p>
      <div className="flex gap-1">
        <button onClick={() => onChange(p=>p-1)} disabled={!meta.hasPrev}
          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">Prev</button>
        <button onClick={() => onChange(p=>p+1)} disabled={!meta.hasNext}
          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}

