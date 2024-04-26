"use client";
import Link from "next/link";
import folder from "@/assets/home/folder.svg";
import teams from "@/assets/home/teams.svg";
import settings from "@/assets/home/setting.svg";
import logout from "@/assets/home/logout.svg";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const links = [
  { name: "All Files", path: "/home", icon: folder },
  { name: "Team", path: "/team", icon: teams },
];
export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);

  function handleLogout() {
    document.cookie = "auth=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/auth");
    // logout logic
  }

  return (
    <div className=" relative  w-[20rem] ">
      <div className=" sticky  w-full top-0 left-0   px-8 py-6 bg-slate-900 h-screen flex flex-col justify-between">
        <div className=" space-y-8">
          <h2 className=" text-xl font-bold text-white">Our Logo</h2>
          <ul className=" space-y-4 text-white">
            {links.map((element, index) => (
              <Link
                className={clsx(
                  "flex hover:text-slate-900 hover:bg-white transition-all ease-in-out  justify-between px-4 py-3 rounded-lg",
                  {
                    "bg-white text-slate-900": pathname === element.path,
                  }
                )}
                href={element.path}
                key={index}
              >
                <Image sizes="15x15" src={element.icon} alt={element.name} />
                <span>{element.name}</span>
              </Link>
            ))}
          </ul>
        </div>
        <div className=" text-white">
          <Link
            className={clsx(
              "flex hover:text-slate-900 hover:bg-white transition-all ease-in-out  justify-between px-4 py-3 rounded-lg",
              {
                "bg-white text-slate-900": pathname === "/settigns",
              }
            )}
            href="/settings"
          >
            <Image sizes="15x15" src={settings} alt="settings" />
            <span>Settings</span>
          </Link>
          <Button
            onClick={handleLogout}
            variant="link"
            className=" text-white flex justify-between w-full hover:bg-white hover:text-slate-900 hover:no-underline"
          >
            <Image sizes="15x15" src={logout} alt="logout" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
