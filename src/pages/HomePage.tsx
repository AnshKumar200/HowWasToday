import { ChevronDown } from "lucide-react"
import { SiAndroid, SiGithub } from "react-icons/si"
import { Link } from "react-router-dom"
import { Cube } from "../components/Cubes"
import NavbarMainPage from "../components/NavbarMainPage"

const HomePage = () => {
    return (
        <div className="">
            <NavbarMainPage />
            <div className="flex flex-col min-h-screen gap-5 p-6">
                <div className="flex flex-col items-center gap-5 flex-1 justify-center">
                    <div className="text-5xl flex flex-col items-center gap-4">
                        <div className="flex gap">
                            <Cube face={"amazing"} />
                            <Cube face={"good"} />
                            <Cube face={"okay"} />
                            <Cube face={"meh"} />
                            <Cube face={"bad"} />
                        </div>
                        <div>every <span className="bg-[#DDD6FE] px-2 rounded-2xl">Good</span>, <span className="bg-[#BFDBFE] px-2 rounded-2xl">Meh</span> and <span className="bg-[#FBCFE8] px-2 rounded-2xl">Amazing</span> day - all in one place.</div>
                        <div>So... how was today, really?</div>
                    </div>
                    <div className="flex flex-col gap-5 text-lg font-medium w-fit">
                        <Link to='activity' className="p-4 rounded-xl flex gap-2 items-center bg-black text-white justify-center">
                            <div>Get Started</div>
                        </Link>

                        <div className="flex gap-5">
                            <button className="p-4 rounded-xl flex gap-2 items-center bg-white justify-center">
                                <SiGithub />
                                <div>View on GitHub</div>
                            </button>
                            <button className="p-4 bg-green-200 rounded-xl flex gap-2 items-center justify-center">
                                <SiAndroid />
                                <div>Download for Android (Soon)</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                    <div>Scroll Down!</div>
                    <ChevronDown />
                </div>
            </div>

            <div>
                <div>Why this exists?</div>
                <div>We forget how our days actually felt.</div>
                <div>
                    The weeks blur. The months disappear.
                    And when you look back, it’s hard to say what your year was really like.
                    This helps you remember — not with words, but with patterns.
                </div>
            </div>
        </div>
    )
}

export default HomePage;
