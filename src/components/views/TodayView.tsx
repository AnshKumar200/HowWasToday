import { Cube } from "../Cubes"

export const TodayView = () => {
    return (
        <div className="flex flex-col gap-10 items-center">
            <div>So [name], what's today been like for you?</div>
            <div className="flex gap-5">
                <button className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="amazing" />
                    <div>Amazing</div>
                </button>

                <button className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="good" />
                    <div>Good</div>
                </button>
                <button className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="okay" />
                    <div>Okay</div>
                </button>

                <button className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="meh" />
                    <div>Meh</div>
                </button>

                <button className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="bad" />
                    <div>Bad</div>
                </button>
            </div>
            <div>
                {/* after selecting, this shows up */}
                Add some more context? ( fun, tiring.. all those options. )
            </div>
        </div>
    )
}
