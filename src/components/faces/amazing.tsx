export const amazing = {
    color: "#FBCFE8",
    brows: (
        <>
            <path d="M 20 20 Q 25 0 45 15" />
            <path d="M 65 15 Q 85 0 90 20" />
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
            <path d="M 45 78 Q 61 95 75 70 Q 62 75 45 74" />
            <path d="M 69 78 Q 63 79 60 80" />
        </>
    ),
    pupils: (
        <>
            <ellipse cx={40} cy={45} rx={9} ry={8} />
            <ellipse cx={70} cy={45} rx={9} ry={8} />
        </>
    )
};
