import Link from "next/link";
import fileUpoload from '@/assets/home/fileUpload.svg' ; 
import Image from "next/image";
import { Suspense } from "react";
import DataLoader from "@/components/reusable/DataLoader";
import GetFiles from "@/components/home/GetFiles";

export default function page() {

  return (
    <div className=" flex container flex-col  gap-8  ">
      <h1 className=" text-black">All Files</h1>
      <div className=" flex gap-4">
        <Link
          className=" flex gap-2 w-fit   rounded-3xl  bg-gradient-to-r from-orange-500 to-orange-300 text-white font-semibold px-4 py-2 "
          href="/home/file"
        >
          <span>New Pdf File</span>
          <Image src={fileUpoload} alt="file upload" />
        </Link>
        <Link
          className=" flex gap-2 w-fit   rounded-3xl  bg-gradient-to-r from-orange-500 to-orange-300 text-white font-semibold px-4 py-2 "
          href="/home/audio-file"
        >
          <span>New Audio File</span>
          <Image src={fileUpoload} alt="file upload" />
        </Link>
      </div>
      <h2 className=" font-bold text-2xl ">Files</h2>
      <Suspense fallback={<DataLoader/>}>
        <GetFiles/>
      </Suspense>
    </div>
  );
}
