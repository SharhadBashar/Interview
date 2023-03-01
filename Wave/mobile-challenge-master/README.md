# Wave Software Development Challenge
Applicants for the [Mobile engineer](https://wave.bamboohr.co.uk/jobs/view.php?id=6) role at Wave must complete the following challenge, and submit a solution prior to the onsite interview. 

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!) 

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the onsite interview.

You can write your app using your favorite language, tools, platform, etc. Whether that means something native or something hybrid is completely up to you. 

Send your submission to [dev.careers@waveapps.com](dev.careers@waveapps.com). Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

## Submission Instructions
1. Fork this project on github. You will need to create an account if you don't already have one.
1. Complete the project as described below within your fork.
1. Push all of your changes to your fork on github and submit a pull request. 
1. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests.)

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository.
1. Complete your project as described below within your local repository.
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com).

## Project Description
In this project, we're going to be creating a simple app that shows a Wave user the products that they can charge for on their invoices. 

You'll be using the public Wave API in this challenge. You can find the documentation [here](http://docs.waveapps.io/). You will specifically be interested in [the products endpoint](http://docs.waveapps.io/endpoints/products.html#get--businesses-business_id-products-), and [using an access token with the API](http://docs.waveapps.io/oauth/index.html#use-the-access-token-to-access-the-api). 

Your Wave contact will supply you with a business ID and a Wave API token before you begin.

### What your application must do:

1. Your app must retrieve the list of products for the specific business ID sent to you by your Wave contact
1. The list of products should be fetched and shown to the user in a list view when the app is launched.
1. Each item in the list view should show the product name and price (formatted as a dollar amount.)

You are not required to add any interactivity to the app -- i.e. you do not need to send the user to a detail view when they touch one of the list items. 

Your app is allowed to render nothing if there is no internet connection when it loads.

Once you're done, please submit a paragraph or two in your `README` about what you are particularly proud of in your implementation, and why.

## Evaluation
Evaluation of your submission will be based on the following criteria. 

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
