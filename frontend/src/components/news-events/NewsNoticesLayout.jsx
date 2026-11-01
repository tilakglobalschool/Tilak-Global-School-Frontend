import NewsAnnouncements from "@/components/news-events/NewsAnnouncements";
import NoticesSection    from "@/components/news-events/NoticesSection";

/**
 * NewsNoticesLayout — server wrapper.
 * Desktop (lg+): News on left 7 cols, Notices on right 5 cols.
 * Mobile: stacked, News first then Notices.
 * bg-[#EEF3FB] tint contrasts with the white sections around it.
 * Zero rounded-*. Zero literal text.
 *
 * FIX: Removed the invalid `lg:col-span-0` spacer div that was consuming
 * a grid cell and causing the Notices column to shift/disappear.
 * The vertical divider is now applied directly on the Notices column
 * via lg:border-l lg:border-[#0B3D91]/15 lg:pl-8.
 */
export default function NewsNoticesLayout() {
  return (
    <section className="w-full bg-[#EEF3FB] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">

          {/* Left: News & Announcements (7 cols) */}
          <div className="lg:col-span-7">
            <NewsAnnouncements />
          </div>

          {/* Right: Notices (5 cols) — divider applied directly, no spacer */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#0B3D91]/15 lg:pl-8 xl:pl-10">
            <NoticesSection />
          </div>

        </div>
      </div>
    </section>
  );
}
