
import fs = require("fs");
import path = require("path");
import date from '../index';

let file = path.join(__dirname, '../package.json');

let pkg = JSON.parse(fs.readFileSync(file).toString());

console.log(`old: ${pkg.version}`);
pkg.version = date(pkg.version);
console.log(`new: ${pkg.version}`);

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
