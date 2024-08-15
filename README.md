## Books API
This project is a technical test that building a RESTful API using TypeScript for managing a library book management system.

## Applicant
- **Name:** Hafidz Prasetya
- **Email:** apitgelo@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/hafidz-prasetya
- **GitHub:** https://github.com/apitgelo

## API Docs
You can find the API documentation in the [swagger.yaml](./docs/swagger.yaml) file.

## Requirements
- NodeJS
- Yarn
- MongoDB

## Installation
1. Copy .env
   ```
   cp .env.example .env
   ```
1. Install dependencies
   ```
   yarn install
   ```
1. Run server in development mode
   ```
   yarn run debug
   ```
1. Run unit tests
   ```
   yarn run test
   ```

## Run application using Docker
1. Build and start the services
   ```
   docker-compose up --build
   ```
1. Stop the services
   ```
   docker-compose down
   ```
