# DDDForum V2: Phases of Craftship

## What is this?

This is the v2 of [dddforum]() which we're using to demonstrate moving through the Phases of Craftship in The Software Essentialist. 

## Phases

1. Code-First
2. Best Practice-First
3. Pattern-First
4. Responsibility-First
5. Value-First

## The Best Practice-First Phase

At this level, the focus is on implementing the most valuable techniques from BDD, Continuous Delivery, Object-Oriented Design, TDD & so on. 

The work we have to do here is broken into 4 key parts:

1. | Automated Backend E2E tests
2. | Test a Walking Skeleton (E2e UI to Backend Test Infrastructure)
3. | Deploying the Skeleton to a Minimal Deployment Pipeline (w/ GitHub Actions, Render & Netlify)
4. | Development Environment Refinements (for greater Discoverability & Understanding)

#### What's most important here?

Assuming we want to test everything from this folder, you can test/explore the following.

### Pre-requisites

**Docker**

Ensure you've [installed Docker](https://www.docker.com/products/docker-desktop/) on your machine and have it started.

This will allow us to run the local services we need (such as Postgres) without messy setup.

This keeps our development environments simple and reproducible.

**Packages**

```bash
npm ci
```

### 1. Automated Backend E2E tests

Automated tests are _superior_. Here's how we can do it on the backend.

![](https://private-user-images.githubusercontent.com/6892666/252122992-4463f520-75fc-464f-8cfc-b8afecac5271.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg4ODcwOTU3LCJuYmYiOjE2ODg4NzA2NTcsInBhdGgiOiIvNjg5MjY2Ni8yNTIxMjI5OTItNDQ2M2Y1MjAtNzVmYy00NjRmLThjZmMtYjhhZmVjYWM1MjcxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA3MDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwNzA5VDAyNDQxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRhOGQ1MTRmMDFhY2FiYWJlMDFhNjA2MjcxMmFiOWZjNjU1MDFiN2M5ZWFjN2FkYmJiNmYwMWE3M2U2YTFlODImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.9YW3nzEjFCYeqHrfTl-IOooe3nCjVyL16niTqJtEL9U)

**Run the E2E tests**

With the services built, you can now run the E2E tests.

```bash
npm run test:e2e
```

**Note**: This will start a PostgreSQL docker container, generate the Prisma client, run migrations, and start the backend server.

### 2. Test a Walking Skeleton (E2e UI to Backend Test Infrastructure)

A walking skeleton is a minimal slice of functionality through all of your major architectural components from the user's perspective.

![](https://private-user-images.githubusercontent.com/6892666/252123183-84b45357-f051-4bf7-a0c5-0fe1367bb731.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg4ODcxMzI5LCJuYmYiOjE2ODg4NzEwMjksInBhdGgiOiIvNjg5MjY2Ni8yNTIxMjMxODMtODRiNDUzNTctZjA1MS00YmY3LWEwYzUtMGZlMTM2N2JiNzMxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA3MDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwNzA5VDAyNTAyOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ1N2ViMTQxMGUyODJkNDQ0YTg4ZmY3NTc2Y2UzZWQxNTg3MDNkZGU0ZjE5MTM4YzI0ZjkzZjNkMzdhN2UzZDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.b3E_gRfDbiKIa4YvgPWmyPCv3V62Cq4KT0Mqeltu7Xo)

Here's how you can test it out locally.

**Step 1: Run the backend in a separate console.**

```bash
npm run start:dev:backend
```

> **Note**: This will start a PostgreSQL docker container, generate the Prisma client, run migrations, and start the backend server.

**Step 2: Run the frontend server in a separate console.**

```bash
npm run start:dev:frontend
```

### 3. Deploying the Skeleton to a Minimal Deployment Pipeline (w/ GitHub Actions, Render & Netlify)

> Image incoming

... description incoming

### 4. Development Environment Refinements (for greater Discoverability & Understanding)

> Image incoming

... description incoming

## Other

### Run the Backend Integration Tests

We run a few tests on the backend as well to prove that we can:

- Start and stop the web server
- Connect to the database

You can test these with:

```bash
npm run test:infra
```
