import Image from "next/image";
import bgImage from "@/assets/login/auth_bg.png";
import { Toaster } from "@/components/ui/sonner";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" relative h-screen w-screen">
      <div className=" relative z-10">{children}</div>
      <Image
        className=" absolute h-screen w-screen z-0 top-0 bottom-0 left-0 right-0 object-cover"
        src={bgImage}
        alt="background"
      />
      <Toaster closeButton richColors />
    </main>
  );
}
