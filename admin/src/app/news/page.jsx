'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { adminApi }  from '@/lib/adminApi';
import { getUploadUrl } from '@/lib/uploadUrl';
import PageHeader    from '@/app/components/PageHeader';
import Badge         from '@/app/components/Badge';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, ImageIcon, X } from 'lucide-react';

const CATEGORIES = ['News', 'Event', 'Notice'];
const EMPTY_FORM = { title:'', category:'News', date:'', summary:'', body:'', status:'draft' };

// ── NewsField — stable module-scope component ────────────────────────────────
function NewsField({ label, name, form, setForm, type = 'text', opts }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">{label}</label>
      {type === 'select' ? (
        <select
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-navy/30"
        >
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={form[name]}
          rows={3}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      )}
    </div>
  );
}

export default function NewsPage() {
  const [posts,    setPosts]    = useState([]);
  const [meta,     setMeta]     = useState({});
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [imageFile,setImageFile]= useState(null);       // new: selected image file
  const [imagePreview, setImagePreview] = useState(''); // new: preview URL
  const [saving,   setSaving]   = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filter,   setFilter]   = useState({ status:'all', category:'all', page:1 });
  const fileInputRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({
      page: filter.page, limit: 10,
      ...(filter.status   !== 'all' && { status:   filter.status }),
      ...(filter.category !== 'all' && { category: filter.category }),
    }).toString();
    try {
      const r = await adminApi.news(`?${q}`);
      setPosts(r.data.posts); setMeta(r.meta);
    } catch { toast.error('Failed to load posts'); }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title:    p.title,
      category: p.category,
      date:     p.date?.slice(0,10) || '',
      summary:  p.summary  || '',
      body:     p.body     || '',
      status:   p.status,
    });
    // Show existing image as preview (Cloudinary or legacy)
    setImageFile(null);
    setImagePreview(p.imageUrl ? getUploadUrl(p.imageUrl) : '');
    setModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.date)          { toast.error('Date is required'); return; }

    setSaving(true);
    try {
      // Build FormData so image upload works via multipart
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      // Only append image if a new file was selected
      if (imageFile) fd.append('image', imageFile);

      if (editing) await adminApi.updateNews(editing._id, fd);
      else          await adminApi.createNews(fd);

      toast.success(editing ? 'Post updated' : 'Post created');
      setModal(false);
      load();
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    try { await adminApi.deleteNews(deleteId); toast.success('Post deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  const handlePublish   = async (id) => {
    try { await adminApi.publishNews(id);   toast.success('Post published');   load(); }
    catch (err) { toast.error(err.message || 'Publish failed'); }
  };
  const handleUnpublish = async (id) => {
    try { await adminApi.unpublishNews(id); toast.success('Post unpublished'); load(); }
    catch (err) { toast.error(err.message || 'Unpublish failed'); }
  };
  const handleFeatured  = async (id) => {
    try { await adminApi.setFeatured(id);   toast.success('Featured post set'); load(); }
    catch (err) { toast.error(err.message || 'Could not set featured'); }
  };

  return (
    <div>
      <PageHeader title="News & Events" subtitle="Manage posts, events and notices"
        actions={
          <button onClick={openCreate}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2">
            <Plus size={14}/> New Post
          </button>
        }
      />

      {/* ── Filters ── */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all','draft','published'].map(s => (
          <button key={s} onClick={() => setFilter(f=>({...f,status:s,page:1}))}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors
              ${filter.status===s ? 'bg-navy text-white' : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky dark:hover:bg-gray-800'}`}>
            {s}
          </button>
        ))}
        <select value={filter.category} onChange={e => setFilter(f=>({...f,category:e.target.value,page:1}))}
          className="px-3 py-1.5 rounded-xl text-xs border border-line dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100">
          <option value="all">All Categories</option>
          {CATEGORIES.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>

      {/* ── Post list ── */}
      {loading ? <LoadingPage /> : posts.length === 0 ? <EmptyState message="No posts found." /> : (
        <div className="space-y-2">
          {posts.map(p => (
            <div key={p._id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800
                px-4 py-3 flex items-center gap-3 shadow-sm">
              {/* Thumbnail */}
              {p.imageUrl ? (
                <img src={getUploadUrl(p.imageUrl)} alt={p.title}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <ImageIcon size={16} className="text-muted" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-ink dark:text-gray-100 truncate">{p.title}</p>
                  {p.isFeatured && <Star size={12} className="text-gold shrink-0" fill="currentColor"/>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={p.status}>{p.status}</Badge>
                  <span className="text-xs text-muted">{p.category}</span>
                  <span className="text-xs text-muted">{new Date(p.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {p.status === 'draft'
                  ? <button onClick={() => handlePublish(p._id)}   title="Publish"   className="p-1 rounded text-muted hover:text-success"><Eye    size={13}/></button>
                  : <button onClick={() => handleUnpublish(p._id)} title="Unpublish" className="p-1 rounded text-muted hover:text-warning"><EyeOff size={13}/></button>
                }
                {!p.isFeatured && (
                  <button onClick={() => handleFeatured(p._id)} title="Set featured"
                    className="p-1 rounded text-muted hover:text-gold"><Star size={13}/></button>
                )}
                <button onClick={() => openEdit(p)}              className="p-1 rounded text-muted hover:text-navy"><Pencil size={13}/></button>
                <button onClick={() => setDeleteId(p._id)}       className="p-1 rounded text-muted hover:text-danger"><Trash2 size={13}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      <Modal open={modal} onClose={() => setModal(false)}
        title={editing ? 'Edit Post' : 'New Post'} size="lg">
        <div className="space-y-3">
          <NewsField label="Title"    name="title"    form={form} setForm={setForm} />
          <div className="grid grid-cols-2 gap-3">
            <NewsField label="Category" name="category" form={form} setForm={setForm} type="select" opts={CATEGORIES} />
            <NewsField label="Date"     name="date"     form={form} setForm={setForm} type="date" />
          </div>
          <NewsField label="Summary (1-2 sentences)" name="summary" form={form} setForm={setForm} type="textarea" />
          <NewsField label="Full Content"             name="body"    form={form} setForm={setForm} type="textarea" />
          <NewsField label="Status" name="status" form={form} setForm={setForm} type="select" opts={['draft','published']} />

          {/* ── Featured Image (Cloudinary upload) ── */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Featured Image <span className="text-muted font-normal">(optional — JPEG, PNG, WebP)</span>
            </label>

            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview"
                  className="h-28 rounded-xl object-cover border border-line" />
                <button onClick={removeImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-danger text-white
                    flex items-center justify-center hover:bg-red-700">
                  <X size={10}/>
                </button>
              </div>
            ) : (
              <button type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-line
                  dark:border-gray-700 text-xs text-muted hover:border-navy hover:text-navy transition-colors">
                <ImageIcon size={14}/> Choose image
              </button>
            )}

            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange} className="hidden" />
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={() => setModal(false)}
              className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium
                hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Post" message="This post and its image will be permanently deleted." />
    </div>
  );
}
