import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignOutButton from "./sign-out-button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="top-0 left-0 w-full z-50 p-4 flex justify-between items-center">
      <Image
        className="ml-10"
        src="/zz_logo.png"
        width={120}
        height={20}
        alt="logo"
      ></Image>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <p>{`${session.user.firstName} ${session.user.lastName}`}</p>
        ) : null}
        <ThemeSwitch></ThemeSwitch>
        {session?.user ? <SignOutButton></SignOutButton> : null}
      </div>
    </header>
  );
}
