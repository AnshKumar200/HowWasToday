import { useEffect, useState } from "react"

const Navbar = () => {
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
            <div>ICON</div>
            <div className="flex gap-15 ml-auto">
                <div>Home</div>
                <div>Docs</div>
                <div>Login</div>
            </div>
        </div>
    )
}

export default Navbar;
