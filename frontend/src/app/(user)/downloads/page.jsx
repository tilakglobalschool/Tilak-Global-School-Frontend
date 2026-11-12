import { getDocuments } from "@/lib/api";
import { Download, FileText, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Downloads & Mandatory Disclosure — Tilak Global School",
  description: "Download CBSE mandatory disclosures, notices, academic documents, policies and forms.",
};

const CATEGORY_ORDER = [
  "Disclosure", "Certificate", "Policy",
  "Academic", "Syllabus", "Calendar",
  "Timetable", "Form", "Notice", "Results",
];

const FILE_ICONS = {
  PDF: "\u{1F4C4}", DOC: "\u{1F4DD}", DOCX: "\u{1F4DD}",
  XLS: "\u{1F4CA}", XLSX: "\u{1F4CA}",
};

function groupByCategory(docs) {
  const map = {};
  for (const doc of docs) {
    if (!map[doc.category]) map[doc.category] = [];
    map[doc.category].push(doc);
  }
  const sorted = {};
  for (const cat of CATEGORY_ORDER) {
    if (map[cat]) sorted[cat] = map[cat];
  }
  for (const cat of Object.keys(map)) {
    if (!sorted[cat]) sorted[cat] = map[cat];
  }
  return sorted;
}

export default async function DownloadsPage() {
  const { data, error } = await getDocuments("?status=published&limit=100");
  const documents = data?.documents || [];

  // If no documents, show a placeholder message
  if (documents.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91] mb-3">
            Downloads &amp; Mandatory Disclosure
          </h1>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mb-4" />
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Download CBSE mandatory disclosures, school policies, fee structure, academic documents and admission forms.
          </p>
        </div>
        <div className="text-center py-16 border border-[#0B3D91]/15 bg-[#F4F7FC]">
          <FileText className="w-10 h-10 text-[#0B3D91]/30 mx-auto mb-4" />
          <p className="text-sm text-gray-500">
            No documents have been uploaded yet. Please check back soon or contact the school office.
          </p>
        </div>
      </div>
    );
  }

  const grouped = groupByCategory(documents);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91] mb-3">
          Downloads &amp; Mandatory Disclosure
        </h1>
        <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mb-4" />
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Download CBSE mandatory disclosures, school policies, fee structure, academic documents and admission forms.
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, docs]) => (
          <div key={category}>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[#0B3D91] mb-4
                           border-l-4 border-red-600 pl-3">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {docs.map((doc) => (
                <a key={doc._id}
                  href={doc.fileUrl?.startsWith("http") ? doc.fileUrl
                    : `${process.env.API_URL?.replace("/api", "") || ""}${doc.fileUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 border border-[#0B3D91]/15 bg-white
                             hover:shadow-lg hover:border-[#0B3D91]/30 transition-all duration-300">
                  <span className="text-2xl shrink-0">{FILE_ICONS[doc.fileType] || "\u{1F4C4}"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0B3D91] group-hover:text-red-600 transition-colors
                                 leading-snug mb-1">
                      {doc.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-mono">{doc.fileType}</span>
                      {doc.fileSizeKb && <span>{doc.fileSizeKb} KB</span>}
                      {doc.issueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(doc.issueDate).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#0B3D91] transition-colors shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
