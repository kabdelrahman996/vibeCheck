import Sidebar from "@/app/_components/ui/Sidebar";

export default async function AccountLayout({ children }) {
  return (
    <section className="min-h-[85vh] bg-bg-white px-3 py-5 sm:px-4 sm:py-6 lg:px-6 lg:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-4 sm:gap-6 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar />

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
