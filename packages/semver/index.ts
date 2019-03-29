/**
 * Created by user on 2019/3/29.
 */

import moment = require("moment");

export const enum EnumSemverDateStyle
{
	/**
	 * date style semver (20190.1.329002)
	 */
	YEAR = 0,
	/**
	 * idea style semver (190.1.329002)
	 */
	IDEA = 1
}

export interface IOptions
{
	timestamp?: moment.MomentInput | moment.Moment,
	/**
	 * major version
	 */
	major?: number | string,
	/**
	 * minor version
	 */
	minor?: number | string,
	/**
	 * padZero for major
	 */
	padZero?: number;
	padZeroPatch?: number;
	/**
	 * output style
	 */
	style?: EnumSemverDateStyle
}

/**
 * create a idea style semver (190.1.329002)
 * 自動生成類似 IDEA 的版本編號風格
 */
export function date(old?: string, options: IOptions = {})
{
	let now = moment();
	let patch: string | number = 1;
	let major: string | number = (options.major as number) | 0;
	let minor: string | number = (options.minor as number) | 0;

	let style = options.style;

	if (style == null)
	{
		style = EnumSemverDateStyle.IDEA;
	}

	let _v1: date.IParseReturn = date.parse(old, options);

	if (!major && _v1)
	{
		major = _v1[4] | 0;
	}

	if (!minor && _v1)
	{
		minor = _v1[5] | 0;
	}

	let _v2: date.IParseReturn;

	let timestamp = options.timestamp;

	if (typeof timestamp === 'string')
	{
		_v2 = date.parse(timestamp, options);

		if (_v2)
		{
			timestamp = [_v2[0], _v2[1] - 1, _v2[2]];

			if (!major)
			{
				major = _v2[4] | 0;
			}

			if (!minor)
			{
				minor = _v2[5] | 0;
			}
		}
	}

	timestamp = moment(timestamp || now) as moment.Moment;

	if (!timestamp.isValid())
	{
		throw new RangeError(`timestamp not a valid date: ${timestamp}`);
	}

	if (_v1)
	{
		if (!_v2)
		{
			_v2 = [timestamp.year(), timestamp.month() + 1, timestamp.date(), 0, major, minor];
		}

		if (_v1[0] === _v2[0] && _v1[1] === _v2[1] && _v1[2] === _v2[2])
		{
			patch = Math.max(_v2[3], _v1[3], 1) + 1;
		}
		else if (_v2[3])
		{
			patch = Math.max(_v2[3], 1) + 1;
		}
	}

	let year = timestamp.year();

	if (year > 2099 || year < 2010)
	{
		throw new RangeError(`year must in [2010-2099]: ${year}`);
	}

	let yf = style ? `YY` : `YYYY`;

	major = String(major || 0).padStart(options.padZero, '0');
	patch = String(patch).padStart(options.padZeroPatch || 3, '0');

	return timestamp.format(`${yf}${major}.${minor}.MDD${patch}`)
}

export namespace date
{
	export type IParseReturnArray = [number /*year*/, number /*month*/, number /*date*/, number /*patch*/, number /*major*/, number /*minor*/];
	export interface IParseReturnObject
	{
		/**
		 * YYYY only allow [2010-2099]
		 */
		year: number,
		/**
		 * M, if use for moment need -1
		 */
		month: number,
		/**
		 * D
		 */
		date: number,

		patch: number,
		major: number,
		minor: number,
	}

	export type IParseReturn = IParseReturnArray | IParseReturnArray & IParseReturnObject;

	export function parse(version: string,
		options: IOptions = {},
	): IParseReturn
	{
		if (typeof version === 'string')
		{
			let style = options.style;

			if (style == null)
			{
				style = EnumSemverDateStyle.IDEA;
			}

			let arr: IParseReturn;
			let re = new RegExp(`^(\\d{${style ? 2 : 4}})(\\d*)\\.(\\d+)(?:\\.(1[012]|[1-9])(?:(\\d{2})(\\d*?))?)?$`);

			if (version.match(re))
			{
				// @ts-ignore
				arr = [RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$2, RegExp.$3]

				if (style)
				{
					arr[0] = (arr[0] | 0) + 2000;
				}
			}

			if (arr)
			{
				// @ts-ignore
				arr = arr.map(v => (v as any) | 0);

				let [year, month, date, patch, major, minor] = arr;

				if (year > 2099 || year < 2010)
				{
					throw new RangeError(`year must in [2010-2099]: ${year}`);
				}

				return Object.assign(arr, {
					year, month, date, patch, major, minor,
				})
			}
		}

		return null;
	}
}

export default date
