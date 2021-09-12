# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
  - The report should be sent to the `/export` route of the investments service
  - The investments service expects the report to be sent as csv text
  - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
  - The holding should be the name of the holding account given by the financial-companies service
  - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around _1-2 hours_ working on it

## Deliverables

**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;

  1. How might you make this service more secure?

  ```text
  I think this would be more securely handled as a process on the investments service itself. As it stands, we are fetching sensitive data from the investments service and then posting it back up... this opens up unnecessary data exposure risks.

  A proper audit of dependencies might also be useful. I've removed/replaced some deprecated packages:
    - body-parser: Express 4.16+ now includes a drop-in replacement for body-parser
    - request: replaced with Axios
  But I also added a csv-stringify as a dependency
  ```

  2. How would you make this solution scale to millions of records?

  ```text
  Rather than querying all the investments data at the time of report generation, I would explore a solution that captures changes as they happen and compile this data at the same time.

  E.g. if this was an AWS solution with data stored in DynamoDB: use DynamoDB Streams to capture item-level modifications and feed that through Kinesis to S3 where it can be queried directly at high-scale with Athena.
  ```

  3. What else would you have liked to improve given more time?

  ```text
  - Some more testing would be ideal. Particularly with the external API integrations, I'd like to have mocked some failed responses to ensure that the error handling works as expected.
  - Ramda.js - I haven't used this package in my solution. If I had more time, I'd have studied up on this package and used where appropriate in my solution.
  ```

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes

We have provided a series of routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
- `/reports/holdings` make a post request here to trigger an export of holdings data to the investments service. `204` response if successful, `500` response if unsuccessful.
