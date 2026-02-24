// amazing, good, okay, meh, bad
// adds context? optional: tiring, productive, relaxing, stressful, fun, overwhelming, lazy, motivated

import { faces, type FaceType } from './faces'

export const Cube = ({ face }: { face: FaceType }) => {
    let current = faces[face] ?? faces.good;
    return (
        <svg viewBox="0 0 110 110" className="size-30">
            <rect width={90} height={90} x="10" y="10" rx={20} ry={20} fill={current.color} />

            <g stroke="black" strokeWidth={2} fill="none" strokeLinecap="round">
                {current.brows}
                {current.eyes}
                {current.mouth}
            </g>

            <g fill="black">
                {current.pupils}
            </g>
        </svg>
    )
}
