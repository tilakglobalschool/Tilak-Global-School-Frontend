import Link from "next/link";
import { getNewsBySlug } from "@/lib/api";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { data } = await getNewsBySlug(params.slug);
  const post = data?.post;
  if (!post) return { title: "Post Not Found — Tilak Global School" };
  return {
    title: `${post.title} — Tilak Global School`,
    description: post.summary || post.title,
  };
}

export default async function NewsPostPage({ params }) {
  const { data, error } = await getNewsBySlug(params.slug);
  const post = data?.post;

  if (error || !post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/news-events"
        className="inline-flex items-center gap-1.5 text-sm text-[#5B6785]
                   hover:text-[#0B3D91] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to News &amp; Events
      </Link>

      {post.imageUrl && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-[#E8F1FB]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-semibold bg-[#E8F1FB] text-[#0B3D91] px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        {post.date && (
          <span className="flex items-center gap-1 text-xs text-[#5B6785]">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit", month: "long", year: "numeric",
            })}
          </span>
        )}
        {post.isFeatured && (
          <span className="text-xs font-semibold text-[#C9A24A]">★ Featured</span>
        )}
      </div>

      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#0B3D91] leading-tight mb-4">
        {post.title}
      </h1>

      {post.summary && (
        <p className="text-[#5B6785] text-base leading-relaxed mb-6 border-l-4 border-[#C8102E] pl-4">
          {post.summary}
        </p>
      )}

      {post.body && (
        <div
          className="prose prose-sm max-w-none text-[#1F2A44] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}
    </div>
  );
}
