'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '@/lib/adminApi';
import PageHeader from '@/app/components/PageHeader';
import { LoadingPage } from '@/app/components/Spinner';
import { Save, Upload } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploadUrl';

function Field({ label, name, value, onChange, type = 'text', placeholder, hint }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink dark:text-gray-300 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100 resize-none
            focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-xs rounded-xl border border-line dark:border-gray-700
            bg-white dark:bg-gray-800 text-ink dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      )}
      {hint && <p className="text-xs text-muted dark:text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-line
      dark:border-gray-800 shadow-sm p-5 mb-4">
      <h2 className="text-sm font-semibold text-navy dark:text-blue-300 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [form,    setForm]    = useState({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    adminApi.settings().then(res => {
      setForm(res.data.settings);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (parent, key, value) => {
    setForm(f => ({ ...f, [parent]: { ...(f[parent] || {}), [key]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const { _id, updatedBy, updatedAt, logoUrl, faviconUrl, directorPhotoUrl, ...updates } = form;
      await adminApi.updateSettings(updates);
      setSaved(true);
      toast.success('Settings saved successfully');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { toast.error(err.message || 'Failed to save settings'); }
    setSaving(false);
  };

  const handleUpload = async (endpoint, field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append('media', file);
      try {
        let res;
        if (field === 'logoUrl')         res = await adminApi.uploadLogo(fd);
        else if (field === 'faviconUrl') res = await adminApi.uploadFavicon(fd);
        else                              res = await adminApi.uploadDirectorPhoto(fd);
        setForm(f => ({ ...f, [field]: res.data.url }));
      } catch { /* */ }
    };
    input.click();
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        subtitle="Manage school contact details, banner text, and branding"
        actions={
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white
              text-xs font-semibold hover:bg-navy-2 disabled:opacity-50 transition-colors">
            <Save size={14} />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        }
      />

      <Section title="School Identity">
        <Field label="School Name"    name="schoolName"    value={form.schoolName}    onChange={handleChange} />
        <Field label="Subtitle"       name="schoolSubtitle" value={form.schoolSubtitle} onChange={handleChange} />
        <Field label="CBSE Affiliation No." name="cbseAffiliationNo" value={form.cbseAffiliationNo} onChange={handleChange} placeholder="e.g. 1730123" />
        <Field label="CBSE School Code"     name="cbseSchoolCode"   value={form.cbseSchoolCode}    onChange={handleChange} />
        <div className="md:col-span-2">
          <Field label="Top Bar Tagline" name="topBarTagline" value={form.topBarTagline} onChange={handleChange} placeholder="CBSE Affiliated ┬╖ Nursery to XII ┬╖ English Medium" />
        </div>
        <div className="md:col-span-2">
          <Field label="Footer Description" name="footerDescription" value={form.footerDescription} onChange={handleChange} type="textarea" />
        </div>
      </Section>

      <Section title="Contact Information">
        <Field label="Main Phone"        name="phone"           value={form.phone}           onChange={handleChange} placeholder="+91-XXXXX-XXXXX" />
        <Field label="Admissions Phone"  name="admissionsPhone" value={form.admissionsPhone} onChange={handleChange} placeholder="+91-XXXXX-XXXXX" />
        <Field label="General Email"     name="email"           value={form.email}           onChange={handleChange} type="email" placeholder="info@tilakglobalschool.in" />
        <Field label="Admissions Email"  name="admissionsEmail" value={form.admissionsEmail} onChange={handleChange} type="email" />
        <div className="md:col-span-2">
          <Field label="Address" name="address" value={form.address} onChange={handleChange} type="textarea" />
        </div>
        <Field label="PIN Code"        name="pinCode"        value={form.pinCode}        onChange={handleChange} placeholder="302001" />
        <Field label="Office Timings"  name="officeTimings"  value={form.officeTimings}  onChange={handleChange} placeholder="Mon-Sat, 8:00 AM - 2:00 PM" />
        <Field label="WhatsApp Number" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} placeholder="+91XXXXXXXXXX" />
        <div className="md:col-span-2">
          <Field label="WhatsApp Pre-filled Message" name="whatsappMessage" value={form.whatsappMessage} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Field label="Google Maps Embed URL" name="mapEmbedUrl" value={form.mapEmbedUrl} onChange={handleChange} placeholder="https://maps.google.com/..." />
        </div>
      </Section>

      <Section title="Admission Banner">
        <Field label="Academic Session" name="admissionSession"    value={form.admissionSession}    onChange={handleChange} placeholder="2027-28" />
        <Field label="Banner Text"      name="admissionBannerText" value={form.admissionBannerText} onChange={handleChange} />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="admOpen" name="admissionsOpen"
            checked={form.admissionsOpen ?? true}
            onChange={handleChange}
            className="w-4 h-4 accent-navy"
          />
          <label htmlFor="admOpen" className="text-xs font-medium text-ink dark:text-gray-300">
            Admissions are currently open
          </label>
        </div>
      </Section>

      <Section title="Director / Principal">
        <Field label="Name"        name="directorName"        value={form.directorName}        onChange={handleChange} />
        <Field label="Designation" name="directorDesignation" value={form.directorDesignation} onChange={handleChange} />
        <div className="md:col-span-2">
          <Field label="Director Message" name="directorMessage" value={form.directorMessage} onChange={handleChange} type="textarea" />
        </div>
        {/* Director photo upload */}
        <div className="flex items-center gap-3">
          {form.directorPhotoUrl && (
            <img src={getUploadUrl(form.directorPhotoUrl)}
              alt="Director" className="w-12 h-12 rounded-full object-cover border border-line" />
          )}
          <button onClick={() => handleUpload('director-photo', 'directorPhotoUrl')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line
              dark:border-gray-700 text-xs hover:bg-sky dark:hover:bg-gray-800 transition-colors">
            <Upload size={13} />
            Upload Photo
          </button>
        </div>
      </Section>

      <Section title="Media">
        <div className="flex items-center gap-3">
          {form.logoUrl && (
            <img src={getUploadUrl(form.logoUrl)}
              alt="Logo" className="h-10 object-contain border border-line rounded" />
          )}
          <button onClick={() => handleUpload('logo', 'logoUrl')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line
              dark:border-gray-700 text-xs hover:bg-sky dark:hover:bg-gray-800 transition-colors">
            <Upload size={13} />
            Upload Logo
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleUpload('favicon', 'faviconUrl')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line
              dark:border-gray-700 text-xs hover:bg-sky dark:hover:bg-gray-800 transition-colors">
            <Upload size={13} />
            Upload Favicon
          </button>
          {form.faviconUrl && <span className="text-xs text-success">Favicon set</span>}
        </div>
      </Section>

      <Section title="Social Media Links">
        <Field label="Facebook"  value={form.socialLinks?.facebook  ?? ''} onChange={e => handleNestedChange('socialLinks','facebook',  e.target.value)} placeholder="https://facebook.com/..." />
        <Field label="Instagram" value={form.socialLinks?.instagram ?? ''} onChange={e => handleNestedChange('socialLinks','instagram', e.target.value)} placeholder="https://instagram.com/..." />
        <Field label="YouTube"   value={form.socialLinks?.youtube   ?? ''} onChange={e => handleNestedChange('socialLinks','youtube',   e.target.value)} placeholder="https://youtube.com/..." />
        <Field label="Other"     value={form.socialLinks?.other     ?? ''} onChange={e => handleNestedChange('socialLinks','other',     e.target.value)} />
      </Section>
    </div>
  );
}

