import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignOutButton from "./sign-out-button";
import Link from "next/link";
import NavButton from "./nav-button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full flex flex-col justify-between items-center">
      <div className="w-full flex flex-row justify-between p-4">
        <Image
          className="ml-4"
          src="/zz_logo.png"
          width={120}
          height={40}
          alt="logo"
          priority={false}
        ></Image>
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <p>{`${session.user.firstName} ${session.user.lastName}`}</p>
          ) : null}
          <ThemeSwitch></ThemeSwitch>
          {session?.user ? <SignOutButton></SignOutButton> : null}
        </div>
      </div>

      {session?.user ? (
        <div className="w-full flex justify-center py-4 bg-secondary">
          <nav>
            <ul className="flex list-none m-0 p-0 space-x-4">
              <li>
                <Link href="dashboard">
                  <NavButton pathname="/dashboard">Kopskats</NavButton>
                </Link>
              </li>
              <li>
                <Link href="inventory">
                  <NavButton pathname="/inventory">Inventorija</NavButton>
                </Link>
              </li>
              {session?.user?.role === "admin" && (
                <li>
                  <Link href="admin">
                    <NavButton pathname="/admin">Administrācija</NavButton>
                  </Link>
                </li>
              )}
              {/* Add more navigation links here */}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
