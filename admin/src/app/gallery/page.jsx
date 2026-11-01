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
import { Upload, Trash2, Pencil } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploadUrl';

const CATEGORIES = ['Campus','Classrooms','Sports','Events','Activities'];

// ── GalleryField is at MODULE SCOPE — stable identity across parent re-renders ──
// Previously defined as `const FI = ...` INSIDE GalleryPage → caused remount + focus loss.
function GalleryField({ label, name, form, setForm, type = 'text', opts }) {
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

export default function GalleryPage() {
  const [images,  setImages]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('all');
  const [uploadModal, setUploadModal] = useState(false);
  const [editModal,   setEditModal]   = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form, setForm] = useState({ caption:'', category:'Campus', order:0, status:'published' });
  const [file, setFile]   = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const q = catFilter !== 'all' ? `?category=${catFilter}&status=all&limit=50` : '?status=all&limit=50';
    try { const r = await adminApi.gallery(q); setImages(r.data.images); }
    catch (err) { toast.error('Failed to load gallery'); }
    setLoading(false);
  }, [catFilter]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async () => {
    if (!file) return;
    setSaving(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('caption',  form.caption);
    fd.append('category', form.category);
    fd.append('order',    form.order);
    fd.append('status',   form.status);
    try {
      await adminApi.uploadGallery(fd);
      toast.success('Photo uploaded successfully');
      setUploadModal(false); setFile(null); load();
    } catch (err) { toast.error(err.message || 'Upload failed'); }
    setSaving(false);
  };

  const openEdit = (img) => {
    setEditItem(img);
    setForm({ caption: img.caption, category: img.category, order: img.order, status: img.status });
    setEditModal(true);
  };

  const handleEdit = async () => {
    setSaving(true);
    try { await adminApi.updateGallery(editItem._id, form); toast.success('Photo updated'); setEditModal(false); load(); }
    catch (err) { toast.error(err.message || 'Update failed'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    try { await adminApi.deleteGallery(deleteId); toast.success('Photo deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  return (
    <div>
      <PageHeader title="Gallery" subtitle="Upload and manage school photos"
        actions={
          <button
            onClick={() => { setForm({ caption:'', category:'Campus', order:images.length, status:'published' }); setFile(null); setUploadModal(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2"
          >
            <Upload size={14}/> Upload Photo
          </button>
        }
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all',...CATEGORIES].map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors
              ${catFilter===c ? 'bg-navy text-white' : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky'}`}>
            {c}
          </button>
        ))}
      </div>

      {loading ? <LoadingPage /> : images.length === 0 ? <EmptyState message="No photos uploaded yet." /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img._id} className="relative group rounded-xl overflow-hidden border border-line dark:border-gray-700 shadow-sm">
              <img src={getUploadUrl(img.imageUrl)} alt={img.caption}
                className="w-full aspect-video object-cover bg-sky dark:bg-gray-800" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(img)} className="p-2 rounded-full bg-white/90 text-navy hover:bg-white"><Pencil size={14}/></button>
                <button onClick={() => setDeleteId(img._id)} className="p-2 rounded-full bg-white/90 text-danger hover:bg-white"><Trash2 size={14}/></button>
              </div>
              <div className="p-2">
                <p className="text-xs truncate text-ink dark:text-gray-200">{img.caption || 'No caption'}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant={img.status}>{img.status}</Badge>
                  <span className="text-xs text-muted">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload modal */}
      <Modal open={uploadModal} onClose={() => setUploadModal(false)} title="Upload Photo" size="sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Image file</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
              className="w-full text-xs text-ink dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3
                file:rounded-lg file:border-0 file:text-xs file:font-medium
                file:bg-navy file:text-white hover:file:bg-navy-2" />
          </div>
          <GalleryField label="Caption"  name="caption"  form={form} setForm={setForm} />
          <GalleryField label="Category" name="category" form={form} setForm={setForm} type="select" opts={CATEGORIES} />
          <GalleryField label="Status"   name="status"   form={form} setForm={setForm} type="select" opts={['published','draft']} />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setUploadModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleUpload} disabled={!file || saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Photo" size="sm">
        <div className="space-y-3">
          <GalleryField label="Caption"  name="caption"  form={form} setForm={setForm} />
          <GalleryField label="Category" name="category" form={form} setForm={setForm} type="select" opts={CATEGORIES} />
          <GalleryField label="Status"   name="status"   form={form} setForm={setForm} type="select" opts={['published','draft']} />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setEditModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleEdit} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Photo" message="This photo will be permanently deleted." />
    </div>
  );
}
