'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { adminApi }     from '@/lib/adminApi';
import { getUploadUrl } from '@/lib/uploadUrl';
import PageHeader    from '@/app/components/PageHeader';
import Badge         from '@/app/components/Badge';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Upload, Trash2, Pencil, X, ImageIcon } from 'lucide-react';

// Updated to match expanded categories from GalleryImage model
const CATEGORIES = [
  'Campus','Classrooms','Sports','Events','Activities',
  'Annual Day','Janmashtami','Independence Day',
  'Blood Donation Camp','Science Exhibition',
  'Art and Craft','Saraswati Puja','Teachers Day','Educational Visits',
];

function GalleryField({ label, name, form, setForm, type = 'text', opts }) {
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

export default function GalleryPage() {
  const [images,    setImages]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [catFilter, setCatFilter] = useState('all');

  // Upload modal state
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadFile,  setUploadFile]  = useState(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const uploadInputRef = useRef(null);

  // Edit modal state
  const [editModal,   setEditModal]   = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);
  const [replacePreview, setReplacePreview] = useState('');
  const replaceInputRef = useRef(null);

  const [form,    setForm]    = useState({ caption:'', altText:'', category:'Campus', albumName:'', order:0, status:'published' });
  const [saving,  setSaving]  = useState(false);
  const [deleteId,setDeleteId]= useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const q = catFilter !== 'all'
      ? `?category=${encodeURIComponent(catFilter)}&status=all&limit=100`
      : '?status=all&limit=100';
    try { const r = await adminApi.gallery(q); setImages(r.data.images); }
    catch { toast.error('Failed to load gallery'); }
    setLoading(false);
  }, [catFilter]);

  useEffect(() => { load(); }, [load]);

  // ── Upload ────────────────────────────────────────────────────────────────
  const openUpload = () => {
    setForm({ caption:'', altText:'', category:'Campus', albumName:'', order:images.length, status:'published' });
    setUploadFile(null); setUploadPreview('');
    setUploadModal(true);
  };

  const handleUploadFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!uploadFile) { toast.error('Please select an image'); return; }
    setSaving(true);
    const fd = new FormData();
    fd.append('image',     uploadFile);
    fd.append('caption',   form.caption);
    fd.append('altText',   form.altText);
    fd.append('category',  form.category);
    fd.append('albumName', form.albumName);
    fd.append('order',     form.order);
    fd.append('status',    form.status);
    try {
      await adminApi.uploadGallery(fd);
      toast.success('Photo uploaded to Cloudinary');
      setUploadModal(false); setUploadFile(null); load();
    } catch (err) { toast.error(err.message || 'Upload failed'); }
    setSaving(false);
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const openEdit = (img) => {
    setEditItem(img);
    setForm({
      caption:   img.caption   || '',
      altText:   img.altText   || '',
      category:  img.category,
      albumName: img.albumName || '',
      order:     img.order     ?? 0,
      status:    img.status,
    });
    setReplaceFile(null);
    setReplacePreview(img.imageUrl ? getUploadUrl(img.imageUrl) : '');
    setEditModal(true);
  };

  const handleReplaceFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplaceFile(file);
    setReplacePreview(URL.createObjectURL(file));
  };

  const handleEdit = async () => {
    setSaving(true);
    try {
      // Build FormData — include image only if replacing
      const fd = new FormData();
      fd.append('caption',   form.caption);
      fd.append('altText',   form.altText);
      fd.append('category',  form.category);
      fd.append('albumName', form.albumName);
      fd.append('order',     form.order);
      fd.append('status',    form.status);
      if (replaceFile) fd.append('image', replaceFile);

      await adminApi.updateGallery(editItem._id, fd);
      toast.success('Photo updated');
      setEditModal(false);
      load();
    } catch (err) { toast.error(err.message || 'Update failed'); }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try { await adminApi.deleteGallery(deleteId); toast.success('Photo deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  return (
    <div>
      <PageHeader title="Gallery" subtitle="Upload and manage school photos"
        actions={
          <button onClick={openUpload}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2">
            <Upload size={14}/> Upload Photo
          </button>
        }
      />

      {/* Category filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all',...CATEGORIES].map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap
              ${catFilter===c ? 'bg-navy text-white' : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky'}`}>
            {c}
          </button>
        ))}
      </div>

      {loading ? <LoadingPage /> : images.length === 0 ? <EmptyState message="No photos uploaded yet." /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img._id} className="relative group rounded-xl overflow-hidden border border-line dark:border-gray-700 shadow-sm">
              <img src={getUploadUrl(img.imageUrl)} alt={img.altText || img.caption}
                className="w-full aspect-video object-cover bg-sky dark:bg-gray-800" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors
                flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(img)}
                  className="p-2 rounded-full bg-white/90 text-navy hover:bg-white"><Pencil size={14}/></button>
                <button onClick={() => setDeleteId(img._id)}
                  className="p-2 rounded-full bg-white/90 text-danger hover:bg-white"><Trash2 size={14}/></button>
              </div>
              <div className="p-2">
                <p className="text-xs truncate text-ink dark:text-gray-200">{img.caption || 'No caption'}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant={img.status}>{img.status}</Badge>
                  <span className="text-xs text-muted truncate">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Upload Modal ── */}
      <Modal open={uploadModal} onClose={() => setUploadModal(false)} title="Upload Photo" size="md">
        <div className="space-y-3">
          {/* Image picker */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Image <span className="text-muted font-normal">(JPEG, PNG, WebP — max 10 MB)</span>
            </label>
            {uploadPreview ? (
              <div className="relative inline-block">
                <img src={uploadPreview} alt="Preview" className="h-28 rounded-xl object-cover border border-line" />
                <button onClick={() => { setUploadFile(null); setUploadPreview(''); if (uploadInputRef.current) uploadInputRef.current.value=''; }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-danger text-white flex items-center justify-center">
                  <X size={10}/>
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => uploadInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-line
                  dark:border-gray-700 text-xs text-muted hover:border-navy hover:text-navy transition-colors">
                <ImageIcon size={14}/> Choose image
              </button>
            )}
            <input ref={uploadInputRef} type="file" accept="image/jpeg,image/png,image/webp"
              onChange={handleUploadFileChange} className="hidden" />
          </div>
          <GalleryField label="Caption"   name="caption"   form={form} setForm={setForm} />
          <GalleryField label="Alt Text"  name="altText"   form={form} setForm={setForm} />
          <GalleryField label="Category"  name="category"  form={form} setForm={setForm} type="select" opts={CATEGORIES} />
          <GalleryField label="Album Name (optional)" name="albumName" form={form} setForm={setForm} />
          <GalleryField label="Status"    name="status"    form={form} setForm={setForm} type="select" opts={['published','draft']} />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setUploadModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleUpload} disabled={!uploadFile || saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Uploading...' : 'Upload to Cloudinary'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Edit Modal (now supports image replacement) ── */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Photo" size="md">
        <div className="space-y-3">
          {/* Current / replacement image */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Image <span className="text-muted font-normal">(upload a new file to replace current)</span>
            </label>
            <div className="flex items-start gap-3">
              {replacePreview && (
                <img src={replacePreview} alt="Current"
                  className="h-24 rounded-xl object-cover border border-line shrink-0" />
              )}
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => replaceInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-line
                    dark:border-gray-700 text-xs text-muted hover:border-navy hover:text-navy transition-colors">
                  <Upload size={12}/> {replaceFile ? 'Change selection' : 'Replace image'}
                </button>
                {replaceFile && (
                  <p className="text-xs text-success">New image selected: {replaceFile.name}</p>
                )}
              </div>
            </div>
            <input ref={replaceInputRef} type="file" accept="image/jpeg,image/png,image/webp"
              onChange={handleReplaceFileChange} className="hidden" />
          </div>
          <GalleryField label="Caption"   name="caption"   form={form} setForm={setForm} />
          <GalleryField label="Alt Text"  name="altText"   form={form} setForm={setForm} />
          <GalleryField label="Category"  name="category"  form={form} setForm={setForm} type="select" opts={CATEGORIES} />
          <GalleryField label="Album Name" name="albumName" form={form} setForm={setForm} />
          <GalleryField label="Status"    name="status"    form={form} setForm={setForm} type="select" opts={['published','draft']} />
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
        title="Delete Photo" message="This photo will be permanently deleted from Cloudinary." />
    </div>
  );
}
