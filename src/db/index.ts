import pgPromise from "pg-promise";
import {IDatabase, IMain, IOptions} from "pg-promise";
import diagnostics from "./diagnostics";
import {GuitarsRepository, IExtensions} from "./repositories";

const initOptions: IOptions<IExtensions> = {
    extend(obj: IExtensions, dc: any) {
        obj.guitars = new GuitarsRepository(obj, pgp);
    },
};

const pgp: IMain = pgPromise(initOptions);

// Create the database instance with extensions:
const port = parseInt(process.env.PGPORT || "5432", 10);
const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres",
};
const db = pgp(config) as IDatabase<IExtensions> & IExtensions;

diagnostics.init(initOptions);

export default db;
