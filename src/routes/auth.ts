const register = ( app: any, oidc: any ) => {
	app.get( "/logout", ( req: any, res: any ) => {
		req.logout();
		res.redirect( "/" );
	} );

	app.get( "/login", oidc.ensureAuthenticated(), ( req: any, res: any ) => {
		res.redirect( "/guitars" );
	} );
};

export { register };
