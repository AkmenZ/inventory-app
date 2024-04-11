import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin")
    return (
      <div className="flex h-screen items-center justify-center bg-purple-500">
        <h1>Welcome to admin page {session?.user.username}</h1>
      </div>
    );

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Tu neesi admins!</h1>
    </div>
  );
}
