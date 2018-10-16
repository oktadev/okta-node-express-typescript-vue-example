import * as api from "./api";
import * as auth from "./auth";

const register = async ( app: any, db: any, oidc: any ) => {
	api.register( app, db, oidc );
	auth.register( app, oidc );

	app.get( "/", ( req: any, res: any ) => {
		const user = req.userContext ? req.userContext.userinfo : null;
		res.render( "index", { isAuthenticated: req.isAuthenticated(), user } );
	} );

	app.get( "/guitars", oidc.ensureAuthenticated(), ( req: any, res: any ) => {
		const user = req.userContext ? req.userContext.userinfo : null;
		res.render( "guitars", { isAuthenticated: req.isAuthenticated(), user } );
	} );
};

export { register };
