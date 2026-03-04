import { amazing } from './amazing'
import { bad } from './bad';
import { good } from './good'
import { meh } from './meh';
import { okay } from './okay';
import { empty } from './empty'

export type FaceType = "amazing" | "good" | "okay" | "meh" | "bad" | "empty";

export const FACES = {
    amazing,
    good,
    okay,
    meh,
    bad,
    empty
}
