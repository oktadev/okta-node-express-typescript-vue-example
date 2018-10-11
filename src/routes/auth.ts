const register = ( app: any ) => {
	app.get( "/logout", ( req: any, res: any ) => {
		req.logout();
		res.redirect( "/" );
	} );
};

export { register };
