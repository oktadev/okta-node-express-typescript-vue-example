import {ColumnSet, IDatabase, IMain} from "pg-promise";
import {IResult} from "pg-promise/typescript/pg-subset";
import sqlProvider = require("../sql");

const sql = sqlProvider.guitars;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class GuitarsRepository {
    private static cs: IGuitarColumnSets;
    private db: IDatabase<any>;
    private pgp: IMain;

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;
        // set-up all ColumnSet objects, if needed:
        this.createColumnSets();
    }

    // Creates the table;
    public create() {
        return this.db.none(sql.create);
    }

    // Drops the table;
    public drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    public empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new record and returns the full object;
    // It is also an example of mapping HTTP requests into query parameters;
    public add(values: any) {
        return this.db.one(sql.add, {
            name: values.name,
            userId: values.userId,
        });
    }

    // Tries to delete a guitar by id, and returns the number of records deleted;
    public remove(values: any) {
        return this.db.result(sql.remove, {
            id: values.id,
            userId: values.userId,
        }, (r: IResult) => r.rowCount);
    }

    // Tries to find a user guitar from user id + name;
    public find(values: any) {
        return this.db.any(sql.find, {
            name: `%${ values.name }%`,
            userId: values.userId,
        });
    }

    // Returns all guitar records;
    public all(values: any) {
        return this.db.any(sql.all, { userId: values.userId });
    }

    // Returns the total number of guitars;
    public total(values: any) {
        return this.db.one(sql.total, { userId: values.userId }, (data: { total: number }) => {
            return {
                total: +data.total,
            };
        } );
    }

    // example of setting up ColumnSet objects:
    private createColumnSets() {
        // create all ColumnSet objects only once:
        if (!GuitarsRepository.cs) {
            const helpers = this.pgp.helpers;
            const cs: IGuitarColumnSets = {};

            const table = new helpers.TableName({table: "guitars", schema: "public"});

            cs.insert = new helpers.ColumnSet(["name"], {table});
            cs.update = cs.insert.extend(["?id", "?user_id"]);

            GuitarsRepository.cs = cs;
        }
    }
}

interface IGuitarColumnSets {
    insert?: ColumnSet;
    update?: ColumnSet;
}
