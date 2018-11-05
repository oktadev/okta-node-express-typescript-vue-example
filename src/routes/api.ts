import * as express from "express";
import pgPromise from "pg-promise";

export const register = ( app: express.Application ) => {
	const oidc = app.locals.oidc;
	const port = parseInt( process.env.PGPORT || "5432", 10 );
	const config = {
		database: process.env.PGDATABASE || "postgres",
		host: process.env.PGHOST || "localhost",
		port,
		user: process.env.PGUSER || "postgres"
	};

	const pgp = pgPromise();
	const db = pgp( config );

	app.get( "/api/guitars/all", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const guitars = await db.any( `
                SELECT
                    id
                    , brand
                    , model
                    , year
                    , color
                FROM    guitars
                WHERE   user_id = $[userId]
                ORDER BY year, brand, model`, { userId } );
			return res.json( guitars );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );

	app.get( "/api/guitars/total", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const total = await db.one( `
            SELECT  count(*) AS total
            FROM    guitars
            WHERE   user_id = $[userId]`, { userId }, ( data: { total: number } ) => {
				return {
					total: +data.total
				};
			} );
			return res.json( total );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );

	app.get( "/api/guitars/find/:search", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const guitars = await db.any( `
                SELECT
                    id
                    , brand
                    , model
                    , year
                    , color
                FROM    guitars
                WHERE   user_id = $[userId]
                AND   ( brand ILIKE $[search] OR model ILIKE $[search] )`,
			{ userId, search: `%${ req.params.search }%` } );
			return res.json( guitars );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );

	app.post( "/api/guitars/add", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const id = await db.one( `
                INSERT INTO guitars( user_id, brand, model, year, color )
                VALUES( $[userId], $[brand], $[model], $[year], $[color] )
                RETURNING id;`,
			{ userId, ...req.body } );
			return res.json( { id } );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );

	app.post( "/api/guitars/update", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const id = await db.one( `
                UPDATE guitars
                SET brand = $[brand]
                    , model = $[model]
                    , year = $[year]
                    , color = $[color]
                WHERE
                    id = $[id]
                    AND user_id = $[userId]
                RETURNING
                    id;`,
			{ userId, ...req.body } );
			return res.json( { id } );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );

	app.delete( "/api/guitars/remove/:id", oidc.ensureAuthenticated(), async ( req: any, res ) => {
		try {
			const userId = req.userContext.userinfo.sub;
			const id = await db.result( `
                DELETE
                FROM    guitars
                WHERE   user_id = $[userId]
                AND     id = $[id]`,
			{ userId, id: req.params.id }, ( r ) => r.rowCount );
			return res.json( { id } );
		} catch ( err ) {
			// tslint:disable-next-line:no-console
			console.error( err ); // eslint-disable-line no-console
			res.json( { error: err.message || err } );
		}
	} );
};
