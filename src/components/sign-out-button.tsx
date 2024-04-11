"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };

  return (
    <Button className="text-white" onClick={handleSignOut}>
      Iziet
    </Button>
  );
}
