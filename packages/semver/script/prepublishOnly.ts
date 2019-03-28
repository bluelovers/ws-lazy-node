
import fs = require("fs");
import date from '../index';

let pkg = JSON.parse(fs.readFileSync('../package.json').toString());

console.log(`old: ${pkg.version}`);
pkg.version = date(pkg.version);
console.log(`new: ${pkg.version}`);

fs.writeFileSync('../package.json', JSON.stringify(pkg, null, 2));
