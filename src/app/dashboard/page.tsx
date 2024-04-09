import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    return(
        <div>
            <h1>Welcome to dashboard page {session?.user.username}</h1>
        </div>
    );
}