"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ReactNode, useEffect, useState } from "react";

interface NavButtonProps {
  pathname: string;
  children: ReactNode;
}

export default function NavButton({ pathname, children }: NavButtonProps) {
  const path = usePathname();
  const [isActive, setIsActive] = useState(false);

  // update active state on router path change
  useEffect(() => {
    setIsActive(path === pathname);
  }, [path, pathname]); // refresh when router path or prop pathname changes

  return (
    <Button className={`${isActive ? "bg-yellow-600 hover:bg-yellow-600/70" : "bg-primary"} text-white`}>
      {children}
    </Button>
  );
}
