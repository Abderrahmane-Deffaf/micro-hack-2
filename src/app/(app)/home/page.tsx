import Link from "next/link";
import fileUpoload from '@/assets/home/fileUpload.svg' ; 
import Image from "next/image";

export default function page() {

  return (
    <div className=" flex container flex-col  gap-8  ">
      <h1 className=" text-black">All Files</h1>
      <div>
        <Link
          className=" flex gap-2 w-fit   rounded-3xl  bg-gradient-to-r from-orange-500 to-orange-300 text-white font-semibold px-4 py-2 "
          href="/home/file"
        >
          <span>New File</span>
          <Image src={fileUpoload} alt="file upload" />
        </Link>
      </div>
    </div>
  );
}
