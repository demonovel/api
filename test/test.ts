import _fetch from 'cross-fetch';
import Bluebird from 'bluebird';

let body = new URLSearchParams();

body.set('href', 'https://www.itread01.com/content/1545341432.html');

console.dir(body)
console.dir(body.toString())

let server = `http://localhost:3001`;
server = `https://api-file-server.now.sh`;

Bluebird
	.resolve(fetch(`${server}/db/file/dmzj/8daa1a0c`, {
		method: 'POST',
		body
	}))
	.tap(e => e.status > 400 && Promise.reject(e))
	.tapCatch(e => console.error(e))
	.tap(async (e) => (console.log(e), console.log(await e.json())))
	.finally(() => {
		return fetch(`${server}/db/file/dmzj/8daa1a0c`)
			.then(async (v) => console.log(await v.text()))
	})
;



export function fetch(...argv: Parameters<typeof _fetch>)
{
	// @ts-ignore
	let options: RequestInit = argv[1] || {};

	options.redirect = 'follow';

	// @ts-ignore
	argv[1] = options;

	return _fetch(...argv)
}

export default fetch
