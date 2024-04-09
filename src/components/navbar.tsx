import { ThemeSwitch } from "./theme-switch";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignOutButton from "./sign-out-button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center">
      <div>
        <Button>X</Button>
      </div>
      <h1>LOGO</h1>
      <div className="flex items-center space-x-4">
        <ThemeSwitch></ThemeSwitch>
        {session?.user ? <SignOutButton></SignOutButton> : null}
      </div>
    </header>
  );
}
