import NewsAnnouncements from "@/components/news-events/NewsAnnouncements";
import NoticesSection    from "@/components/news-events/NoticesSection";

/**
 * NewsNoticesLayout — server wrapper.
 * Desktop (lg+): News on left 7 cols, Notices on right 5 cols.
 * Mobile: stacked, News first then Notices.
 *
 * Props:
 *   newsData    — optional live news data (passed from NewsNoticesLayoutServer)
 *   noticesData — optional live notices data (passed from NewsNoticesLayoutServer)
 */
export default function NewsNoticesLayout({ newsData, noticesData }) {
  return (
    <section className="w-full bg-[#EEF3FB] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">

          {/* Left: News & Announcements (7 cols) */}
          <div className="lg:col-span-7">
            <NewsAnnouncements data={newsData} />
          </div>

          {/* Right: Notices (5 cols) — divider applied directly, no spacer */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#0B3D91]/15 lg:pl-8 xl:pl-10">
            <NoticesSection data={noticesData} />
          </div>

        </div>
      </div>
    </section>
  );
}
