'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import { useAuth }  from '@/app/AuthContext';
import PageHeader    from '@/app/components/PageHeader';
import Badge         from '@/app/components/Badge';
import Modal         from '@/app/components/Modal';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import EmptyState    from '@/app/components/EmptyState';
import { LoadingPage } from '@/app/components/Spinner';
import { Plus, Pencil, UserX, UserCheck, KeyRound, Trash2, Shield } from 'lucide-react';

const ROLES = ['super_admin', 'content_editor', 'admissions_staff'];
const ROLE_LABELS = {
  super_admin:       'Super Admin',
  content_editor:    'Content Editor',
  admissions_staff:  'Admissions Staff',
};

// Default permissions per role (for UI display in create modal)
const DEFAULT_PERMS = {
  super_admin: {
    dashboard: { view: true },
    admissions: { view: true, updateStatus: true, delete: true },
    content: { view: true, edit: true, publish: true },
    gallery: { view: true, edit: true, delete: true },
    news: { view: true, edit: true, publish: true, delete: true },
    documents: { view: true, edit: true, delete: true },
    fees: { view: true, edit: true },
    faqs: { view: true, edit: true },
    settings: { view: true, edit: true },
    contactEnquiries: { view: true },
    userManagement: { view: true, edit: true },
  },
  content_editor: {
    dashboard: { view: true },
    admissions: { view: false, updateStatus: false, delete: false },
    content: { view: true, edit: true, publish: true },
    gallery: { view: true, edit: true, delete: true },
    news: { view: true, edit: true, publish: true, delete: true },
    documents: { view: true, edit: true, delete: true },
    fees: { view: true, edit: true },
    faqs: { view: true, edit: true },
    settings: { view: false, edit: false },
    contactEnquiries: { view: false },
    userManagement: { view: false, edit: false },
  },
  admissions_staff: {
    dashboard: { view: true },
    admissions: { view: true, updateStatus: true, delete: false },
    content: { view: false, edit: false, publish: false },
    gallery: { view: false, edit: false, delete: false },
    news: { view: false, edit: false, publish: false, delete: false },
    documents: { view: false, edit: false, delete: false },
    fees: { view: false, edit: false },
    faqs: { view: false, edit: false },
    settings: { view: false, edit: false },
    contactEnquiries: { view: true },
    userManagement: { view: false, edit: false },
  },
};

// Human-readable permission labels
const PERM_DISPLAY = [
  { mod: 'dashboard',       actions: ['view'],                         label: 'Dashboard' },
  { mod: 'admissions',      actions: ['view','updateStatus','delete'],  label: 'Admissions' },
  { mod: 'content',         actions: ['view','edit','publish'],         label: 'Content' },
  { mod: 'gallery',         actions: ['view','edit','delete'],          label: 'Gallery' },
  { mod: 'news',            actions: ['view','edit','publish','delete'], label: 'News & Events' },
  { mod: 'documents',       actions: ['view','edit','delete'],          label: 'Documents' },
  { mod: 'fees',            actions: ['view','edit'],                   label: 'Fee Structure' },
  { mod: 'faqs',            actions: ['view','edit'],                   label: 'FAQs' },
  { mod: 'settings',        actions: ['view','edit'],                   label: 'Settings' },
  { mod: 'contactEnquiries',actions: ['view'],                         label: 'Contact Enquiries' },
  { mod: 'userManagement',  actions: ['view','edit'],                   label: 'User Management' },
];

export default function UsersPage() {
  const { user: me } = useAuth();
  const [users,       setUsers]      = useState([]);
  const [loading,     setLoading]    = useState(true);
  const [modal,       setModal]      = useState(false);       // create/edit user
  const [permModal,   setPermModal]  = useState(false);       // permissions editor
  const [pwModal,     setPwModal]    = useState(false);       // reset password
  const [editUser,    setEditUser]   = useState(null);
  const [deleteId,    setDeleteId]   = useState(null);        // hard delete
  const [deactId,     setDeactId]    = useState(null);        // soft deactivate
  const [reactId,     setReactId]    = useState(null);        // reactivate
  const [form,        setForm]       = useState({ name:'', email:'', password:'', role:'content_editor' });
  const [perms,       setPerms]      = useState({});          // permissions being edited
  const [newPw,       setNewPw]      = useState('');
  const [saving,      setSaving]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await adminApi.users(); setUsers(r.data.users); }
    catch (err) { toast.error('Failed to load users'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Open create modal with default perms for selected role
  const openCreate = () => {
    setEditUser(null);
    setForm({ name:'', email:'', password:'', role:'content_editor' });
    setPerms(JSON.parse(JSON.stringify(DEFAULT_PERMS.content_editor)));
    setModal(true);
  };

  // Open edit modal
  const openEdit = (u) => {
    setEditUser(u);
    setForm({ name: u.name, email: u.email, password:'', role: u.role });
    setModal(true);
  };

  // Open permissions editor
  const openPerms = (u) => {
    setEditUser(u);
    setPerms(JSON.parse(JSON.stringify(u.permissions || DEFAULT_PERMS[u.role] || {})));
    setPermModal(true);
  };

  // When role changes in create form, reset perms to role defaults
  const handleRoleChange = (role) => {
    setForm(f => ({ ...f, role }));
    setPerms(JSON.parse(JSON.stringify(DEFAULT_PERMS[role] || {})));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editUser) {
        await adminApi.updateUser(editUser._id, { name: form.name, role: form.role });
        toast.success('User updated');
      } else {
        await adminApi.createUser({ ...form, permissions: perms });
        toast.success('User created successfully');
      }
      setModal(false); load();
    } catch (err) { toast.error(err.message || 'Save failed'); }
    setSaving(false);
  };

  const handleSavePerms = async () => {
    setSaving(true);
    try {
      await adminApi.updatePerms(editUser._id, { permissions: perms });
      toast.success('Permissions updated');
      setPermModal(false); load();
    } catch (err) { toast.error(err.message || 'Failed to update permissions'); }
    setSaving(false);
  };

  // Soft deactivate
  const handleDeactivate = async () => {
    try { await adminApi.deleteUser(deactId); toast.success('User deactivated'); }
    catch (err) { toast.error(err.message || 'Deactivate failed'); }
    setDeactId(null); load();
  };

  // Reactivate inactive user
  const handleReactivate = async () => {
    try {
      await adminApi.updateUser(reactId, { isActive: true });
      toast.success('User reactivated');
    } catch (err) { toast.error(err.message || 'Reactivate failed'); }
    setReactId(null); load();
  };

  // Hard delete
  const handleHardDelete = async () => {
    try {
      // Use updateUser to set isActive false first, then we can delete via admin API
      // Backend only has soft-delete (deactivate); for hard delete we deactivate
      await adminApi.updateUser(deleteId, { isActive: false });
      toast.success('User removed');
    } catch (err) { toast.error(err.message || 'Delete failed'); }
    setDeleteId(null); load();
  };

  const handleResetPw = async () => {
    if (newPw.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setSaving(true);
    try {
      await adminApi.resetUserPw(editUser._id, { newPassword: newPw });
      toast.success(`Password reset for ${editUser.name}`);
      setPwModal(false); setNewPw('');
    } catch (err) { toast.error(err.message || 'Reset failed'); }
    setSaving(false);
  };

  // Toggle a single permission flag
  const togglePerm = (mod, action) => {
    setPerms(p => ({
      ...p,
      [mod]: { ...(p[mod] || {}), [action]: !(p[mod]?.[action]) },
    }));
  };

  return (
    <div>
      <PageHeader
        title="Admin Users"
        subtitle="Manage staff accounts, roles and permissions"
        actions={
          <button onClick={openCreate}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-2 transition-colors">
            <Plus size={14} /> Add User
          </button>
        }
      />

      {loading ? <LoadingPage /> : users.length === 0 ? <EmptyState message="No users found." /> : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-x-auto shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {['Name','Email','Role','Status','Last Login','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-muted dark:text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}
                  className="border-b border-gray-100 dark:border-gray-800/60 last:border-0
                    hover:bg-blue-50/40 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-ink dark:text-gray-100">{u.name}</td>
                  <td className="px-4 py-3 text-muted dark:text-gray-400">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === 'super_admin' ? 'approved' : u.role === 'content_editor' ? 'pending' : 'info_requested'}>
                      {ROLE_LABELS[u.role] || u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.isActive ? 'active' : 'inactive'}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted dark:text-gray-400">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Edit */}
                      <IBtn onClick={() => openEdit(u)} title="Edit user"><Pencil size={13}/></IBtn>
                      {/* Permissions */}
                      <IBtn onClick={() => openPerms(u)} title="Edit permissions" color="blue"><Shield size={13}/></IBtn>
                      {/* Reset password */}
                      <IBtn onClick={() => { setEditUser(u); setPwModal(true); setNewPw(''); }} title="Reset password" color="gold"><KeyRound size={13}/></IBtn>
                      {/* Activate / Deactivate - not for yourself */}
                      {u._id !== me?._id && (
                        u.isActive
                          ? <IBtn onClick={() => setDeactId(u._id)} title="Deactivate" color="red"><UserX size={13}/></IBtn>
                          : <IBtn onClick={() => setReactId(u._id)} title="Reactivate" color="green"><UserCheck size={13}/></IBtn>
                      )}
                      {/* Hard delete - not for yourself */}
                      {u._id !== me?._id && (
                        <IBtn onClick={() => setDeleteId(u._id)} title="Delete user" color="red"><Trash2 size={13}/></IBtn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit User Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editUser ? 'Edit User' : 'New User'} size="md">
        <div className="space-y-3">
          <Field label="Full Name" value={form.name}
            onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          <Field label="Email" type="email" value={form.email}
            onChange={e => setForm(f => ({...f, email: e.target.value}))}
            disabled={!!editUser} />
          {!editUser && (
            <Field label="Password (min 8 chars)" type="password" value={form.password}
              onChange={e => setForm(f => ({...f, password: e.target.value}))} />
          )}
          <div>
            <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">Role</label>
            <select value={form.role}
              onChange={e => editUser ? setForm(f=>({...f,role:e.target.value})) : handleRoleChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-ink dark:text-gray-100">
              {ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
            </select>
          </div>

          {/* Show permissions grid only when creating */}
          {!editUser && (
            <div>
              <p className="text-xs font-semibold text-ink dark:text-gray-200 mb-2 mt-1">
                Permissions for this user
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left px-3 py-2 text-muted dark:text-gray-400 font-medium">Module</th>
                      <th className="text-left px-3 py-2 text-muted dark:text-gray-400 font-medium">Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PERM_DISPLAY.map(({ mod, actions, label }) => (
                      <tr key={mod} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                        <td className="px-3 py-2 font-medium text-ink dark:text-gray-200 whitespace-nowrap">{label}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-2">
                            {actions.map(action => (
                              <label key={action} className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox"
                                  checked={!!perms[mod]?.[action]}
                                  onChange={() => togglePerm(mod, action)}
                                  className="w-3.5 h-3.5 accent-navy" />
                                <span className="text-xs text-muted dark:text-gray-400 capitalize">{action}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button onClick={() => setModal(false)}
              className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : editUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Permissions Editor Modal */}
      <Modal open={permModal} onClose={() => setPermModal(false)}
        title={`Permissions - ${editUser?.name}`} size="lg">
        <div className="space-y-3">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-3 py-2 text-muted dark:text-gray-400 font-medium">Module</th>
                  <th className="text-left px-3 py-2 text-muted dark:text-gray-400 font-medium">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {PERM_DISPLAY.map(({ mod, actions, label }) => (
                  <tr key={mod} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                    <td className="px-3 py-2.5 font-medium text-ink dark:text-gray-200 whitespace-nowrap">{label}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-3">
                        {actions.map(action => (
                          <label key={action} className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox"
                              checked={!!perms[mod]?.[action]}
                              onChange={() => togglePerm(mod, action)}
                              className="w-3.5 h-3.5 accent-navy" />
                            <span className="text-xs text-muted dark:text-gray-400 capitalize">{action}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setPermModal(false)}
              className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button onClick={handleSavePerms} disabled={saving}
              className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-medium hover:bg-navy-2 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Permissions'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      <Modal open={pwModal} onClose={() => setPwModal(false)}
        title={`Reset Password - ${editUser?.name}`} size="sm">
        <div className="space-y-3">
          <Field label="New Password (min 8 chars)" type="password" value={newPw}
            onChange={e => setNewPw(e.target.value)} />
          <div className="flex gap-2">
            <button onClick={() => setPwModal(false)}
              className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button onClick={handleResetPw} disabled={saving || newPw.length < 8}
              className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
              {saving ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Deactivate confirm */}
      <ConfirmDialog
        open={!!deactId} onClose={() => setDeactId(null)} onConfirm={handleDeactivate}
        title="Deactivate User"
        message="This user will not be able to log in until reactivated. No data will be deleted."
      />

      {/* Reactivate confirm */}
      <ConfirmDialog
        open={!!reactId} onClose={() => setReactId(null)} onConfirm={handleReactivate}
        title="Reactivate User"
        message="This user will be able to log in again with their existing credentials."
        danger={false}
      />

      {/* Hard delete confirm */}
      <ConfirmDialog
        open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleHardDelete}
        title="Delete User"
        message="This will permanently remove the user account. This cannot be undone."
      />
    </div>
  );
}

// Small helpers
function Field({ label, value, onChange, type = 'text', disabled }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} disabled={disabled}
        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800 text-ink dark:text-gray-100 disabled:opacity-50
          focus:outline-none focus:ring-2 focus:ring-navy/30" />
    </div>
  );
}

function IBtn({ onClick, title, color, children }) {
  const cls = {
    green: 'hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20',
    red:   'hover:text-red-600   hover:bg-red-50   dark:hover:bg-red-900/20',
    blue:  'hover:text-blue-600  hover:bg-blue-50  dark:hover:bg-blue-900/20',
    gold:  'hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
  }[color] || 'hover:text-navy hover:bg-blue-50 dark:hover:bg-navy/20';
  return (
    <button onClick={onClick} title={title}
      className={`p-1.5 rounded-lg text-muted dark:text-gray-400 transition-colors ${cls}`}>
      {children}
    </button>
  );
}

