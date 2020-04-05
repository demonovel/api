import express, { urlencoded } from 'express';
import fileRouter from './router/file';
import dbRouter from './router/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/file/', fileRouter());
app.use('/db/', dbRouter());
app.use('/env', (req, res, next) => {
	let data = Object.entries(process.env)
		.reduce((a, [k, v]) => {

			if (!/^npm_(?:config|package|lifecycle)_/.test(k))
			{
				a[k] = v?.length;
			}

			return a
		}, {} as Record<keyof typeof process.env, number>);

	res.contentType('json');

	res.end(JSON.stringify({
		timestamp: Date.now(),
		data,
	}, null, 2));
});

app.use('/*', (req, res, next) => {

	let { path, baseUrl } = req;

	res.status(404).json({
		error: true,
		timestamp: Date.now(),
		baseUrl,
		path,
	} as any)
});

export default app
