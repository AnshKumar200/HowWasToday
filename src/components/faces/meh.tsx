export const meh = {
    color: "#BFDBFE",
    brows: (
        <>
            <path d="M 20 30 Q 40 30 40 20" />
            <path d="M 90 30 Q 70 30 70 20" />
        </>
    ),
    eyes: (
        <>
            <circle r={18} cx={35} cy={45} />
            <circle r={18} cx={75} cy={45} />
        </>
    ),
    mouth: (
        <>
            <path d="M 40 75 Q 50 70 55 73 Q 60 73 63 78" />
        </>
    ),
    pupils: (
        <>
            <ellipse cx={42} cy={45} rx={8} ry={10} />
            <ellipse cx={68} cy={45} rx={9} ry={10} />
        </>
    )
};
