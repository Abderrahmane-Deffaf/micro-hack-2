import { baseUrl } from "@/lib/helper";
import { getUserServer } from "./homeFetchServer";
import { cookies } from "next/headers";

export default async function GetFiles() {
  try {
    const user = await getUserServer();
    console.log(user);
    const token = cookies().get("auth")?.value;
    if(!!user?._id) {
      const response = await fetch(`${baseUrl}/document/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      const data = await response.json() ; 
      console.log(data);

      return (
        <div>
          {data.map((file: any) => (
            <div key={file?._id}>
              <h1>{file?.name}</h1>
              <p>{file?.description}</p>
            </div>
          ))}
        </div>
      )

    }
  } catch (error) {
    console.log(error);

    return "error in loading files";
  }
}
