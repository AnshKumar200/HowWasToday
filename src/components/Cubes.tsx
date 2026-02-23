const happy = {
    lBrow: "M 20 25 Q 25 0 40 10",
    rBrow: "",
    lEye: { r: "18", cx: 35, cy: 45 },
    rEye: { r: "18", cx: 75, cy: 45 },
    lEyePupil: { cx: 42, cy: 45, rx: 7, ry: 10 },
    rEyePupil: { cx: 68, cy: 45, rx: 7, ry: 10 },
    mouth: "M 35 75 Q 50 90 65 78"
};

export const Cube = ({ face }: { face: string }) => {
    let current = happy;
    if (face === "sad") return <div>sad</div>
    return (
        <svg viewBox="0 0 110 110" className="size-30">
            <rect width={90} height={90} x="10" y="10" rx={20} ry={20} fill="#FCA5A5" />
            <path d={current.lBrow} fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <path d={current.rBrow} fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <circle r={current.lEye.r} cx={current.lEye.cx} cy={current.lEye.cy} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />
            <circle r={current.rEye.r} cx={current.rEye.cx} cy={current.rEye.cy} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />

            <ellipse cx={current.lEyePupil.cx} cy={current.lEyePupil.cy} rx={current.lEyePupil.rx} ry={current.lEyePupil.ry} fill="black" />
            <ellipse cx={current.rEyePupil.cx} cy={current.rEyePupil.cy} rx={current.rEyePupil.rx} ry={current.rEyePupil.ry} fill="black" />
            <path d={current.mouth} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />

        </svg>
    )
}
