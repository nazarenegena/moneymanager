import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[20%_80%] bg-gray-200 h-screen">
      <Sidebar />
      {children}
    </section>
  );
}
