/* tslint:disable no-console */
/* eslint-disable no-console */
import dotenv from "dotenv";
import fs from "fs-extra";
import { Client } from "pg";

const init = async () => {
	dotenv.config();
	const client = new Client();
	try {
		await client.connect();
		const sql = await fs.readFile( "./tools/initdb.pgsql", { encoding: "UTF-8" } );
		const statements = sql.split( /;\s*$/m );
		for ( const statement of statements ) {
			if ( statement.length > 3 ) {
				await client.query( statement ); // eslint-disable-line no-await-in-loop
				// console.log( res.command, res.rows );
			}
		}
	} catch ( err ) {
		console.log( err );
		throw err;
	} finally {
		await client.end();
	}
};

init().then( () => {
	console.log( "finished" );
} ).catch( () => {
	console.log( "finished with errors" );
} );
