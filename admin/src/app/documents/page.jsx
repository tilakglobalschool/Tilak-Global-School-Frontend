'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader    from '@/app/components/PageHeader';
import Badge         from '@/app/components/Badge';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Upload, Trash2, ExternalLink, Pencil } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploadUrl';

const CATEGORIES = ['Disclosure','Notice','Academic','Policy','Certificate','Form','Timetable','Syllabus','Calendar','Results'];
const PAGES      = ['academics','admissions','news','results','downloads'];

function DocField({ label, name, form, setForm, type = 'text', opts }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">{label}</label>
      {type === 'select' ? (
        <select value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100">
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100" />
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const [docs,     setDocs]     = useState([]);
  const [meta,     setMeta]     = useState({});
  const [loading,  setLoading]  = useState(true);

  // Upload modal
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadFile,  setUploadFile]  = useState(null);
  const [uploadForm,  setUploadForm]  = useState({ title:'', category:'Notice', page:'downloads', issueDate:'', status:'published' });

  // Edit modal
  const [editModal,   setEditModal]   = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [editForm,    setEditForm]    = useState({ title:'', category:'Notice', page:'downloads', issueDate:'', status:'published' });
  const [replaceFile, setReplaceFile] = useState(null);
  const replaceRef = useRef(null);

  const [saving,   setSaving]   = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filter,   setFilter]   = useState({ category:'all', docPage:'all', pg:1 });

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({
      status:'all', limit:20, page:filter.pg,
      ...(filter.category !== 'all' && { category: filter.category }),
      ...(filter.docPage  !== 'all' && { docPage:  filter.docPage  }),
    }).toString();
    try { const r = await adminApi.documents(`?${q}`); setDocs(r.data.documents); setMeta(r.meta); }
    catch { toast.error('Failed to load documents'); }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!uploadFile) return;
    setSaving(true);
    const fd = new FormData();
    fd.append('file', uploadFile);
    Object.entries(uploadForm).forEach(([k, v]) => v && fd.append(k, v));
    try {
      await adminApi.uploadDocument(fd);
      toast.success('Document uploaded to Cloudinary');
      setUploadModal(false); setUploadFile(null); load();
    } catch (err) { toast.error(err.message || 'Upload failed'); }
    setSaving(false);
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const openEdit = (doc) => {
    setEditItem(doc);
    setEditForm({
      title:     doc.title,
      category:  doc.category,
      page:      doc.page,
      issueDate: doc.issueDate ? doc.issueDate.slice(0, 10) : '',
      status:    doc.status,
    });
    setReplaceFile(null);
    setEditModal(true);
  };

  const handleEdit = async () => {
    setSaving(true);
    const fd = new FormData();
    Object.entries(editForm).forEach(([k, v]) => v && fd.append(k, v));
    if (replaceFile) fd.append('file', replaceFile);
    try {
      await adminApi.updateDocument(editItem._id, fd);
      toast.success('Document updated');
      setEditModal(false); load();
    } catch (err) { toast.error(err.message || 'Update failed'); }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try { await adminApi.deleteDocument(deleteId); toast.success('Document deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  return (
    <div>
      <PageHeader title="Documents" subtitle="Manage downloadable files, notices and disclosures"
        actions={
          <button
            onClick={() => { setUploadForm({ title:'',category:'Notice',page:'downloads',issueDate:'',status:'published' }); setUploadFile(null); setUploadModal(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2">
            <Upload size={14}/> Upload Document
          </button>
        }
      />

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <select value={filter.category} onChange={e => setFilter(f => ({ ...f, category: e.target.value, pg: 1 }))}
          className="px-3 py-1.5 rounded-xl text-xs border border-line dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filter.docPage} onChange={e => setFilter(f => ({ ...f, docPage: e.target.value, pg: 1 }))}
          className="px-3 py-1.5 rounded-xl text-xs border border-line dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          <option value="all">All Pages</option>
          {PAGES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {loading ? <LoadingPage /> : docs.length === 0 ? <EmptyState message="No documents yet." /> : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 overflow-x-auto shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line dark:border-gray-800 bg-sky/50 dark:bg-gray-800/50">
                {['Title','Category','Page','Type','Size','Date','Status',''].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 font-semibold text-muted dark:text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d._id} className="border-b border-line/50 dark:border-gray-800/50 hover:bg-sky/20 dark:hover:bg-gray-800/30">
                  <td className="px-3 py-2 font-medium max-w-[200px] truncate">{d.title}</td>
                  <td className="px-3 py-2 text-muted">{d.category}</td>
                  <td className="px-3 py-2 text-muted">{d.page}</td>
                  <td className="px-3 py-2"><span className="font-mono bg-sky dark:bg-gray-700 px-1">{d.fileType}</span></td>
                  <td className="px-3 py-2 text-muted">{d.fileSizeKb ? `${d.fileSizeKb}KB` : '—'}</td>
                  <td className="px-3 py-2 text-muted whitespace-nowrap">{d.issueDate ? new Date(d.issueDate).toLocaleDateString() : '—'}</td>
                  <td className="px-3 py-2"><Badge variant={d.status}>{d.status}</Badge></td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <a href={getUploadUrl(d.fileUrl)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded text-muted hover:text-navy" title="Open file">
                        <ExternalLink size={13}/>
                      </a>
                      <button onClick={() => openEdit(d)}
                        className="p-1 rounded text-muted hover:text-navy" title="Edit">
                        <Pencil size={13}/>
                      </button>
                      <button onClick={() => setDeleteId(d._id)}
                        className="p-1 rounded text-muted hover:text-danger" title="Delete">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      <Modal open={uploadModal} onClose={() => setUploadModal(false)} title="Upload Document" size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">File (PDF, DOC, DOCX, XLS, XLSX)</label>
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e => setUploadFile(e.target.files[0])}
              className="w-full text-xs text-ink dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3
                file:border-0 file:text-xs file:font-medium file:bg-navy file:text-white hover:file:bg-navy-2" />
          </div>
          <DocField label="Title"    name="title"    form={uploadForm} setForm={setUploadForm} />
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Category" name="category" form={uploadForm} setForm={setUploadForm} type="select" opts={CATEGORIES} />
            <DocField label="Page"     name="page"     form={uploadForm} setForm={setUploadForm} type="select" opts={PAGES} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Issue Date" name="issueDate" form={uploadForm} setForm={setUploadForm} type="date" />
            <DocField label="Status"     name="status"    form={uploadForm} setForm={setUploadForm} type="select" opts={['published','draft']} />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setUploadModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleUpload} disabled={!uploadFile || saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Uploading...' : 'Upload to Cloudinary'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Document" size="md">
        <div className="space-y-3">
          <DocField label="Title"    name="title"    form={editForm} setForm={setEditForm} />
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Category" name="category" form={editForm} setForm={setEditForm} type="select" opts={CATEGORIES} />
            <DocField label="Page"     name="page"     form={editForm} setForm={setEditForm} type="select" opts={PAGES} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Issue Date" name="issueDate" form={editForm} setForm={setEditForm} type="date" />
            <DocField label="Status"     name="status"    form={editForm} setForm={setEditForm} type="select" opts={['published','draft']} />
          </div>

          {/* Optional file replacement */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Replace File <span className="text-muted font-normal">(optional — leave blank to keep current)</span>
            </label>
            <input ref={replaceRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={e => setReplaceFile(e.target.files[0])}
              className="w-full text-xs text-ink dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3
                file:border-0 file:text-xs file:font-medium file:bg-sky file:text-navy hover:file:bg-sky-2" />
            {replaceFile && (
              <p className="text-xs text-success mt-1">New file selected: {replaceFile.name}</p>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={() => setEditModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleEdit} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Document" message="This document will be permanently deleted from Cloudinary." />
    </div>
  );
}
