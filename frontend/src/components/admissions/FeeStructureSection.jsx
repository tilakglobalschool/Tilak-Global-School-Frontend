import { feeStructure as d } from "@/data/admissions";
import { getFees } from "@/lib/api";

/**
 * FeeStructureSection — server component.
 * Fetches live fee data from API. Falls back to static placeholder if API fails.
 */
export default async function FeeStructureSection() {
  const { data } = await getFees();
  const apiFees = data?.fees || [];

  // Build rows: prefer API data, fall back to static placeholder
  const rows = apiFees.length > 0
    ? apiFees.map((fee) => ({
        classLabel:   fee.classGroup,
        admissionFee: fee.admissionFee     != null ? `₹ ${fee.admissionFee.toLocaleString("en-IN")}` : "To be announced",
        tuitionFee:   fee.tuitionFeePerTerm != null ? `₹ ${fee.tuitionFeePerTerm.toLocaleString("en-IN")} / term` : "To be announced",
        otherCharges: fee.otherCharges     != null ? `₹ ${fee.otherCharges.toLocaleString("en-IN")}` : "To be announced",
        notes:        fee.notes || "",
      }))
    : d.rows; // static fallback

  return (
    <section className="w-full bg-[#EEF3FB] border-t border-[#0B3D91]/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
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
        </div>

        {/* Note */}
        <div className="mb-6 border-l-4 border-red-600 bg-red-50/70 px-4 py-3 max-w-2xl mx-auto">
          <p className="text-[11px] md:text-xs uppercase tracking-wider text-red-700">
            {d.note}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#0B3D91]/20">
          <table className="w-full min-w-[600px] text-sm border-collapse">
            <thead>
              <tr className="bg-[#0B3D91] text-white">
                {["Class Group", "Admission Fee", "Tuition Fee", "Other Charges"].map((h) => (
                  <th key={h}
                    className="px-5 py-4 text-left text-xs md:text-sm font-semibold
                               uppercase tracking-wider whitespace-nowrap
                               border-r border-white/20 last:border-r-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B3D91]/10">
              {rows.map((row, i) => (
                <tr key={row.classLabel}
                  className={`hover:bg-[#dce8f8] transition-colors duration-200
                    ${i % 2 === 0 ? "bg-white" : "bg-[#F4F7FC]"}`}>
                  <td className="px-5 py-4 font-semibold text-[#0B3D91] text-xs md:text-sm whitespace-nowrap border-r border-[#0B3D91]/10">
                    {row.classLabel}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-xs md:text-sm whitespace-nowrap border-r border-[#0B3D91]/10">
                    {row.admissionFee}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-xs md:text-sm whitespace-nowrap border-r border-[#0B3D91]/10">
                    {row.tuitionFee}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-xs md:text-sm">
                    {row.otherCharges}
                    {row.notes && (
                      <p className="text-[10px] text-[#5B6785] mt-0.5 italic">{row.notes}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
