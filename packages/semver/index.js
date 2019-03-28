"use strict";
/**
 * Created by user on 2019/3/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
/**
 * create a idea style semver (190.1.329002)
 * 自動生成類似 IDEA 的版本編號風格
 */
function date(old, options = {}) {
    let now = moment();
    let patch = 1;
    let major = options.major | 0;
    let minor = options.minor | 0;
    if (options.style == null) {
        options.style = 1 /* IDEA */;
    }
    let _v1 = date.parse(old, options);
    if (!major && _v1) {
        major = _v1[4] | 0;
    }
    if (!minor && _v1) {
        minor = _v1[5] | 0;
    }
    let _v2;
    let timestamp = options.timestamp;
    if (typeof timestamp === 'string') {
        _v2 = date.parse(timestamp, options);
        if (_v2) {
            timestamp = [_v2[0], _v2[1] - 1, _v2[2]];
            if (!major) {
                major = _v2[4] | 0;
            }
            if (!minor) {
                minor = _v2[5] | 0;
            }
        }
    }
    timestamp = moment(timestamp || now);
    if (!timestamp.isValid()) {
        throw new RangeError(`timestamp not a valid date: ${timestamp}`);
    }
    if (_v1) {
        if (!_v2) {
            _v2 = [timestamp.year(), timestamp.month() + 1, timestamp.date(), 0, major, minor];
        }
        if (_v1[0] === _v2[0] && _v1[1] === _v2[1] && _v1[2] === _v2[2]) {
            patch = Math.max(_v2[3], _v1[3], 1) + 1;
        }
        else if (_v2[3]) {
            patch = Math.max(_v2[3], 1) + 1;
        }
    }
    let yf = options.style ? `YY` : `YYYY`;
    major = String(major || 0).padStart(options.padZero, '0');
    patch = String(patch).padStart(3, '0');
    return timestamp.format(`${yf}${major}.${minor}.MDD${patch}`);
}
exports.date = date;
(function (date) {
    /**
     * [year, month, date, patch, major, minor]
     */
    function parse(version, options = {}) {
        if (typeof version === 'string') {
            if (options.style == null) {
                options.style = 1 /* IDEA */;
            }
            if (options.style) {
                if (version.match(/^(\d{2})(\d*)\.(\d+)\.(\d?)(\d{2}?)(\d*?)$/)) {
                    // @ts-ignore
                    return [(RegExp.$1 | 0) + 2000, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$2, RegExp.$3].map(v => v | 0);
                }
                return null;
            }
            if (version.match(/^(\d{4})(\d*)\.(\d+)\.(\d?)(\d{2}?)(\d*?)$/)) {
                // @ts-ignore
                return [RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$2, RegExp.$3].map(v => v | 0);
            }
        }
        return null;
    }
    date.parse = parse;
})(date = exports.date || (exports.date = {}));
exports.default = date;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsaUNBQWtDO0FBbUNsQzs7O0dBR0c7QUFDSCxTQUFnQixJQUFJLENBQUMsR0FBWSxFQUFFLFVBQW9CLEVBQUU7SUFFeEQsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDbkIsSUFBSSxLQUFLLEdBQW9CLENBQUMsQ0FBQztJQUMvQixJQUFJLEtBQUssR0FBcUIsT0FBTyxDQUFDLEtBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQzNELElBQUksS0FBSyxHQUFxQixPQUFPLENBQUMsS0FBZ0IsR0FBRyxDQUFDLENBQUM7SUFFM0QsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksRUFDekI7UUFDQyxPQUFPLENBQUMsS0FBSyxlQUEyQixDQUFDO0tBQ3pDO0lBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFbkMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQ2pCO1FBQ0MsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFDakI7UUFDQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUVELElBQUksR0FBa0MsQ0FBQztJQUV2QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBRWxDLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUNqQztRQUNDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxJQUFJLEdBQUcsRUFDUDtZQUNDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFB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QUMsR0FBRyxDQUN6RixDQUFDLENBQUMsRUFBRSxDQUFFLENBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQTtpQkFDckI7Z0JBRUQsT0FBTyxJQUFJLENBQUM7YUFDWjtZQUVELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxFQUMvRDtnQkFDQyxhQUFhO2dCQUNiLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUNsRztTQUNEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBL0JlLFVBQUssUUErQnBCLENBQUE7QUFDRixDQUFDLEVBckNnQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFxQ3BCO0FBRUQsa0JBQWUsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS8zLzI5LlxuICovXG5cbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtU2VtdmVyRGF0ZVN0eWxlXG57XG5cdC8qKlxuXHQgKiBkYXRlIHN0eWxlIHNlbXZlciAoMjAxOTAuMS4zMjkwMDIpXG5cdCAqL1xuXHRZRUFSID0gMCxcblx0LyoqXG5cdCAqIGlkZWEgc3R5bGUgc2VtdmVyICgxOTAuMS4zMjkwMDIpXG5cdCAqL1xuXHRJREVBID0gMVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zXG57XG5cdHRpbWVzdGFtcD86IG1vbWVudC5Nb21lbnRJbnB1dCB8IG1vbWVudC5Nb21lbnQsXG5cdC8qKlxuXHQgKiBtYWpvciB2ZXJzaW9uXG5cdCAqL1xuXHRtYWpvcj86IG51bWJlciB8IHN0cmluZyxcblx0LyoqXG5cdCAqIG1pbm9yIHZlcnNpb25cblx0ICovXG5cdG1pbm9yPzogbnVtYmVyIHwgc3RyaW5nLFxuXHQvKipcblx0ICogcGFkWmVybyBmb3IgbWFqb3Jcblx0ICovXG5cdHBhZFplcm8/OiBudW1iZXI7XG5cdC8qKlxuXHQgKiBvdXRwdXQgc3R5bGVcblx0ICovXG5cdHN0eWxlPzogRW51bVNlbXZlckRhdGVTdHlsZVxufVxuXG4vKipcbiAqIGNyZWF0ZSBhIGlkZWEgc3R5bGUgc2VtdmVyICgxOTAuMS4zMjkwMDIpXG4gKiDoh6rli5XnlJ/miJDpoZ7kvLwgSURFQSDnmoTniYjmnKznt6jomZ/poqjmoLxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGUob2xkPzogc3RyaW5nLCBvcHRpb25zOiBJT3B0aW9ucyA9IHt9KVxue1xuXHRsZXQgbm93ID0gbW9tZW50KCk7XG5cdGxldCBwYXRjaDogc3RyaW5nIHwgbnVtYmVyID0gMTtcblx0bGV0IG1ham9yOiBzdHJpbmcgfCBudW1iZXIgPSAob3B0aW9ucy5tYWpvciBhcyBudW1iZXIpIHwgMDtcblx0bGV0IG1pbm9yOiBzdHJpbmcgfCBudW1iZXIgPSAob3B0aW9ucy5taW5vciBhcyBudW1iZXIpIHwgMDtcblxuXHRpZiAob3B0aW9ucy5zdHlsZSA9PSBudWxsKVxuXHR7XG5cdFx0b3B0aW9ucy5zdHlsZSA9IEVudW1TZW12ZXJEYXRlU3R5bGUuSURFQTtcblx0fVxuXG5cdGxldCBfdjEgPSBkYXRlLnBhcnNlKG9sZCwgb3B0aW9ucyk7XG5cblx0aWYgKCFtYWpvciAmJiBfdjEpXG5cdHtcblx0XHRtYWpvciA9IF92MVs0XSB8IDA7XG5cdH1cblxuXHRpZiAoIW1pbm9yICYmIF92MSlcblx0e1xuXHRcdG1pbm9yID0gX3YxWzVdIHwgMDtcblx0fVxuXG5cdGxldCBfdjI6IFJldHVyblR5cGU8dHlwZW9mIGRhdGUucGFyc2U+O1xuXG5cdGxldCB0aW1lc3RhbXAgPSBvcHRpb25zLnRpbWVzdGFtcDtcblxuXHRpZiAodHlwZW9mIHRpbWVzdGFtcCA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHRfdjIgPSBkYXRlLnBhcnNlKHRpbWVzdGFtcCwgb3B0aW9ucyk7XG5cblx0XHRpZiAoX3YyKVxuXHRcdHtcblx0XHRcdHRpbWVzdGFtcCA9IFtfdjJbMF0sIF92MlsxXSAtIDEsIF92MlsyXV07XG5cblx0XHRcdGlmICghbWFqb3IpXG5cdFx0XHR7XG5cdFx0XHRcdG1ham9yID0gX3YyWzRdIHwgMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFtaW5vcilcblx0XHRcdHtcblx0XHRcdFx0bWlub3IgPSBfdjJbNV0gfCAwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRpbWVzdGFtcCA9IG1vbWVudCh0aW1lc3RhbXAgfHwgbm93KSBhcyBtb21lbnQuTW9tZW50O1xuXG5cdGlmICghdGltZXN0YW1wLmlzVmFsaWQoKSlcblx0e1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGB0aW1lc3RhbXAgbm90IGEgdmFsaWQgZGF0ZTogJHt0aW1lc3RhbXB9YCk7XG5cdH1cblxuXHRpZiAoX3YxKVxuXHR7XG5cdFx0aWYgKCFfdjIpXG5cdFx0e1xuXHRcdFx0X3YyID0gW3RpbWVzdGFtcC55ZWFyKCksIHRpbWVzdGFtcC5tb250aCgpICsgMSwgdGltZXN0YW1wLmRhdGUoKSwgMCwgbWFqb3IsIG1pbm9yXTtcblx0XHR9XG5cblx0XHRpZiAoX3YxWzBdID09PSBfdjJbMF0gJiYgX3YxWzFdID09PSBfdjJbMV0gJiYgX3YxWzJdID09PSBfdjJbMl0pXG5cdFx0e1xuXHRcdFx0cGF0Y2ggPSBNYXRoLm1heChfdjJbM10sIF92MVszXSwgMSkgKyAxO1xuXHRcdH1cblx0XHRlbHNlIGlmIChfdjJbM10pXG5cdFx0e1xuXHRcdFx0cGF0Y2ggPSBNYXRoLm1heChfdjJbM10sIDEpICsgMTtcblx0XHR9XG5cdH1cblxuXHRsZXQgeWYgPSBvcHRpb25zLnN0eWxlID8gYFlZYCA6IGBZWVlZYDtcblxuXHRtYWpvciA9IFN0cmluZyhtYWpvciB8fCAwKS5wYWRTdGFydChvcHRpb25zLnBhZFplcm8sICcwJyk7XG5cdHBhdGNoID0gU3RyaW5nKHBhdGNoKS5wYWRTdGFydCgzLCAnMCcpO1xuXG5cdHJldHVybiB0aW1lc3RhbXAuZm9ybWF0KGAke3lmfSR7bWFqb3J9LiR7bWlub3J9Lk1ERCR7cGF0Y2h9YClcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBkYXRlXG57XG5cdC8qKlxuXHQgKiBbeWVhciwgbW9udGgsIGRhdGUsIHBhdGNoLCBtYWpvciwgbWlub3JdXG5cdCAqL1xuXHRleHBvcnQgZnVuY3Rpb24gcGFyc2UodmVyc2lvbjogc3RyaW5nLFxuXHRcdG9wdGlvbnM6IElPcHRpb25zID0ge30sXG5cdCk6IFtudW1iZXIgLyp5ZWFyKi8sIG51bWJlciAvKm1vbnRoKi8sIG51bWJlciAvKmRhdGUqLywgbnVtYmVyIC8qcGF0Y2gqLywgbnVtYmVyIC8qbWFqb3IqLywgbnVtYmVyIC8qbWlub3IqL11cblx0e1xuXHRcdGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0aWYgKG9wdGlvbnMuc3R5bGUgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0b3B0aW9ucy5zdHlsZSA9IEVudW1TZW12ZXJEYXRlU3R5bGUuSURFQTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuc3R5bGUpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh2ZXJzaW9uLm1hdGNoKC9eKFxcZHsyfSkoXFxkKilcXC4oXFxkKylcXC4oXFxkPykoXFxkezJ9PykoXFxkKj8pJC8pKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHJldHVybiBbKFJlZ0V4cC4kMSB8IDApICsgMjAwMCwgUmVnRXhwLiQ0LCBSZWdFeHAuJDUsIFJlZ0V4cC4kNiwgUmVnRXhwLiQyLCBSZWdFeHAuJDNdLm1hcChcblx0XHRcdFx0XHRcdHYgPT4gKHYgYXMgYW55KSB8IDApXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZlcnNpb24ubWF0Y2goL14oXFxkezR9KShcXGQqKVxcLihcXGQrKVxcLihcXGQ/KShcXGR7Mn0/KShcXGQqPykkLykpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0cmV0dXJuIFtSZWdFeHAuJDEsIFJlZ0V4cC4kNCwgUmVnRXhwLiQ1LCBSZWdFeHAuJDYsIFJlZ0V4cC4kMiwgUmVnRXhwLiQzXS5tYXAodiA9PiAodiBhcyBhbnkpIHwgMClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRlXG4iXX0=