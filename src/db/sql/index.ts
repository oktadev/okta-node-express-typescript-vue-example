import { QueryFile, TQueryFileOptions } from "pg-promise";

import path from "path";

export = {
	guitars: {
		add: sql( "guitars/add.sql" ),
		all: sql( "guitars/all.sql" ),
		find: sql( "guitars/find.sql" ),
		remove: sql( "guitars/remove.sql" ),
		total: sql( "guitars/total.sql" )
	}
};

function sql( file: string ): QueryFile {
	const fullPath: string = path.join( __dirname, file );

	const options: TQueryFileOptions = {
		minify: true,
		params: {
			schema: "public"
		}
	};

	const qf: QueryFile = new QueryFile( fullPath, options );

	if ( qf.error ) {
		// tslint:disable no-console
		console.error( qf.error ); // eslint-disable-line no-console
	}

	return qf;
}
