# DDDForum V2: Phases of Craftship

> This is the [backend e2e assignment](https://www.essentialist.dev/products/the-software-essentialist/categories/2153382759/posts/2168948141) for The Software Essentialist. You can find the assignment and accompanying demo [here](https://www.essentialist.dev/products/the-software-essentialist/categories/2153382759/posts/2168948141).

* [1. About](#1-about)
  + [1.1. DDDForum](#11-dddforum)
  + [1.2. Project architecture](#12-project-architecture)
* [2. Getting started](#2-getting-started)
  + [2.1. Dependencies](#21-dependencies)
  + [2.2. Installing](#22-installing)
  + [2.3. Building](#23-building)
  + [2.4. Starting](#24-starting)
* [3. Testing](#3-testing)
  + [3.1. Acceptance (E2E Tests)](#31-acceptance--e2e-tests-)
  + [3.2. Integration tests](#32-integration-tests)

## 1. About

### 1.1. DDDForum

### 1.2. Project architecture

At this point, the project architecture can be summarized as follows:

- TypeScript Express.js Backend RESTful API 
- Basic MVC architecture
- Postgres as a database
- Docker instance for development environment
- Jest & Jest-Cucumber & supertest for E2E testing

![](https://private-user-images.githubusercontent.com/6892666/252122992-4463f520-75fc-464f-8cfc-b8afecac5271.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg4ODcwOTU3LCJuYmYiOjE2ODg4NzA2NTcsInBhdGgiOiIvNjg5MjY2Ni8yNTIxMjI5OTItNDQ2M2Y1MjAtNzVmYy00NjRmLThjZmMtYjhhZmVjYWM1MjcxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA3MDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwNzA5VDAyNDQxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRhOGQ1MTRmMDFhY2FiYWJlMDFhNjA2MjcxMmFiOWZjNjU1MDFiN2M5ZWFjN2FkYmJiNmYwMWE3M2U2YTFlODImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.9YW3nzEjFCYeqHrfTl-IOooe3nCjVyL16niTqJtEL9U)

## 2. Getting started

### 2.1. Dependencies

**Node**

- Node version 16.0.0 or higher
- NPM version 8.0.0 or higher

**Docker**

- Ensure you've [installed Docker](https://www.docker.com/products/docker-desktop/) on your machine 
- Ensure you have Docker started

Docker allows us to run local services we need (such as Postgres) without messy setup.

This keeps our development environments consistent and reproducible across different machines, teams, and so on.

### 2.2. Installing

Before you do anything, install the project with:

```npm run ci```

This will perform a clean install specifically from the package-lock.json.

### 2.3. Building

In order to build the application, make sure to run:

```npm run build```

### 2.4. Starting

To start the application in **development mode**, run the following command:

```npm run start:dev```

## 3. Testing

### 3.1. Acceptance (E2E Tests)

To run the acceptance (E2E tests), run the following command:

```npm run test:e2e:dev```

### 3.2. Integration tests

The integration tests confirm that the web server and the database function as intended.

You can run the integration tests with:

```npm run test:e2e:infra```

