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
import { Upload, Trash2, Pencil, X, ImageIcon, Layout, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  'Campus','Classrooms','Sports','Events','Activities',
  'Annual Day','Janmashtami','Independence Day',
  'Blood Donation Camp','Science Exhibition',
  'Art and Craft','Saraswati Puja','Teachers Day','Educational Visits',
];

// ── Reusable field component (defined OUTSIDE to prevent focus loss) ──────────
function GalleryField({ label, name, form, setForm, type = 'text', opts }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">{label}</label>
      {type === 'select' ? (
        <select
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100"
        >
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100"
        />
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('media'); // 'media' | 'assignments'

  return (
    <div>
      <PageHeader
        title="Gallery & Website Images"
        subtitle="Upload photos and control which images appear on the website"
      />
      {/* Tab switcher */}
      <div className="flex gap-1 mb-6 border-b border-line dark:border-gray-700">
        {[
          { id: 'media',       icon: <ImageIcon size={14} />, label: 'Media Library' },
          { id: 'assignments', icon: <Layout    size={14} />, label: 'Website Image Assignments' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px
              ${activeTab === tab.id
                ? 'border-navy text-navy dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-muted hover:text-ink dark:hover:text-gray-200'}`}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'media'       && <MediaLibrary />}
      {activeTab === 'assignments' && <WebsiteAssignments />}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MEDIA LIBRARY TAB
// ═════════════════════════════════════════════════════════════════════════════
function MediaLibrary() {
  const [images,    setImages]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [catFilter, setCatFilter] = useState('all');

  const [uploadModal,    setUploadModal]    = useState(false);
  const [uploadFile,     setUploadFile]     = useState(null);
  const [uploadPreview,  setUploadPreview]  = useState('');
  const uploadInputRef = useRef(null);

  const [editModal,      setEditModal]      = useState(false);
  const [editItem,       setEditItem]       = useState(null);
  const [replaceFile,    setReplaceFile]    = useState(null);
  const [replacePreview, setReplacePreview] = useState('');
  const replaceInputRef = useRef(null);

  const [form,     setForm]    = useState({ caption:'', altText:'', category:'Campus', albumName:'', order:0, status:'published' });
  const [saving,   setSaving]  = useState(false);
  const [deleteId, setDeleteId]= useState(null);
  const [usageMap, setUsageMap]= useState({}); // mediaId → usages[]

  const load = useCallback(async () => {
    setLoading(true);
    const q = catFilter !== 'all'
      ? `?category=${encodeURIComponent(catFilter)}&status=all&limit=200`
      : '?status=all&limit=200';
    try {
      const r = await adminApi.gallery(q);
      setImages(r.data.images);
      // Load usages for all images
      const allAssignments = await adminApi.imageAssignments();
      const map = {};
      for (const a of (allAssignments.data?.assignments || [])) {
        const id = a.mediaId?._id || a.mediaId;
        if (!map[id]) map[id] = [];
        map[id].push(`${a.sectionKey}.${a.slotKey}`);
      }
      setUsageMap(map);
    } catch { toast.error('Failed to load gallery'); }
    setLoading(false);
  }, [catFilter]);

  useEffect(() => { load(); }, [load]);

  // ── Upload ────────────────────────────────────────────────────────────────
  const openUpload = () => {
    setForm({ caption:'', altText:'', category:'Campus', albumName:'', order:images.length, status:'published' });
    setUploadFile(null); setUploadPreview('');
    setUploadModal(true);
  };
  const handleUploadFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    if (!uploadFile) { toast.error('Please select an image'); return; }
    setSaving(true);
    const fd = new FormData();
    fd.append('image', uploadFile);
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
  const openEdit = img => {
    setEditItem(img);
    setForm({ caption:img.caption||'', altText:img.altText||'', category:img.category, albumName:img.albumName||'', order:img.order??0, status:img.status });
    setReplaceFile(null);
    setReplacePreview(img.imageUrl ? getUploadUrl(img.imageUrl) : '');
    setEditModal(true);
  };
  const handleReplaceFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplaceFile(file);
    setReplacePreview(URL.createObjectURL(file));
  };
  const handleEdit = async () => {
    setSaving(true);
    try {
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
      setEditModal(false); load();
    } catch (err) { toast.error(err.message || 'Update failed'); }
    setSaving(false);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    const usages = usageMap[deleteId] || [];
    if (usages.length > 0) {
      toast.error(`Remove website assignments first (used in: ${usages.join(', ')})`);
      setDeleteId(null); return;
    }
    try { await adminApi.deleteGallery(deleteId); toast.success('Photo deleted'); }
    catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {['all', ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap
                ${catFilter===c ? 'bg-navy text-white' : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={openUpload}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2 shrink-0">
          <Upload size={14}/> Upload Photo
        </button>
      </div>

      {loading ? <LoadingPage /> : images.length === 0 ? <EmptyState message="No photos uploaded yet." /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => {
            const usages = usageMap[img._id] || [];
            return (
              <div key={img._id} className="relative group rounded-xl overflow-hidden border border-line dark:border-gray-700 shadow-sm">
                <img src={getUploadUrl(img.imageUrl)} alt={img.altText || img.caption}
                  className="w-full aspect-video object-cover bg-sky dark:bg-gray-800" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(img)} className="p-2 rounded-full bg-white/90 text-navy hover:bg-white"><Pencil size={14}/></button>
                  <button onClick={() => setDeleteId(img._id)} className="p-2 rounded-full bg-white/90 text-danger hover:bg-white"><Trash2 size={14}/></button>
                </div>
                <div className="p-2">
                  <p className="text-xs truncate text-ink dark:text-gray-200">{img.caption || 'No caption'}</p>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    <Badge variant={img.status}>{img.status}</Badge>
                    <span className="text-xs text-muted truncate">{img.category}</span>
                  </div>
                  {usages.length > 0 && (
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 truncate" title={usages.join(', ')}>
                      Used in {usages.length} slot{usages.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <Modal open={uploadModal} onClose={() => setUploadModal(false)} title="Upload Photo" size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Image <span className="text-muted font-normal">(JPEG, PNG, WebP — max 10 MB)</span></label>
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
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-line dark:border-gray-700 text-xs text-muted hover:border-navy hover:text-navy transition-colors">
                <ImageIcon size={14}/> Choose image
              </button>
            )}
            <input ref={uploadInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUploadFileChange} className="hidden" />
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

      {/* Edit Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Photo" size="md">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Image <span className="text-muted font-normal">(upload a new file to replace current)</span></label>
            <div className="flex items-start gap-3">
              {replacePreview && <img src={replacePreview} alt="Current" className="h-24 rounded-xl object-cover border border-line shrink-0" />}
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => replaceInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-line dark:border-gray-700 text-xs text-muted hover:border-navy hover:text-navy transition-colors">
                  <Upload size={12}/> {replaceFile ? 'Change selection' : 'Replace image'}
                </button>
                {replaceFile && <p className="text-xs text-success">New image selected: {replaceFile.name}</p>}
              </div>
            </div>
            <input ref={replaceInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleReplaceFileChange} className="hidden" />
          </div>
          <GalleryField label="Caption"    name="caption"   form={form} setForm={setForm} />
          <GalleryField label="Alt Text"   name="altText"   form={form} setForm={setForm} />
          <GalleryField label="Category"   name="category"  form={form} setForm={setForm} type="select" opts={CATEGORIES} />
          <GalleryField label="Album Name" name="albumName" form={form} setForm={setForm} />
          <GalleryField label="Status"     name="status"    form={form} setForm={setForm} type="select" opts={['published','draft']} />
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
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// WEBSITE ASSIGNMENTS TAB
// ═════════════════════════════════════════════════════════════════════════════
function WebsiteAssignments() {
  const [registry,     setRegistry]     = useState([]);   // sections + slots
  const [assignments,  setAssignments]  = useState([]);   // current assignments
  const [allImages,    setAllImages]    = useState([]);   // published media
  const [loading,      setLoading]      = useState(true);

  const [selectedSection, setSelectedSection] = useState('');
  const [assignModal,  setAssignModal]  = useState(false);
  const [currentSlot,  setCurrentSlot]  = useState(null); // { sectionKey, slotKey, label }
  const [pickedImage,  setPickedImage]  = useState(null); // GalleryImage object
  const [objPosition,  setObjPosition]  = useState('center');
  const [saving,       setSaving]       = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null); // { sectionKey, slotKey }
  const [imgSearch,    setImgSearch]    = useState('');

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [regRes, asnRes, imgRes] = await Promise.all([
        adminApi.imageSlotRegistry(),
        adminApi.imageAssignments(),
        adminApi.gallery('?status=all&limit=200'),
      ]);
      setRegistry(regRes.data?.registry  || []);
      setAssignments(asnRes.data?.assignments || []);
      setAllImages(imgRes.data?.images   || []);
    } catch { toast.error('Failed to load assignment data'); }
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Helper: get current assignment for a slot
  const getAssignment = (sectionKey, slotKey) =>
    assignments.find(a => a.sectionKey === sectionKey && a.slotKey === slotKey);

  // Open assign modal for a slot
  const openAssign = (sectionKey, slotKey, slotLabel) => {
    const existing = getAssignment(sectionKey, slotKey);
    setCurrentSlot({ sectionKey, slotKey, label: slotLabel });
    setPickedImage(existing?.mediaId || null);
    setObjPosition(existing?.objectPosition || 'center');
    setImgSearch('');
    setAssignModal(true);
  };

  const handleSave = async () => {
    if (!pickedImage) { toast.error('Please select an image'); return; }
    setSaving(true);
    try {
      await adminApi.assignImage({
        sectionKey:     currentSlot.sectionKey,
        slotKey:        currentSlot.slotKey,
        mediaId:        pickedImage._id,
        objectPosition: objPosition,
      });
      toast.success('Image assigned successfully');
      setAssignModal(false);
      loadAll();
    } catch (err) {
      toast.error(err.message || 'Assignment failed');
    }
    setSaving(false);
  };

  const handleRemove = async () => {
    try {
      await adminApi.removeAssignment(removeTarget.sectionKey, removeTarget.slotKey);
      toast.success('Assignment removed');
      setRemoveTarget(null);
      loadAll();
    } catch (err) {
      toast.error(err.message || 'Remove failed');
      setRemoveTarget(null);
    }
  };

  const currentSection = registry.find(s => s.sectionKey === selectedSection);
  const publishedImages = allImages.filter(img => img.status === 'published');
  const filteredImages  = imgSearch.trim()
    ? publishedImages.filter(img => (img.caption || img.altText || img.category || '').toLowerCase().includes(imgSearch.toLowerCase()))
    : publishedImages;

  if (loading) return <LoadingPage />;

  return (
    <div>
      {/* Section selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Select Website Section</label>
        <div className="relative inline-block w-full max-w-xs">
          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2.5 pr-8 text-sm rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100 appearance-none"
          >
            <option value="">— Choose a section —</option>
            {registry.map(s => <option key={s.sectionKey} value={s.sectionKey}>{s.label}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
      </div>

      {!selectedSection && (
        <div className="text-sm text-muted text-center py-16 border border-dashed border-line dark:border-gray-700 rounded-xl">
          Select a section above to manage its image slots
        </div>
      )}

      {currentSection && (
        <div>
          <h3 className="text-sm font-semibold text-ink dark:text-gray-100 mb-4">{currentSection.label} — Image Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSection.slots.map(slot => {
              const a   = getAssignment(currentSection.sectionKey, slot.slotKey);
              const img = a?.mediaId;
              const imgUrl = img?.imageUrl ? getUploadUrl(img.imageUrl) : null;
              return (
                <div key={slot.slotKey} className="border border-line dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                  {/* Image preview */}
                  <div className="aspect-video bg-sky dark:bg-gray-800 relative">
                    {imgUrl ? (
                      <img src={imgUrl} alt={img.altText || img.caption || slot.label}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={28} className="text-muted/40" />
                      </div>
                    )}
                    {img && (
                      <span className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${img.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {img.status}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-xs font-semibold text-ink dark:text-gray-100">{slot.label}</p>
                    <p className="text-[10px] text-muted mt-0.5">{slot.aspectRatio} · {slot.description}</p>
                    {img && (
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 truncate">
                        {img.caption || img.altText || img._id}
                      </p>
                    )}
                    {a && (
                      <p className="text-[10px] text-muted mt-0.5">Position: <span className="font-medium text-ink dark:text-gray-200">{a.objectPosition}</span></p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => openAssign(currentSection.sectionKey, slot.slotKey, slot.label)}
                        className="flex-1 py-1.5 rounded-lg bg-navy text-white text-[11px] font-medium hover:bg-navy-2 transition-colors"
                      >
                        {img ? 'Change' : 'Assign'} Image
                      </button>
                      {a && (
                        <button
                          onClick={() => setRemoveTarget({ sectionKey: currentSection.sectionKey, slotKey: slot.slotKey })}
                          className="py-1.5 px-3 rounded-lg border border-danger/40 text-danger text-[11px] hover:bg-danger/5 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assign Image Modal */}
      <Modal open={assignModal} onClose={() => setAssignModal(false)} title={`Assign Image — ${currentSlot?.label}`} size="lg">
        <div className="space-y-4">
          {/* Current selection preview */}
          {pickedImage && (
            <div className="flex items-center gap-3 p-3 bg-sky dark:bg-gray-800 rounded-xl border border-line dark:border-gray-700">
              <img src={getUploadUrl(pickedImage.imageUrl)} alt=""
                className="w-16 h-12 object-cover rounded-lg shrink-0 border border-line" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-ink dark:text-gray-100 truncate">{pickedImage.caption || pickedImage.altText || 'Selected image'}</p>
                <p className="text-[10px] text-muted">{pickedImage.category}</p>
              </div>
              <button onClick={() => setPickedImage(null)} className="ml-auto shrink-0 text-muted hover:text-danger"><X size={14}/></button>
            </div>
          )}

          {/* Object position */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Image Position (object-position)</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {['top', 'center', 'bottom', 'left', 'right', 'center 20%', 'center 30%'].map(pos => (
                <button key={pos} type="button"
                  onClick={() => setObjPosition(pos)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] border transition-colors ${objPosition === pos ? 'bg-navy text-white border-navy' : 'border-line dark:border-gray-700 text-muted hover:border-navy'}`}
                >
                  {pos}
                </button>
              ))}
            </div>
            <input
              value={objPosition}
              onChange={e => setObjPosition(e.target.value)}
              placeholder="Custom e.g. center 40%"
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100"
            />
          </div>

          {/* Image picker */}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
              Select from Media Library ({filteredImages.length} published images)
            </label>
            <input
              value={imgSearch}
              onChange={e => setImgSearch(e.target.value)}
              placeholder="Search by caption, alt text, category…"
              className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100 mb-3"
            />
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
              {filteredImages.map(img => (
                <button key={img._id} type="button"
                  onClick={() => setPickedImage(img)}
                  className={`relative group rounded-lg overflow-hidden border-2 transition-all ${pickedImage?._id === img._id ? 'border-navy' : 'border-transparent hover:border-navy/40'}`}
                >
                  <img src={getUploadUrl(img.imageUrl)} alt={img.altText || img.caption}
                    className="w-full aspect-video object-cover" />
                  {pickedImage?._id === img._id && (
                    <div className="absolute inset-0 bg-navy/20 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-navy text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption || img.altText || img.category}
                  </p>
                </button>
              ))}
              {filteredImages.length === 0 && (
                <div className="col-span-4 text-center py-8 text-xs text-muted">No published images found</div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={() => setAssignModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
            <button onClick={handleSave} disabled={!pickedImage || saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Assignment'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Remove confirmation */}
      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemove}
        title="Remove Assignment"
        message="The original fallback image from the data file will be shown instead."
      />
    </div>
  );
}
