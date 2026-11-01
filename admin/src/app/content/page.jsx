'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader from '@/app/components/PageHeader';
import Badge      from '@/app/components/Badge';
import Modal      from '@/app/components/Modal';
import EmptyState from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Pencil, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';

const PAGES = ['home','about','academics','admissions','facilities','gallery','news','results','contact','downloads'];

export default function ContentPage() {
  const [blocks,    setBlocks]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [pageFilter,setPageFilter]= useState('home');
  const [modal,     setModal]     = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [draft,     setDraft]     = useState('');
  const [saving,    setSaving]    = useState(false);
  const [expanded,  setExpanded]  = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await adminApi.pageContent(pageFilter);
      setBlocks(r.data.blocks);
    } catch (err) { toast.error('Failed to load content'); }
    setLoading(false);
  }, [pageFilter]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (block) => {
    setEditing(block);
    setDraft(String(block.draftValue ?? block.value ?? ''));
    setModal(true);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await adminApi.updateContent(editing.key, { draftValue: draft });
      toast.success('Draft saved');
      setModal(false); load();
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(false);
  };

  const handlePublish = async (key) => {
    try { await adminApi.publishContent(key); toast.success('Content published'); }
    catch (err) { toast.error(err.message || 'Publish failed'); }
    load();
  };

  const handleUnpublish = async (key) => {
    try { await adminApi.unpublishContent(key); toast.success('Content unpublished'); }
    catch (err) { toast.error(err.message || 'Unpublish failed'); }
    load();
  };

  // Group by section
  const grouped = blocks.reduce((acc, b) => {
    if (!acc[b.section]) acc[b.section] = [];
    acc[b.section].push(b);
    return acc;
  }, {});

  const toggleSection = (s) => setExpanded(e => ({ ...e, [s]: !e[s] }));

  return (
    <div>
      <PageHeader title="Website Content" subtitle="Edit text blocks for each page" />

      <div className="flex gap-2 mb-4 flex-wrap">
        {PAGES.map(p => (
          <button key={p} onClick={() => setPageFilter(p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors
              ${pageFilter===p ? 'bg-navy text-white' : 'bg-white dark:bg-gray-900 border border-line dark:border-gray-700 text-muted hover:bg-sky dark:hover:bg-gray-800'}`}>
            {p}
          </button>
        ))}
      </div>

      {loading ? <LoadingPage /> : blocks.length === 0 ? <EmptyState message="No content blocks for this page." /> : (
        <div className="space-y-2">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="bg-white dark:bg-gray-900 rounded-xl border border-line dark:border-gray-800 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-sky/20 dark:hover:bg-gray-800/30 transition-colors">
                <span className="text-xs font-semibold text-navy dark:text-blue-300 capitalize">{section}</span>
                {expanded[section] ? <ChevronDown size={14} className="text-muted" /> : <ChevronRight size={14} className="text-muted" />}
              </button>
              {(!expanded[section]) && (
                <div className="border-t border-line dark:border-gray-800">
                  {items.map(b => (
                    <div key={b.key} className="flex items-start gap-3 px-4 py-2.5 border-b border-line/50 dark:border-gray-800/50 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium text-ink dark:text-gray-200 truncate">{b.label}</p>
                          {b.hasDraft && <Badge variant="warning">Draft pending</Badge>}
                        </div>
                        <p className="text-xs text-muted dark:text-gray-400 mt-0.5 truncate">
                          {String(b.value ?? '').substring(0, 80) || <em>empty</em>}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Badge variant={b.status}>{b.status}</Badge>
                        <button onClick={() => openEdit(b)} className="p-1 rounded text-muted hover:text-navy"><Pencil size={13}/></button>
                        {b.hasDraft
                          ? <button onClick={() => handlePublish(b.key)} title="Publish draft" className="p-1 rounded text-muted hover:text-success"><Eye size={13}/></button>
                          : b.status === 'published'
                            ? <button onClick={() => handleUnpublish(b.key)} title="Unpublish" className="p-1 rounded text-muted hover:text-warning"><EyeOff size={13}/></button>
                            : <button onClick={() => handlePublish(b.key)} title="Publish" className="p-1 rounded text-muted hover:text-success"><Eye size={13}/></button>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={`Edit: ${editing?.label}`} size="md">
        {editing && (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted dark:text-gray-400 mb-1">Key: <code className="bg-sky dark:bg-gray-700 px-1 rounded">{editing.key}</code></p>
              <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
                Value (saved as draft - publish to make live)
              </label>
              {editing.type === 'list' ? (
                <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={6}
                  placeholder="One item per line"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none font-mono" />
              ) : editing.type === 'richtext' ? (
                <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={8}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none" />
              ) : (
                <input value={draft} onChange={e=>setDraft(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700 bg-white dark:bg-gray-800 text-ink dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/30" />
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setModal(false)} className="flex-1 py-2 rounded-xl border border-line text-xs">Cancel</button>
              <button onClick={handleSaveDraft} disabled={saving}
                className="flex-1 py-2 rounded-xl border border-navy text-navy text-xs font-medium hover:bg-sky disabled:opacity-50">
                Save Draft
              </button>
              <button onClick={async () => {
                  await handleSaveDraft();
                  await handlePublish(editing.key);
                }}
                disabled={saving}
                className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save & Publish'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

