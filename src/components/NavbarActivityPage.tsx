import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarActivityPage = () => {
    const { user } = useAuth();

    return (
        <div className="sticky top-0 h-20 w-full flex px-20 items-center text-xl font-medium">
            <Link to="/" className="size-15 flex gap-4 items-center">
                <img src="/logo.png" />
                <div className="text-2xl">HowWasToday</div>
            </Link>
            <div className="flex gap-5 ml-auto items-center">
                <img src={user?.photoURL || ""} className="size-10 rounded-full" />
                <div>{user?.displayName}</div>
            </div>
        </div>
    )
}

export default NavbarActivityPage;
