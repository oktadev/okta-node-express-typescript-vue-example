# Example Node.js API using Express, TypeScript, Vue, and PostgreSQL

## Requirements

* [Node.js](https://nodejs.org) version 8+
* [Docker](https://www.docker.com/) or some other instance of [PostgreSQL](https://www.postgresql.org/)

## Setup

* Clone or download this repository
* Install modules using `npm install`
* Copy `.env.sample` to `.env`
* Set up [PostgreSQL with Docker](https://docs.docker.com/samples/library/postgres/). With docker installed, use these two commands to create an instance of PostgreSQL for the application:

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

* On the Application screen, under the General tab, you'll find a section for "Client Credentials." You will need to copy the values for "Client ID" and "Client secret" and paste them into the `.env` file for `OKTA_CLIENT_ID` and `OKTA_CLIENT_SECRET`, respectively.
* Copy the URL for your Okta developer account (e.g. `https://dev-123456-admin.oktapreview.com`) and paste it into the `.env` file as the value for `OKTA_ORG_URL`. Remove `-admin` from the URL. The setting should look similar to:

```
OKTA_ORG_URL=https://dev-123456.oktapreview.com
```



