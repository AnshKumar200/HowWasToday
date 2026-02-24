export const good = {
    color: "#DDD6FE",
    brows: (
        <>
            <path d="M 20 25 Q 25 0 40 10" />
            <path d="M 90 25 Q 85 10 70 10" />
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
            <path d="M 35 75 Q 50 90 65 78" />
        </>
    ),
    pupils: (
        <>
            <ellipse cx={42} cy={45} rx={7} ry={10} />
            <ellipse cx={68} cy={45} rx={7} ry={10} />
        </>
    )
};
