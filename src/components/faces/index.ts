import { amazing } from './amazing'
import { bad } from './bad';
import { good } from './good'
import { meh } from './meh';
import { okay } from './okay';

export type FaceType = "amazing" | "good" | "okay" | "meh" | "bad";

export const faces = {
    amazing,
    good,
    okay,
    meh,
    bad
}
