import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if(session?.user.role === "admin")
    return(
        <div>
            <h1>Welcome to admin page {session?.user.username}</h1>
        </div>
    );

    return(
        <div>
            <h1>User is not admin</h1>
        </div>
    );
}