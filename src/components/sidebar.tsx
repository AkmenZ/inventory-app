"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  //const session = await getServerSession(authOptions);
  const { data: session } = useSession();
  const pathname = usePathname();

  if (session?.user) {
    return (
      <div className="inset-y-0 left-0 w-56 overflow-auto flex flex-col justify-between">
        <nav>
          <ul>
            <li>
              <Link
                href="/dashboard"
                className={`block p-4 m-2 text-center hover:bg-blue-600 hover:text-white ${
                  pathname.endsWith("/dashboard")
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                Kopskats
              </Link>
            </li>
            <li>
              <Link
                href="/inventory"
                className={`block p-4 m-2 text-center hover:bg-blue-600 hover:text-white ${
                  pathname.endsWith("/inventory")
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                Inventorija
              </Link>
            </li>
            {session?.user?.role === "admin" ? (
              <li>
                <Link
                  href="/admin"
                  className={`block p-4 m-2 text-center hover:bg-blue-600 hover:text-white ${
                    pathname.endsWith("/admin") ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  Administrācija
                </Link>
              </li>
            ) : null}
            {/* Add more navigation links here */}
          </ul>
        </nav>
      </div>
    );
  }
}
