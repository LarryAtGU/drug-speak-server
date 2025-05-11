# Drug Speak Server

This repository contains the server-side application for **Drug Speak**, an assignment project for the following courses in [Griffith University](https://www.griffith.edu.au):

- Mobile Application Development (3701ICT)
- Mobile Device Software Development (7421ICT)

The project is built using [NestJS](https://nestjs.com/) and utilizes [TypeORM](https://typeorm.io/) with SQLite for persistent storage. Swagger is integrated for API documentation and testing.

---

## Features

- **User Module**
  - Create, update, and delete users.
  - Supports unique email validation and secure password handling.
- **Authentication Module**
  - Login endpoints using JWT-based authentication.
  - Secure endpoints with JWT guard.
- **Study Record Module**
  - Insert or update study records for each user.
  - Query study records: by user or for all users.
- **API Documentation**
  - Swagger integration for interactive API docs.
- **E2E Tests**
  - E2E tests implemented with Jest and Supertest.

---

## Project setup

```bash
$ git clone https://github.com/LarryAtGU/drug-speak-server
$ cd drug-speak-server
$ node -v
```

If your node version is 20 or less, then you need to

```bash
$ git checkout -b legacy-sqlite3 origin/legacy-sqlite3
```

## Install Dependencies

```bash
$ npm install
```

## Environment Variables

It is optinal to create a .env file in the root directory with contents similar to:

```env
JWT_SECRET=YourSecretKey
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## API documentation

After starting the project, open your browser and go to http://localhost:3000/. The root URL is automatically redirected to the Swagger UI where you can interact with the API documentation.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Larry Wen](https://experts.griffith.edu.au/8677-larry-wen)

## License

This project is licensed under the MIT License. [MIT licensed](https://github.com/LarryAtGU/drug-speak-server/blob/main/LICENSE).

## Node-version compatibility

- **legacy-sqlite3** (branch) — uses `sqlite3`, supports Node ≤ 20
- **main** (branch) — uses `better-sqlite3`, requires Node ≥ 21
