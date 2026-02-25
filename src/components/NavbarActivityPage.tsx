import { Link } from "react-router-dom";

const NavbarActivityPage = () => {
    return (
        <div className="sticky top-0 h-20 w-full flex px-20 items-center text-xl font-medium">
            <Link to="/" className="size-15 flex gap-4 items-center">
                <img src="/logo.png" />
                <div className="text-2xl">HowWasToday</div>
            </Link>
            <div className="flex gap-5 ml-auto">
                <div>PROFILE</div>
            </div>
        </div>
    )
}

export default NavbarActivityPage;
