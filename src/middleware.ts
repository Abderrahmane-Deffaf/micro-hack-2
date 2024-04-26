import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkToken } from "./lib/helper";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth")?.value;
  console.log(token);

  const verify = await checkToken(token);
  const { nextUrl } = request;
  console.log("---------verify", verify);
  if (!verify && nextUrl.pathname.split("/").includes("home")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (verify && nextUrl.pathname.split("/").includes("auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
