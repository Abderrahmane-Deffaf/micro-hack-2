import SideBar from "@/components/home/SideBar";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-w-full  ">
      <SideBar />
      <div className="w-full">{children}</div>

      <Toaster closeButton richColors />
    </main>
  );
}
