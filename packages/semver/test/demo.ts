import { date } from '../index';

console.log(date('190.1.329001', {
	timestamp: '190.1.329001'
}));
// => 190.1.329002

console.log(date('190.1.329001'));
// => >= 190.1.329002

console.log(date());
// => version by today ex: 190.1.329002

console.log(date.parse('190.1.329001', {
	timestamp: '190.1.329001'
}));

//console.log(date.parse('090.1.1029001', {
//	timestamp: '090.1.1029001'
//}));
