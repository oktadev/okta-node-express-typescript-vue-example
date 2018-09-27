import dotenv from "dotenv";
dotenv.config();

import { initialize } from "./app";

const port = process.env.SERVER_PORT || 3000;

const start = async () => {
    const app = await initialize();
    return new Promise( (resolve, reject) => {
        app.listen( port, () => {
            return resolve();
        } );
    } );
};

start().then( () => {
    // tslint:disable no-console
    console.log("server started");
});
