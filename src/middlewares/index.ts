/* eslint-disable camelcase */
import OktaJwtVerifier from "@okta/jwt-verifier";
import { ExpressOIDC } from "@okta/oidc-middleware";
import { Client } from "@okta/okta-sdk-nodejs";
import session from "express-session";

const verifier = new OktaJwtVerifier( {
	clientId: process.env.OKTA_CLIENT_ID,
	issuer: `${ process.env.OKTA_ORG_URL }/oauth2/default`
} );

const client = new Client( {
	orgUrl: process.env.OKTA_ORG_URL,
	token: process.env.OKTA_TOKEN
} );

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
		secret: process.env.APP_SECRET
	} ) );
	app.use( oidc.router );
};

export { client, initializeApp, verifier, oidc };
