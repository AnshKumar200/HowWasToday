import { useEffect, useState } from "react"

export default function Navbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if(currentScrollPos > prevScrollPos) {
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
        <div className={`fixed top-0 h-20 transition duration-300 ${visible ? `translate-y-0` : '-translate-y-full'} bg-red-300 w-full`}>
            <div>Navbar</div>
        </div>
    )
}
