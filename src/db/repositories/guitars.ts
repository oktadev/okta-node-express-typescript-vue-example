import { ColumnSet, IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import sqlProvider from "../sql";

const sql = sqlProvider.guitars;

interface IGuitarColumnSets {
	insert?: ColumnSet;
	update?: ColumnSet;
}

export class GuitarsRepository {
	private static cs: IGuitarColumnSets;
	private db: IDatabase<any>;
	private pgp: IMain;

	constructor( db: any, pgp: IMain ) {
		this.db = db;
		this.pgp = pgp;
		this.createColumnSets();
	}

	// Adds a new record and returns the full object;
	// It is also an example of mapping HTTP requests into query parameters;
	public add( values: any ) {
		return this.db.one( sql.add, {
			brand: values.brand,
			color: values.color,
			model: values.model,
			userId: values.userId,
			year: values.year
		} );
	}

	// Updates a record and returns the full object;
	// It is also an example of mapping HTTP requests into query parameters;
	public update( values: any ) {
		return this.db.one( sql.update, {
			brand: values.brand,
			color: values.color,
			id: values.id,
			model: values.model,
			userId: values.userId,
			year: values.year
		} );
	}

	// Tries to delete a guitar by id, and returns the number of records deleted;
	public remove( values: any ) {
		return this.db.result( sql.remove, {
			id: values.id,
			userId: values.userId
		}, ( r: IResult ) => r.rowCount );
	}

	// Tries to find a user guitar from user id + name;
	public find( values: any ) {
		return this.db.any( sql.find, {
			search: `%${ values.search }%`,
			userId: values.userId
		} );
	}

	// Returns all guitar records;
	public all( values: any ) {
		return this.db.any( sql.all, { userId: values.userId } );
	}

	// Returns the total number of guitars;
	public total( values: any ) {
		return this.db.one( sql.total, { userId: values.userId }, ( data: { total: number } ) => {
			return {
				total: +data.total
			};
		} );
	}

	// example of setting up ColumnSet objects:
	private createColumnSets() {
		// create all ColumnSet objects only once:
		if ( !GuitarsRepository.cs ) {
			const helpers = this.pgp.helpers;
			const cs: IGuitarColumnSets = {};

			const table = new helpers.TableName( { table: "guitars", schema: "public" } );

			cs.insert = new helpers.ColumnSet( [ "name" ], { table } );
			cs.update = cs.insert.extend( [ "?id", "?user_id" ] );

			GuitarsRepository.cs = cs;
		}
	}
}
