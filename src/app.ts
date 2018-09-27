import bodyParser from "body-parser";
import express from "express";
import db from "./db";
import * as routes from "./routes";

export async function initialize() {
    const app = express();
    app.use(bodyParser.json());
    routes.register(app, db);

    return app;
}
