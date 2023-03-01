# Wave Software Development Challenge

Applicants for roles in the Developer Systems team at Wave must complete the following challenge, and submit a solution prior to the onsite interview.

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the on-site interview.

Feel free to email dev.careers@waveapps.com if you have any questions.

## Project Description

A developer is working on an idea for an app. This will be a messaging system which is implemented as a set of Python applications. The first one, `kafka-producer` 
will send messages to the message stream, and the second one `kafka-consumer` will consume messages from the stream and store them in a database. Both applications have UIs
which will allow the user to send a message or to view the messages which have been sent.

The developer started working on this project locally, and after a while decided that dockerizing the applications would help her get to production faster. She created dockerfiles for her applications and was able to test them successfully locally. A friend suggested that she use docker compose in order to orchestrate her containers but she is unfamiliar with the technology and wants to focus on application development for now, and so has asked for help with creating the docker compose file for this set of applications.

Can you help her out by creating a docker-compose file for her applications?

She is planning on using [Confluent Kafka](https://docs.confluent.io/current/quickstart/cos-docker-quickstart.html) as her platform in production and using Redis as the backing store for her asynchronous task processor Celery.

### Documentation:

Please commit the following to this `README.md`:

1. Instructions on how to build/run the application
1. Answers to the following questions:
   - How did you test that your implementation was correct?
   - If this application was destined for a production environment, what would you add or change?
   - What compromises did you have to make as a result of the time constraints of this challenge?

## Submission Instructions

1. Clone the repository.
1. Complete your project as described above within your local repository.
1. Ensure everything you want to commit is committed.
1. Create a git bundle: `git bundle create your_name.bundle --all`
1. Email the bundle file to [dev.careers@waveapps.com](dev.careers@waveapps.com) and CC the recruiter you have been in contact with.

## Evaluation

Evaluation of your submission will be based on the following criteria.

1. Did you follow the instructions for submission?
1. Did you complete the steps outlined in the _Documentation_ section?
1. Is the solution as simple and user-friendly
1. Is it clear from the configuration what is going on