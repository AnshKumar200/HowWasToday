
export const bad = {
    color: "#D1D5DB",
    brows: (
        <>
            <path d="M 30 33 Q 35 32 40 30" />
            <path d="M 80 33 Q 75 32 70 30" />
        </>
    ),
    eyes: (
        <>
            <path d="M 20 50 A 15 16 0 0 0 50 44 Q 25 50 18 50" />
            <path d="M 90 50 A 15 16 0 0 1 60 44 Q 95 50 92 50" />
        </>
    ),
    mouth: (
        <>
            <path d="M 50 75 Q 55 74 60 74" />
        </>
    ),
    pupils: (
        <>
            <ellipse cx={42} cy={53} rx={7} ry={8} />
            <ellipse cx={68} cy={53} rx={7} ry={8} />
        </>
    )
};
