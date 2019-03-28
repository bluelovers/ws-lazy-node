/**
 * Created by user on 2019/3/29.
 */
import moment = require("moment");
export declare const enum EnumSemverDateStyle {
    /**
     * date style semver (20190.1.329002)
     */
    YEAR = 0,
    /**
     * idea style semver (190.1.329002)
     */
    IDEA = 1
}
export interface IOptions {
    timestamp?: moment.MomentInput | moment.Moment;
    /**
     * major version
     */
    major?: number | string;
    /**
     * minor version
     */
    minor?: number | string;
    /**
     * padZero for major
     */
    padZero?: number;
    /**
     * output style
     */
    style?: EnumSemverDateStyle;
}
/**
 * create a idea style semver (190.1.329002)
 * 自動生成類似 IDEA 的版本編號風格
 */
export declare function date(old?: string, options?: IOptions): string;
export declare namespace date {
    /**
     * [year, month, date, patch, major, minor]
     */
    function parse(version: string, options?: IOptions): [number, number, number, number, number, number];
}
export default date;
