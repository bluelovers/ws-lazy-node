/**
 * Created by user on 2019/3/29.
 */

import moment = require("moment");

export const enum EnumSemverDateStyle
{
	YEAR = 0,
	IDEA = 1
}

export interface IOptions
{
	timestamp?: moment.MomentInput | moment.Moment,
	major?: number | string,
	minor?: number | string,
	padZero?: number;
	style?: EnumSemverDateStyle
}

/**
 * create a idea style semver (190.1.329002)
 */
export function date(old?: string, options: IOptions = {})
{
	let now = moment();
	let patch: string | number = 1;
	let major: string | number = (options.major as number) | 0;
	let minor: string | number = (options.minor as number) | 0;

	if (options.style == null)
	{
		options.style = EnumSemverDateStyle.IDEA;
	}

	let _v1 = date.parse(old, options);

	if (!major && _v1)
	{
		major = _v1[4] | 0;
	}

	if (!minor && _v1)
	{
		minor = _v1[5] | 0;
	}

	let _v2: ReturnType<typeof date.parse>;

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

	let yf = options.style ? `YY` : `YYYY`;

	major = String(major || 0).padStart(options.padZero, '0');
	patch = String(patch).padStart(3, '0')

	return timestamp.format(`${yf}${major}.${minor}.MDD${patch}`)
}

export namespace date
{
	export function parse(version: string,
		options: IOptions = {},
	): [number /*year*/, number /*year*/, number /*month*/, number /*date*/, number /*major*/, number /*minor*/]
	{
		if (typeof version === 'string')
		{
			if (options.style == null)
			{
				options.style = EnumSemverDateStyle.IDEA;
			}

			if (options.style)
			{
				if (version.match(/^(\d{2})(\d*)\.(\d+)\.(\d)(\d{2})(\d*)$/))
				{
					// @ts-ignore
					return [(RegExp.$1 | 0) + 2000, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$2, RegExp.$3].map(v => (v as any) | 0)
				}

				return null;
			}

			if (version.match(/^(\d{4})(\d*)\.(\d+)\.(\d)(\d{2})(\d*)$/))
			{
				// @ts-ignore
				return [RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$2, RegExp.$3].map(v => (v as any) | 0)
			}
		}

		return null;
	}
}

export default date
