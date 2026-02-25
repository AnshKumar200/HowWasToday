import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const NavbarMainPage = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > prevScrollPos) {
            setVisible(false)
        }
        else {
            setVisible(true)
        }
        setPrevScrollPos(currentScrollPos);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos])

    return (
        <div className={`fixed top-0 h-20 transition duration-300 ${visible ? `translate-y-0` : '-translate-y-full'} w-full flex px-20 items-center text-xl font-medium`}>
            <Link to="/" className="size-15 flex gap-4 items-center">
                <img src="/logo.png" />
                <div className="text-2xl">HowWasToday</div>
            </Link>
            <div className="flex gap-5 ml-auto">
                <Link to="" className="px-5 py-2 rounded-lg hover:bg-red-300 hover:text-white transition duration-200 ease-in-out">Docs</Link>
                <Link to="" className="px-5 py-2 rounded-lg hover:bg-red-300 hover:text-white transition duration-200 ease-in-out">Contact Me</Link>
                <Link to="" className="px-5 py-2 rounded-lg hover:bg-red-300 hover:text-white transition duration-200 ease-in-out">Login</Link>
            </div>
        </div>
    )
}

export default NavbarMainPage;
