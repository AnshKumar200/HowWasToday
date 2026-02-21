import { SiAndroid, SiGithub } from "react-icons/si"

export default function HomePage() {
    return (
        <div className="">
            <div className="flex flex-col items-center min-h-screen border-6 justify-center gap-5">
                <div className="text-5xl flex flex-col items-center">
                    <div>Every ‘good’, ‘meh’, and ‘amazing’ day - all in one place.</div>
                    <div>So... how was today, really?</div>
                </div>
                <div className="flex flex-col gap-5 text-xl font-medium">
                    <button className="p-4 bg-violet-200 rounded-xl">Get Started</button>
                    <div className="flex gap-5">
                        <button className="p-4 rounded-xl flex gap-2 items-center bg-white">
                            <SiGithub />
                            <div>View on GitHub</div>
                        </button>
                        <button className="p-4 bg-green-200 rounded-xl flex gap-2 items-center">
                            <SiAndroid />
                            <div>Download for Android (Launching Soon)</div>
                        </button>
                    </div>
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
