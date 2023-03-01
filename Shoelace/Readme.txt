Hi Alexander/Shoelace
I was a little unclear about the nature of how you wanted me to tackle this problem, so I created two solutions:
1. Console Application
2. Web application

Console Application
- It is located in the ShoelaceConsoleApp
- Just go in the folder and run the Shoelace.exe file
- It will ask the user for a bunch of inputs regarding the Campaign, including selecting the template and what to input for the Title, Copy, Image uri and so on
  (make sure to put a url for image, or it will crash)
- It will then take the inputs and create a Campaign, and save it in a text file called Campaigns.txt in the same locaiton as the exe file
- If the file does not exist, it will create a new file.
- I ran and saved one of the items
- I only implemented a simple Post function, and a Get function, that gets all the items in the file. I did not implement a Put or Delete function, since I ran out of time

Web Applicaiton
- It is located in the ShoelaceWebApp
- It has a controller, that creates, reads, updates and deletes the campaigns
- It has the individual templates in seperate files, under the folder Model
- It uses a Graph Db from Azure, so you wont be able to run it without access to the database. The data base is configured in the DataBaseSettings.json file
- I send it the requests using Postman app. this is the backend application, and can easily be connected to a front end to create a UI for users to enter the info and create, read, update and delete campaigns
- Since you might not be able to run the webb app, I ran it myself, and captured a video to show it working