import { getDocuments } from "@/lib/api";
import { Download, FileText, Calendar } from "lucide-react";

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
  PDF:  "📄", DOC: "📝", DOCX: "📝",
  XLS: "📊", XLSX: "📊",
};

function groupByCategory(docs) {
  const map = {};
  for (const doc of docs) {
    if (!map[doc.category]) map[doc.category] = [];
    map[doc.category].push(doc);
  }
  // Return sorted by CATEGORY_ORDER, then any extras alphabetically
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
  const grouped = groupByCategory(documents);
  const hasData = documents.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">Resources</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91]">
          Downloads &amp; Mandatory Disclosure
        </h1>
        <p className="mt-3 text-[#5B6785] max-w-2xl">
          CBSE mandatory disclosures, school policies, academic resources and downloadable forms.
        </p>
      </div>

      {error && (
        <p className="text-sm text-[#5B6785] italic">
          Documents are currently unavailable. Please check back soon or contact the school office.
        </p>
      )}

      {!error && !hasData && (
        <p className="text-sm text-[#5B6785] italic">
          No documents have been uploaded yet. Please check back soon.
        </p>
      )}

      {hasData && (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, docs]) => (
            <section key={category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-[#C8102E]" />
                <h2 className="font-serif text-xl font-bold text-[#0B3D91]">{category}</h2>
                <span className="text-xs text-[#5B6785] bg-[#E8F1FB] px-2 py-0.5 rounded-full">
                  {docs.length} {docs.length === 1 ? "file" : "files"}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {docs.map((doc) => (
                  <a
                    key={doc._id}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 border border-[#E3E9F2]
                               hover:border-[#0B3D91] hover:bg-[#E8F1FB]
                               p-4 rounded-lg transition-all duration-200"
                  >
                    <span className="text-2xl shrink-0 mt-0.5">
                      {FILE_ICONS[doc.fileType] || "📄"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1F2A44] group-hover:text-[#0B3D91]
                                     leading-snug line-clamp-2 transition-colors">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {doc.fileType}
                        </span>
                        {doc.fileSizeKb && (
                          <span className="text-[10px] text-[#5B6785]">{doc.fileSizeKb} KB</span>
                        )}
                        {doc.issueDate && (
                          <span className="text-[10px] text-[#5B6785] flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(doc.issueDate).toLocaleDateString("en-IN", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#5B6785] group-hover:text-[#0B3D91]
                                         shrink-0 ml-auto mt-1 transition-colors" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
