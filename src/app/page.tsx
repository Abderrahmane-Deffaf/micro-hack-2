import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/home/logo.svg'
import mainBg from '@/assets/home/bg-main.png' ; 

export default function Home() {

  return (
    <main className="flex relative gap-6">
      <section className=" relative z-10 flex flex-col gap-[5rem]  wrapper">
        <nav className=" py-4">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </nav>
        <div className=" flex flex-col gap-4 max-w-[50%]">
          <h1 className=" text-white">
            Imagine a World Where{" "}
            <span className=" text-orange-400 ">AI Simplifies Your Work:</span>{" "}
            The GED Assistant That Makes You a Document Master
          </h1>
          <Link className=" w-fit bg-gradient-to-r from-orange-500 text-white to-orange-300 px-8 py-2 text-2xl font-bold rounded-3xl " href="/auth">Start the Journy</Link>
        </div>
      </section>

      <Image
        className=" w-screen h-screen z-0 object-cover absolute "
        src={mainBg}
        alt="main bg"
      />
    </main>
  );
}

/* 
const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer AIzaSyCFBj2GzwYz1q2OU-lYjzEbAZ3QC2dlhgA",
    },
  });
  const data = await response.json();
  console.log(data);
*/
