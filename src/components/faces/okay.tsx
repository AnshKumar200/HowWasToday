export const okay = {
    color: "#FEF3C7",
    brows: (
        <>
            <path d="M 20 25 Q 30 20 40 20" />
            <path d="M 90 25 Q 85 20 70 20" />
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
            <path d="M 45 76 Q 55 76 65 77" />
        </>
    ),
    pupils: (
        <>
            <ellipse cx={42} cy={45} rx={7} ry={10} />
            <ellipse cx={68} cy={45} rx={7} ry={10} />
        </>
    )
};
