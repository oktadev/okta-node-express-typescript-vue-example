// import bodyParser from "body-parser";
import express from "express";
import path from "path";
import db from "./db";
import * as middlewares from "./middlewares";
import * as routes from "./routes";

export async function initialize() {
	const app = express();
	app.set( "views", path.join( __dirname, "views" ) );
	app.set( "view engine", "ejs" );
	app.use( express.json() );
	app.use( express.static( path.join( __dirname, "public" ) ) );
	middlewares.initializeApp( app );
	const { oidc } = middlewares;
	routes.register( app, db, oidc );

	return app;
}
