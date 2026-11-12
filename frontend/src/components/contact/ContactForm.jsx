"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitContact } from "@/lib/api";

/**
 * ContactForm — client component.
 * Professional card form with +91 phone prefix, navy/red theme, sharp corners.
 * Layout, field order, and submission logic are preserved.
 * Only input visibility and styling are refined.
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

  /** Normalize phone: strip non-digits, remove country code if present, prepend +91 */
  const normalizePhone = (raw) => {
    if (!raw.trim()) return "";
    const all = raw.replace(/\D/g, "");
    // Only strip leading 91 when number is 12 digits (full +91XXXXXXXXXX)
    const digits = all.length === 12 && all.startsWith("91") ? all.slice(2) : all;
    if (!digits) return "";
    return `+91${digits}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { error } = await submitContact({
      name:    form.name.trim(),
      email:   form.email.trim(),
      phone:   normalizePhone(form.phone),
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

  /*
   * inputCls — shared class string for all standard inputs & textarea.
   * Compact height (~44px mobile, ~46px desktop), smaller padding and text.
   */
  const inputCls = (field) =>
    [
      // Base
      "w-full min-w-0 bg-white outline-none",
      // Compact height & padding — text-sm prevents oversized feel, md:text-base for readability
      "h-[44px] md:h-[46px] px-3 md:px-4 py-2.5 text-sm md:text-base text-[#1F2A44] placeholder:text-slate-400",
      // Stronger default border so inputs stand out from white card
      "border-[1.5px]",
      // Shadow — subtle navy tint at rest
      "shadow-[0_3px_12px_rgba(11,61,145,0.10)]",
      // Hover — border deepens, shadow grows
      "hover:border-[#0B3D91]/60 hover:shadow-[0_5px_16px_rgba(11,61,145,0.15)]",
      // Focus — strong navy border + ring
      "focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/15 focus:shadow-[0_5px_18px_rgba(11,61,145,0.18)]",
      // Animation
      "transition-all duration-300 ease-in-out",
      // Error vs default border colour
      errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-[#0B3D91]/25",
    ].join(" ");

  /* ── Success state ── */
  if (done) {
    return (
      <div className="bg-white border border-[#0B3D91]/10 border-t-4 border-t-green-500 shadow-[0_8px_30px_rgba(11,61,145,0.08)] p-8 text-center">
        <div className="w-14 h-14 bg-green-50 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-green-600">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-serif text-xl font-bold text-green-800 mb-2">Message Sent!</p>
        <p className="text-sm text-green-700 mb-6">
          Thank you for reaching out. We will get back to you within 2 working days.
        </p>
        <button
          onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
          className="text-sm border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white px-6 py-2.5 font-semibold transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    /* Card container — no outer shadow, border + top accent only */
    <div className="bg-white border border-[#0B3D91]/10 border-t-4 border-t-red-600 shadow-none p-4 sm:p-5 md:p-6 lg:p-8">
      <form onSubmit={handleSubmit} noValidate>

        {/* Row 1 — Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          <div>
            <label htmlFor="cf-name" className="block font-medium text-[#0B3D91] text-sm mb-1.5">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Full name"
              autoComplete="name"
              className={inputCls("name")}
            />
            {errors.name && <p className="mt-1.5 text-[11px] text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cf-email" className="block font-medium text-[#0B3D91] text-sm mb-1.5">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="cf-email"
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputCls("email")}
            />
            {errors.email && <p className="mt-1.5 text-[11px] text-red-600">{errors.email}</p>}
          </div>
        </div>

        {/* Row 2 — Phone + Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          <div>
            <label htmlFor="cf-phone" className="block font-medium text-[#0B3D91] text-sm mb-1.5">
              Phone <span className="text-slate-400 font-normal text-xs">(optional)</span>
            </label>
            {/* +91 prefix + input — visually connected, same height */}
            <div className="flex shadow-[0_3px_12px_rgba(11,61,145,0.10)] hover:shadow-[0_5px_16px_rgba(11,61,145,0.15)] transition-shadow duration-300 ease-in-out">
              <span
                className="bg-[#EEF3FB] border-[1.5px] border-r-0 border-[#0B3D91]/25
                           px-3 md:px-4 flex items-center justify-center
                           font-semibold text-[#0B3D91] text-sm
                           h-[44px] md:h-[46px] shrink-0 select-none whitespace-nowrap"
              >
                +91
              </span>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="10-digit mobile number"
                maxLength={10}
                autoComplete="tel-national"
                className={[
                  "flex-1 min-w-0 bg-white border-[1.5px] border-l-0 outline-none",
                  "h-[44px] md:h-[46px] px-3 md:px-4 py-2.5",
                  "text-sm md:text-base text-[#1F2A44] placeholder:text-slate-400",
                  "hover:border-[#0B3D91]/60",
                  "focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/15",
                  "transition-all duration-300 ease-in-out",
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-[#0B3D91]/25",
                ].join(" ")}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-[11px] text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="cf-subject" className="block font-medium text-[#0B3D91] text-sm mb-1.5">
              Subject
            </label>
            <input
              id="cf-subject"
              name="subject"
              value={form.subject}
              onChange={change}
              placeholder="e.g. Admission Enquiry"
              className={inputCls("subject")}
            />
          </div>
        </div>

        {/* Row 3 — Message full width */}
        <div className="mb-5 md:mb-6">
          <label htmlFor="cf-message" className="block font-medium text-[#0B3D91] text-sm mb-1.5">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            value={form.message}
            onChange={change}
            placeholder="How can we help you?"
            rows={4}
            className={[
              "w-full min-w-0 min-h-[110px] md:min-h-[130px] resize-y bg-white outline-none",
              "px-3 md:px-4 py-2.5 text-sm md:text-base text-[#1F2A44] placeholder:text-slate-400",
              "border-[1.5px]",
              "shadow-[0_3px_12px_rgba(11,61,145,0.10)]",
              "hover:border-[#0B3D91]/60 hover:shadow-[0_5px_16px_rgba(11,61,145,0.15)]",
              "focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/15 focus:shadow-[0_5px_18px_rgba(11,61,145,0.18)]",
              "transition-all duration-300 ease-in-out",
              errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-[#0B3D91]/25",
            ].join(" ")}
          />
          {errors.message && <p className="mt-1.5 text-[11px] text-red-600">{errors.message}</p>}
        </div>

        {/* Submit — unchanged */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B3D91] hover:bg-red-600
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                     hover:-translate-y-0.5 hover:shadow-lg
                     text-white font-semibold px-7 py-3.5 text-sm md:text-base
                     transition-all duration-300 w-full sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending…
            </span>
          ) : "Send Message"}
        </button>

      </form>
    </div>
  );
}
