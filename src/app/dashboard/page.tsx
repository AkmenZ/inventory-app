import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen items-center justify-center bg-green-500">
      <h1>Welcome to dashboard page {session?.user.username}</h1>
    </div>
  );
}
