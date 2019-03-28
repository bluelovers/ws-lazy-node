/**
 * Created by user on 2019/3/29.
 */
import moment = require("moment");
export declare const enum EnumSemverDateStyle {
    YEAR = 0,
    IDEA = 1
}
export interface IOptions {
    timestamp?: moment.MomentInput | moment.Moment;
    major?: number | string;
    minor?: number | string;
    padZero?: number;
    style?: EnumSemverDateStyle;
}
/**
 * create a idea style semver (190.1.329002)
 */
export declare function date(old?: string, options?: IOptions): string;
export declare namespace date {
    function parse(version: string, options?: IOptions): [number, number, number, number, number, number];
}
export default date;
