import * as guitars from "./guitars";

const register = async ( app: any, db: any, oidc: any ) => {
	type IHandler = ( req: any, userId: string ) => any;
	const requestHandler = ( handler: IHandler, req: any, res: any ) => {
		const userId = req.userContext.userinfo.sub;
		handler( req, userId )
			.then( ( data: any ) => {
				res.json( data );
			} )
			.catch( ( error: any ) => {
				res.json( { error: error.message || error } );
			} );
	};
	const api = {
		get: ( url: string, handler: IHandler ) => {
			app.get( `/api${ url }`, oidc.ensureAuthenticated(),
				( req: any, res: any ) => requestHandler( handler, req, res ) );
		},
		post: ( url: string, handler: IHandler ) => {
			app.post( `/api${ url }`, oidc.ensureAuthenticated(),
				( req: any, res: any ) => requestHandler( handler, req, res ) );
		},
		remove: ( url: string, handler: IHandler ) => {
			app.delete( `/api${ url }`, oidc.ensureAuthenticated(),
				( req: any, res: any ) => requestHandler( handler, req, res ) );
		}
	};

	guitars.register( { db, api } );
};

export { register };
