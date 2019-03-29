# @lazy-node/semver

    create a idea style semver 自動生成類似 IDEA 的版本編號風格

> this module will fail when year > 2099 or year < 2010

## API

> see [here](index.d.ts)

## demo

1. [prepublishOnly.ts](script/prepublishOnly.ts)
2. [demo.ts](test/demo.ts)

## code

```ts
import fs = require("fs");
import date from '../index';

let pkg = JSON.parse(fs.readFileSync('../package.json').toString());

console.log(`old: ${pkg.version}`);
pkg.version = date(pkg.version);
console.log(`new: ${pkg.version}`);

fs.writeFileSync('../package.json', JSON.stringify(pkg, null, 2));
```

---

```ts
import { date } from '../index';

console.log(date('190.1.329001', {
 timestamp: '190.1.329001'
}));
// => 190.1.329002

console.log(date('190.1.329001'));
// => >= 190.1.329002

console.log(date());
// => version by today ex: 190.1.329002
```

