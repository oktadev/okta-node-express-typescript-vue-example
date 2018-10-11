// import bodyParser from "body-parser";
import express from "express";
import db from "./db";
import * as middlewares from "./middlewares";
import * as routes from "./routes";

export async function initialize() {
	const app = express();
	app.use( express.json() );
	middlewares.initializeApp( app );
	routes.register( app, db, middlewares.oidc );

	return app;
}
