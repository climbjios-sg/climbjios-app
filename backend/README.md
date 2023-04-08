# ClimbJios Backend

## Installation and setup
Ensure you have `PostgreSQL`, `NodeJS` and `yarn` installed on your local machine.
The latest LTS should be fine.

```bash
# Copy and setup .env file
$ cp .env.example .env

# Install dependencies
$ yarn install

# Setup database and run seeds
$ yarn migrate; yarn seed

```

## Running the app

```bash
# watch mode (development)
$ yarn start:dev

# watch mode (cronjob)
$ yarn start:dev:cronjob

# production mode
$ yarn start:prod

# call endpoint
$ curl localhost:4000/v1/
```

<!-- ## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
