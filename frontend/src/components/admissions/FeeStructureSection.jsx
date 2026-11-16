import { feeStructure as d } from "@/data/admissions";
import { getFees } from "@/lib/api";

/**
 * FeeStructureSection — server component.
 * Fetches live fee data from API (backend MongoDB).
 * Falls back to static placeholder if API fails.
 * Includes: full fee table (all classes), bus/transport charges, payment info.
 */
export default async function FeeStructureSection() {
  const { data } = await getFees();
  const apiFees = data?.fees || [];

  // Map API fee rows to display rows
  const rows = apiFees.length > 0
    ? apiFees.map((fee) => ({
        classLabel:      fee.classGroup,
        admissionFee:    fee.admissionFee      != null ? `₹ ${fee.admissionFee.toLocaleString("en-IN")}` : "—",
        tuitionFee:      fee.tuitionFeePerMonth != null && fee.tuitionFeePerMonth > 0
          ? `₹ ${fee.tuitionFeePerMonth.toLocaleString("en-IN")} / month`
          : "—",
        otherCharges:    fee.otherCharges      != null && fee.otherCharges > 0
          ? `₹ ${fee.otherCharges.toLocaleString("en-IN")}`
          : "—",
        fullSession:     fee.fullSessionTotal   != null && fee.fullSessionTotal > 0
          ? `₹ ${fee.fullSessionTotal.toLocaleString("en-IN")}`
          : "—",
        notes:           fee.notes || "",
      }))
    : d.rows;

  // Split rows: standard (up to Class X) vs XI streams
  const standardRows = rows.filter(r => !r.classLabel.includes("XI"));
  const xiRows       = rows.filter(r => r.classLabel.includes("XI"));

  return (
    <section className="w-full bg-[#EEF3FB] border-t border-[#0B3D91]/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {d.eyebrow}
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
          </span>
          <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
          <p className="mt-3 text-xs md:text-sm text-gray-500">Session 2026-27 · New Students</p>
        </div>

        {/* ── Standard Table (Play Group – Class X) ── */}
        {standardRows.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-[#0B3D91] mb-3 uppercase tracking-wider">
              Play Group to Class X
            </h3>
            <div className="overflow-x-auto border border-[#0B3D91]/20 mb-8">
              <table className="w-full min-w-[700px] text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0B3D91] text-white">
                    {["Class Group", "Admission Fee", "Tuition Fee / Month", "Other Charges", "Full Session Fee"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-white/20 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B3D91]/10">
                  {standardRows.map((row, i) => (
                    <tr key={row.classLabel} className={`hover:bg-[#dce8f8] transition-colors duration-200 ${i % 2 === 0 ? "bg-white" : "bg-[#F4F7FC]"}`}>
                      <td className="px-4 py-3 font-semibold text-[#0B3D91] text-xs md:text-sm border-r border-[#0B3D91]/10">{row.classLabel}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">{row.admissionFee}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">{row.tuitionFee}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">
                        {row.otherCharges}
                        {row.notes && <p className="text-[10px] text-gray-500 mt-0.5 italic">{row.notes}</p>}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-700 text-xs md:text-sm">{row.fullSession}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── XI Streams Table ── */}
        {xiRows.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-[#0B3D91] mb-3 uppercase tracking-wider">
              Class XI — Stream-wise Fee
            </h3>
            <div className="overflow-x-auto border border-[#0B3D91]/20 mb-8">
              <table className="w-full min-w-[700px] text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0B3D91] text-white">
                    {["Stream", "Admission Fee", "Club Activity Fee", "Full Session (New)", "Full Session (Old)", "Details"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-white/20 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B3D91]/10">
                  {xiRows.map((row, i) => (
                    <tr key={row.classLabel} className={`hover:bg-[#dce8f8] transition-colors duration-200 ${i % 2 === 0 ? "bg-white" : "bg-[#F4F7FC]"}`}>
                      <td className="px-4 py-3 font-semibold text-[#0B3D91] text-xs md:text-sm border-r border-[#0B3D91]/10">{row.classLabel}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">{row.admissionFee}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">₹ 1,200</td>
                      <td className="px-4 py-3 font-medium text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">{row.fullSession}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs md:text-sm border-r border-[#0B3D91]/10">—</td>
                      <td className="px-4 py-3 text-xs text-gray-500 italic">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Payment Schedule Info ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Installment Schedule */}
          <div className="bg-white border border-[#0B3D91]/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-red-600" />
              <h3 className="text-sm font-semibold text-[#0B3D91] uppercase tracking-wider">
                Payment Schedule
              </h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700">
              <li className="flex gap-3 pb-2 border-b border-gray-100">
                <span className="font-semibold text-[#0B3D91] min-w-[130px]">I Installment</span>
                <span>At the time of Admission (upto 10th April)</span>
              </li>
              <li className="flex gap-3 pb-2 border-b border-gray-100">
                <span className="font-semibold text-[#0B3D91] min-w-[130px]">II Installment</span>
                <span>Upto 10th July</span>
              </li>
              <li className="flex gap-3 pb-2 border-b border-gray-100">
                <span className="font-semibold text-[#0B3D91] min-w-[130px]">III Installment</span>
                <span>Upto 10th October</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[#0B3D91] min-w-[130px]">IV Installment</span>
                <span>Upto 10th January</span>
              </li>
            </ul>
          </div>

          {/* Transport Charges */}
          <div className="bg-white border border-[#0B3D91]/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-red-600" />
              <h3 className="text-sm font-semibold text-[#0B3D91] uppercase tracking-wider">
                Transport Charges (Per Month)
              </h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700">
              <li className="flex gap-3 pb-2 border-b border-gray-100">
                <span className="font-semibold text-[#0B3D91] min-w-[80px]">Bus</span>
                <span>₹ 700 (0–2 km) + ₹ 250 per additional km</span>
              </li>
              <li className="flex gap-3 pb-2 border-b border-gray-100">
                <span className="font-semibold text-[#0B3D91] min-w-[80px]">Van</span>
                <span>₹ 1,500 (0–3 km) + ₹ 200 per additional km</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[#0B3D91] min-w-[80px]">Auto</span>
                <span>₹ 1,000 (0–3 km) + ₹ 200 per additional km</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Important Notes ── */}
        <div className="bg-white border-l-4 border-[#0B3D91] px-5 py-4">
          <h3 className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-3">
            Important Notes
          </h3>
          <ol className="space-y-1.5 text-xs md:text-sm text-gray-700 list-decimal list-inside">
            <li>Class fee is divided into four installments as per the payment schedule above.</li>
            <li>Admission fee and deposit are <strong>non-refundable</strong> for any reason.</li>
            <li>Fees must be deposited only by <strong>cash or online mode</strong>.</li>
            <li>Late fee penalty: <strong>₹ 100 per week</strong> after the due date.</li>
            <li>Club Activity Fee (₹ 1,200) is applicable for Class III and above.</li>
          </ol>
        </div>

      </div>
    </section>
  );
}
