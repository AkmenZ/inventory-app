import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-full items-center justify-center bg-red-500">
      <h1>Welcome to inventory page {session?.user.username}</h1>
    </div>
  );
}
