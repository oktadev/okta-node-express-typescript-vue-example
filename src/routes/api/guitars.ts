const register = async ( { db, api }: { db: any, api: any } ) => {
	api.post( "/guitars/add", ( req: any, userId: string ) => {
		return db.guitars.create( { userId, ...req.body } );
	} );

	api.remove( "/guitars/remove/:id", ( req: any, userId: string ) => {
		return db.guitars.remove( { userId, ...req.params } );
	} );

	api.get( "/guitars/find/:search", ( req: any, userId: string ) => {
		return db.guitars.find( { userId, ...req.params } );
	} );

	api.get( "/guitars/all", ( req: any, userId: string ) => {
		return db.guitars.all( { userId } );
	} );

	api.get( "/guitars/total", ( req: any, userId: string ) => {
		return db.guitars.total( { userId } );
	} );
};

export { register };
