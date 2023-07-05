# Step Functions Multi-domain Orchestration Demo

The project demonstrates an architecture for orchestrating multiple domains with a serverless Step Functions workflow.

It demonstrates:

- Using API Gateway to start the workflow
- Doing input validation; however, not using API Gateway's such features as it's unclear if they work the same as on a regular REST API (point to my relative ignorance for this omission)
- Parallel workflows
- Sequential workflows
- Use of retries
- Use of ResultPath and OutputPath

In non-Step Functions bullets, you'll also see:

- Passing the data to an EventBridge bus
- Choreographing a second domain ("Bounty domain") with those events
- A basic front-end to display the bounties

## Solution

The overall solution is as per below.

![Solution diagram](/diagrams/diagram.png)

In Step Functions, the final state for the "Damages domain" workflow will render like this:

![The Step Functions workflow as seen in Workflow Studio](/diagrams/stepfunctions.png)

Notice how an additional step, the data load in `GetCurrentDamages`, was added after the initial solution diagram was made.

## Prerequisities

- Recent [Node.js](https://nodejs.org/en/) (ideally 18+) installed.
- Amazon Web Services (AWS) account with sufficient permissions so you can deploy infrastructure.
- Ideally some experience with [Serverless Framework](https://www.serverless.com) as that's what we will use to deploy the service and infrastructure.
- You will need to deploy the stack prior to working with it locally as it uses actual infrastructure even in local mode.

## Installation

Run `npm install`.

## Instructions

- Set up three (3) endpoints on a basic mock API like [Mockachino](https://www.mockachino.com), using the JSON files in the `externals` folder.
- Set the endpoint values from above in `code/damages/serverless.yml` in the `config` section.
- Set your AWS account number in both of the `serverless.yml` files under `custom.config.awsAccountNumber`.
- Deploy the `damages` solution with `npm run deploy` in that folder.
- Deploy the `bounty` solution with `npm run deploy` in that folder—note down the endpoint!
- Configure the front-end solution in `code/bounty/frontend/index.html` to point to the endpoint from the last step.
- Deploy the static front-end to something like [Netlify](https://www.netlify.com).

Great success!

![Rebel Scum bounty board](/images/bountyboard.png)

## Call the service

Run `curl https://RANDOM_ID_DAMAGES_API.execute-api.REGION.amazonaws.com/prod/start -X POST -d '{"name": "Luke Skywalker","value": 10000}'` to add new damages made by our favorite rebel scum.

Run `curl https://RANDOM_ID_BOUNTY_API.execute-api.REGION.amazonaws.com/bounties` to get the data.

## Populate with basic data

Open `create-test-data.sh` in the root of this project and add your Damages API endpoint. Then run `bash create-test-data.sh` to add some basic starting data.

## Copyright

Star Wars images are used in the spirit of fair use and all copyrights belong to their respective owners.
