# Server installation:

Go to server

```bash
  $ cd server
```

Install dependencies with npm
```bash
  $ npm install
```

After installation, you can develop with
```bash
  $ npm run develop
```

For successfuly running server, you need .env file with all secure keys and names for the application.

# Client installation

**install:**

```bash
  $ cd client
  $ yarn
```

**develop:**
```bash
  $ yarn start
```

# Application overview

This application runs on this link [currency-conversion-app.s3-website.eu-central-1.amazonaws.com](http://currency-conversion-app.s3-website.eu-central-1.amazonaws.com).

Server is made with express framework running both - locally listening on given port (from .env file) or on AWS Lambda by exporting the express app with **serverless** framework. 

As a database, DynamoDB from AWS was chosen and run both locally and remotely - no installation of the database is needed. Access to this database is restricted only to exact table and exact operations. The Table name is also presented in .env file for security reasons.

## React application overview

Application consists out of 1 page with 3 components. These components are:
- form
- currency conversion
- statistics

One of the requirements was, the application should be easily extendable - for that reason, redux library was added for storing all information and data inside the app.

Basic error handling is present - it is not every case specialized as it would require a lot more time to implement. If the request fails, the error will be written out in the {stats, conversion} component

## Statistics overview

1. Conversion count -> at dynamoDB there is the counter always incrementing
2. total amount USD converted -> incrementing variable with converted value. If target currency is not USD, we need to convert always also to USD to see what is the current value of the source amount in USD.
3. The most popular target currency -> DynamoDB has the option of Local Secondary Index which can store items in sorted manner. Index is applied on the counter in specific item and then we chose only the item with the highest counter.

Each query is being run on a different partition to prevent "Hot key problem".