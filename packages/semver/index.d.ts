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
    padZeroPatch?: number;
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
    type IParseReturnArray = [number, number, number, number, number, number];
    interface IParseReturnObject {
        /**
         * YYYY only allow [2010-2099]
         */
        year: number;
        /**
         * M, if use for moment need -1
         */
        month: number;
        /**
         * D
         */
        date: number;
        patch: number;
        major: number;
        minor: number;
    }
    type IParseReturn = IParseReturnArray | IParseReturnArray & IParseReturnObject;
    function parse(version: string, options?: IOptions): IParseReturn;
}
export default date;
