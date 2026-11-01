"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { admissionEnquiry as d } from "@/data/admissions";
import { submitApplication } from "@/lib/api";

export default function AdmissionEnquiryForm() {
  const [values, setValues]     = useState({ studentName: "", classApplying: "", parentMobile: "" });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId]       = useState("");

  const validate = () => {
    const e = {};
    if (!values.studentName.trim())    e.studentName   = "Student name is required.";
    if (!values.classApplying)          e.classApplying = "Please select a class.";
    if (!/^(\+91)?[6-9]\d{9}$/.test(values.parentMobile.replace(/\s/g, "")))
      e.parentMobile = "Enter a valid 10-digit Indian mobile number.";
    return e;
  };

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { data, error } = await submitApplication({
      source:        "enquiry",
      studentName:   values.studentName.trim(),
      classApplying: values.classApplying,
      parentName:    "Enquiry",          // minimal required field
      phone:         values.parentMobile.replace(/\s/g, ""),
    });
    setLoading(false);

    if (error) {
      if (error.status === 429) {
        toast.error("Too many submissions — please wait 15 minutes before trying again.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }

    setAppId(data?.applicationId || "");
    setSubmitted(true);
    toast.success("Enquiry submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="border-2 border-green-500 bg-green-50 px-5 py-6 text-center">
        <p className="text-xs md:text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
          Enquiry Received ✓
        </p>
        {appId && (
          <p className="text-sm font-mono text-green-700 mb-1">
            Application ID: <strong>{appId}</strong>
          </p>
        )}
        <p className="text-sm text-green-700 leading-relaxed">
          Thank you! We will contact you shortly to discuss admission for{" "}
          <strong>{values.studentName}</strong> in{" "}
          <strong>{values.classApplying}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({ studentName: "", classApplying: "", parentMobile: "" }); setAppId(""); }}
          className="mt-4 inline-flex border-2 border-green-600 text-green-700
                     hover:bg-green-600 hover:text-white font-semibold
                     text-xs px-5 py-2 transition-all duration-300"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Student Name */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.studentName.label}
        </label>
        <input
          type="text"
          name="studentName"
          value={values.studentName}
          onChange={handleChange}
          placeholder={d.fields.studentName.placeholder}
          className={`w-full border ${errors.studentName ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700
                      focus:outline-none focus:border-red-600 transition-colors duration-200`}
        />
        {errors.studentName && <p className="mt-1 text-[11px] text-red-600">{errors.studentName}</p>}
      </div>

      {/* Class */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.classApplying.label}
        </label>
        <select
          name="classApplying"
          value={values.classApplying}
          onChange={handleChange}
          className={`w-full border ${errors.classApplying ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700 bg-white
                      focus:outline-none focus:border-red-600 transition-colors duration-200`}
        >
          <option value="">{d.fields.classApplying.placeholder}</option>
          {d.classOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {errors.classApplying && <p className="mt-1 text-[11px] text-red-600">{errors.classApplying}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.parentMobile.label}
        </label>
        <input
          type="tel"
          name="parentMobile"
          value={values.parentMobile}
          onChange={handleChange}
          placeholder={d.fields.parentMobile.placeholder}
          maxLength={13}
          className={`w-full border ${errors.parentMobile ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700
                      focus:outline-none focus:border-red-600 transition-colors duration-200`}
        />
        {errors.parentMobile && <p className="mt-1 text-[11px] text-red-600">{errors.parentMobile}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0B3D91] hover:bg-red-600 disabled:opacity-60
                   text-white font-semibold text-sm py-3 transition-colors duration-300"
      >
        {loading ? "Submitting…" : d.submitLabel}
      </button>
    </form>
  );
}
