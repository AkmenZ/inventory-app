"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return <Button onClick={handleSignOut}>Iziet</Button>;
}
