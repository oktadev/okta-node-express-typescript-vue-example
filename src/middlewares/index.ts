/* eslint-disable camelcase */
import { ExpressOIDC } from "@okta/oidc-middleware";
import session from "express-session";

const oidc = new ExpressOIDC( {
	client_id: process.env.OKTA_CLIENT_ID,
	client_secret: process.env.OKTA_CLIENT_SECRET,
	issuer: `${ process.env.OKTA_ORG_URL }/oauth2/default`,
	redirect_uri: `${ process.env.HOST_URL }/authorization-code/callback`,
	scope: "openid profile"
} );

const initializeApp = ( app: any ) => {
	app.use( session( {
		resave: true,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET
	} ) );
	app.use( oidc.router );
};

export { initializeApp, oidc };
