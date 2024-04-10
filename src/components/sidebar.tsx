import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="inset-y-0 left-0 w-56 overflow-auto">
        <nav>
          <ul>
            <li>
              <Link
                href="/dashboard"
                className="block p-4 m-2 text-center hover:bg-blue-300"
              >
                Kopskats
              </Link>
            </li>
            <li>
              <Link
                href="/inventory"
                className="block p-4 m-2 text-center hover:bg-blue-300"
              >
                Inventorija
              </Link>
            </li>
            {session?.user?.role === "admin" ? (
              <li>
                <Link
                  href="/admin"
                  className="block p-4 m-2 text-center hover:bg-blue-300"
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
