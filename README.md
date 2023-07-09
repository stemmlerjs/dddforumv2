# DDDForum: Best-Practice First

## What is this?

This is the _Best Practice-First_ approach to the DDDForum project that we perform in The Phases of Craftship.

At this level, the focus is on implementing the most valuable techniques from BDD, Continuous Delivery, Object-Oriented Design, TDD & so on. 

The work we have to do here is broken into 4 key parts:

1. | Automated Backend E2E tests
2. | Test a Walking Skeleton (E2e UI to Backend Test Infrastructure)
3. | Deploying the Skeleton to a Minimal Deployment Pipeline (w/ GitHub Actions, Render & Netlify)
4. | Development Environment Refinements (for greater Discoverability & Understanding)



## What can I do?

Assuming we want to test everything from this folder, you can run the following commands.

### 1. Automated Backend E2E tests

First, ensure that you have Docker installed and running.

Then build the local development services (just Postgres).

```bash
(cd backend && docker-compose up --build -d)
```

And now you can run the 

```bash
(cd backend && npm install && npm run test:e2e)
```

### 2. Test a Walking Skeleton (E2e UI to Backend Test Infrastructure)

A walking skeleton is a minimal slice of functionality through all of your major architectural components.