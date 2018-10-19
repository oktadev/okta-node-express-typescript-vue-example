# Example Node.js API using Express, TypeScript, Vue, and PostgreSQL

## Requirements

* [Node.js](https://nodejs.org) version 8+
* [Docker](https://www.docker.com/) (or some other instance of [PostgreSQL](https://www.postgresql.org/))

## Development setup

* Clone or download this repository
* Install modules using `npm install`
* Copy `.env.sample` to `.env`
* Set up [PostgreSQL with Docker](https://docs.docker.com/samples/library/postgres/). With docker installed, use the following two commands to create an instance of PostgreSQL for the application. Feel free to change the name and password for the database.

```bash
docker pull postgres:latest
docker run -d --name guitar-db -p 5432:5432 -e 'POSTGRES_PASSWORD=p@ssw0rd42' postgres
```

* Modify `.env` to match your PostgreSQL server connection and credentials
* Initialize the PostgreSQL database by running `npm run initdb`
* Create a free [Okta Developer Account](https://developer.okta.com/signup/)
* Set up a new Okta application

    1. Click Applications in the top menu and then click "Add Application"
    2. Click "Web" and click Next
    3. Name your application, and verify the Base and Login URIs are correct. By default, the web application will run locally at http://localhost:8080. Click Done.

* On the Application screen under the General tab you will find a section for "Client Credentials." You will need to copy the values for "Client ID" and "Client secret" and paste them into the `.env` file for `OKTA_CLIENT_ID` and `OKTA_CLIENT_SECRET`, respectively.
* Copy the URL for your Okta developer account (e.g. `https://dev-123456-admin.oktapreview.com`) and paste it into the `.env` file as the value for `OKTA_ORG_URL`. Remove `-admin` from the URL. The setting should look similar to:

```
OKTA_ORG_URL=https://dev-123456.oktapreview.com
```

## Launching application

To run the application in development mode:

```bash
npm run dev
```

By default, the web application should now be running at [http://localhost:8080](http://localhost:8080).

## Links

This example application uses: 

* [Node.js](https://nodejs.org)
* [TypeScript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [EJS](https://github.com/mde/ejs)
* [Okta's Node.js OIDC Middleware](https://www.npmjs.com/package/@okta/oidc-middleware)
* [Vue](https://vuejs.org/)
* [Materialize](https://materializecss.com/)
* [Axios](https://github.com/axios/axios)

## Help

Please post any questions as comments on the [blog post](), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if you would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).