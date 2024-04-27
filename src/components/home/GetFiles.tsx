import { baseUrl } from "@/lib/helper";
import { getUserServer } from "./homeFetchServer";
import { cookies } from "next/headers";
import moment from "moment";
import Link from "next/link";
export default async function GetFiles() {
  try {
    const user = await getUserServer();
    console.log(user);
    const token = cookies().get("auth")?.value;
    if (!!user?._id) {
      const response = await fetch(`${baseUrl}/document/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      return (
        <div className=" flex flex-col gap-2">
          {data.map((file: any) => (
            <div  className=" flex justify-between border border-orange-500 rounded-md p-2 " key={file?._id}>
              <p>{file?.Original_Name}</p>
              <p>{moment(file?.createdAt).format("MMM Do YY")}</p>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);

    return "error in loading files";
  }
}

/* 
{
      _id: '662ca3f6cf852281cdf3b152',
      Document_Author: '662c8dbecf852281cdf3b10f',
      FileSize: 0.10196113586425781,
      Mimetype: 'application/pdf',
      Filename: '1714201590592-serieTD6.pdf',
      Original_Name: 'serieTD6.pdf',
      Encoding: '7bit',
      Path: '/uploads/1714201590592-serieTD6.pdf',
      Current_Version: 1,
      Organisation_Id: '662c8dbecf852281cdf3b10f',
      Text_Path: './uploads/1714201590592-serieTD6.pdf-text.txt',
      Is_Zip: false,
      createdAt: '2024-04-27T07:06:30.949Z',
      updatedAt: '2024-04-27T07:06:30.949Z',
      __v: 0
    },
*/
