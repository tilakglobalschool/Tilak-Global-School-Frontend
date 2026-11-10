"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitContact } from "@/lib/api";

/**
 * ContactForm — client component.
 * Extracted from contact-us/page.jsx so the page itself can remain
 * a server component that fetches settings from the API.
 */
export default function ContactForm() {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { error } = await submitContact({
      name:    form.name.trim(),
      email:   form.email.trim(),
      phone:   form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setLoading(false);

    if (error) {
      if (error.status === 429) {
        toast.error("Too many submissions — please wait before trying again.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }

    setDone(true);
    toast.success("Message sent! We will get back to you shortly.");
  };

  const inp = (field) =>
    `w-full border-b ${errors[field] ? "border-red-500" : "border-gray-300"}
     px-0 py-2.5 text-sm text-gray-700 bg-transparent
     focus:outline-none focus:border-[#0B3D91] transition-colors duration-200`;

  if (done) {
    return (
      <div className="border-2 border-green-500 bg-green-50 p-8 text-center">
        <p className="text-2xl mb-2">✓</p>
        <p className="font-semibold text-green-800 mb-1">Message Sent!</p>
        <p className="text-sm text-green-700">
          Thank you for reaching out. We will get back to you within 2 working days.
        </p>
        <button
          onClick={() => { setDone(false); setForm({ name:"", email:"", phone:"", subject:"", message:"" }); }}
          className="mt-4 text-xs border-2 border-green-600 text-green-700
                     hover:bg-green-600 hover:text-white px-5 py-2 transition-all"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
            Your Name *
          </label>
          <input name="name" value={form.name} onChange={change}
            placeholder="Full name" className={inp("name")} />
          {errors.name && <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
            Email Address *
          </label>
          <input type="email" name="email" value={form.email} onChange={change}
            placeholder="you@example.com" className={inp("email")} />
          {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
            Phone (optional)
          </label>
          <input type="tel" name="phone" value={form.phone} onChange={change}
            placeholder="Mobile number" maxLength={13} className={inp("phone")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
            Subject
          </label>
          <input name="subject" value={form.subject} onChange={change}
            placeholder="e.g. Admission Enquiry" className={inp("subject")} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
          Message *
        </label>
        <textarea name="message" value={form.message} onChange={change}
          placeholder="How can we help you?" rows={5}
          className={inp("message") + " resize-none"} />
        {errors.message && <p className="mt-1 text-[11px] text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0B3D91] hover:bg-[#C8102E] disabled:opacity-60
                   text-white font-semibold py-3 text-sm
                   transition-colors duration-200"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
