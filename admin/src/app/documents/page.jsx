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
import { Upload, Trash2, ExternalLink } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploadUrl';

const CATEGORIES = ['Disclosure','Notice','Academic','Policy','Certificate','Form','Timetable','Syllabus','Calendar','Results'];
const PAGES      = ['academics','admissions','news','results','downloads'];

// ── DocField is at MODULE SCOPE — React never remounts it on parent re-render ──
// Previously this was defined as `const F = ...` INSIDE DocumentsPage, which
// caused React to see a new component type on every keystroke → instant focus loss.
function DocField({ label, name, form, setForm, type = 'text', opts }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">{label}</label>
      {type === 'select' ? (
        <select
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100"
        >
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100"
        />
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const [docs,    setDocs]    = useState([]);
  const [meta,    setMeta]    = useState({});
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [deleteId,setDeleteId]= useState(null);
  const [form,    setForm]    = useState({ title:'', category:'Notice', page:'downloads', issueDate:'', status:'published' });
  const [file,    setFile]    = useState(null);
  const [saving,  setSaving]  = useState(false);
  const [filter,  setFilter]  = useState({ category:'all', docPage:'all', pg:1 });

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({
      status:'all', limit:20, page:filter.pg,
      ...(filter.category!=='all' && { category:filter.category }),
      ...(filter.docPage  !=='all' && { docPage: filter.docPage  }),
    }).toString();
    try { const r = await adminApi.documents(`?${q}`); setDocs(r.data.documents); setMeta(r.meta); }
    catch (err) { toast.error('Failed to load documents'); }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async () => {
    if (!file) return;
    setSaving(true);
    const fd = new FormData();
    fd.append('file', file);
    Object.entries(form).forEach(([k,v]) => v && fd.append(k, v));
    try {
      await adminApi.uploadDocument(fd);
      toast.success('Document uploaded successfully');
      setModal(false); setFile(null); load();
    } catch (err) { toast.error(err.message || 'Upload failed'); }
    setSaving(false);
  };

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
            onClick={() => { setForm({ title:'',category:'Notice',page:'downloads',issueDate:'',status:'published' }); setFile(null); setModal(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2"
          >
            <Upload size={14}/> Upload Document
          </button>
        }
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        <select value={filter.category} onChange={e=>setFilter(f=>({...f,category:e.target.value,pg:1}))}
          className="px-3 py-1.5 rounded-xl text-xs border border-line dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          <option value="all">All Categories</option>
          {CATEGORIES.map(c=><option key={c}>{c}</option>)}
        </select>
        <select value={filter.docPage} onChange={e=>setFilter(f=>({...f,docPage:e.target.value,pg:1}))}
          className="px-3 py-1.5 rounded-xl text-xs border border-line dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          <option value="all">All Pages</option>
          {PAGES.map(p=><option key={p}>{p}</option>)}
        </select>
      </div>

      {loading ? <LoadingPage /> : docs.length === 0 ? <EmptyState message="No documents yet." /> : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 overflow-x-auto shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line dark:border-gray-800 bg-sky/50 dark:bg-gray-800/50">
                {['Title','Category','Page','Type','Size','Date','Status',''].map(h=>(
                  <th key={h} className="text-left px-3 py-2.5 font-semibold text-muted dark:text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map(d=>(
                <tr key={d._id} className="border-b border-line/50 dark:border-gray-800/50 hover:bg-sky/20 dark:hover:bg-gray-800/30">
                  <td className="px-3 py-2 font-medium max-w-[200px] truncate">{d.title}</td>
                  <td className="px-3 py-2 text-muted">{d.category}</td>
                  <td className="px-3 py-2 text-muted">{d.page}</td>
                  <td className="px-3 py-2"><span className="font-mono bg-sky dark:bg-gray-700 px-1 rounded">{d.fileType}</span></td>
                  <td className="px-3 py-2 text-muted">{d.fileSizeKb ? `${d.fileSizeKb}KB` : '-'}</td>
                  <td className="px-3 py-2 text-muted whitespace-nowrap">{d.issueDate ? new Date(d.issueDate).toLocaleDateString() : '-'}</td>
                  <td className="px-3 py-2"><Badge variant={d.status}>{d.status}</Badge></td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <a href={getUploadUrl(d.fileUrl)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded text-muted hover:text-navy"><ExternalLink size={13}/></a>
                      <button onClick={()=>setDeleteId(d._id)} className="p-1 rounded text-muted hover:text-danger"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title="Upload Document" size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">File</label>
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e=>setFile(e.target.files[0])}
              className="w-full text-xs text-ink dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3
                file:rounded-lg file:border-0 file:text-xs file:font-medium
                file:bg-navy file:text-white hover:file:bg-navy-2" />
          </div>
          {/* DocField receives form + setForm as props — stable identity, no remounting */}
          <DocField label="Title"     name="title"     form={form} setForm={setForm} />
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Category" name="category" form={form} setForm={setForm} type="select" opts={CATEGORIES} />
            <DocField label="Page"     name="page"     form={form} setForm={setForm} type="select" opts={PAGES} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DocField label="Issue Date" name="issueDate" form={form} setForm={setForm} type="date" />
            <DocField label="Status"     name="status"    form={form} setForm={setForm} type="select" opts={['published','draft']} />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={()=>setModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleUpload} disabled={!file||saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Document" message="This document will be permanently deleted." />
    </div>
  );
}
