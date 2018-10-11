import dotenv from "dotenv";
dotenv.config();

import { initialize } from "./app";
const DEFAULT_PORT = 8800;

const port = process.env.SERVER_PORT || DEFAULT_PORT;

const start = async () => {
	const app = await initialize();
	return new Promise( ( resolve ) => {
		app.listen( port, () => {
			return resolve();
		} );
	} );
};

start().then( () => {
	// tslint:disable no-console
	console.log( "server started" ); // eslint-disable-line no-console
} );
