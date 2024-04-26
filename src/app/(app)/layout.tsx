import SideBar from "@/components/home/SideBar";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-w-full bg-blue-400 ">
      <SideBar />
      <div className="min-w-full">{children}</div>

      <Toaster closeButton richColors />
    </main>
  );
}
