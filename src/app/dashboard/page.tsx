import Content from "@/components/dashboardSection/Content";
import Navbar from "@/components/dashboardSection/Navbar";

// `app/page.tsx` is the UI for the `/` URL
export default function Dashboard() {
  return (
    <div className="bg-white ml-2 pl-10 pr-2 pt-10 rounded-md mt-6 ">
      <Navbar />
      <Content />
    </div>
  );
}
