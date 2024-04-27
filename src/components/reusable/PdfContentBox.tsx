export default function PdfContentBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" removeScrollBar border border-slate-800 rounded-lg bg-slate-200 text-black p-4 max-h-[20rem] overflow-y-scroll ">
      {children}
    </div>
  );
}
