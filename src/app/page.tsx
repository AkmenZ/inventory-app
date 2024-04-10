import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex flex-col items-center p-24">
      <h1>Sveiks {session?.user.username}</h1>
      <p>Tava autorizācijas loma - {session?.user.role}</p>
    </main>
  );
}
