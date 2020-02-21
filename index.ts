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
