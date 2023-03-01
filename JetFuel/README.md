# JetFuel Server Take Home Exercise

This is a backend exercise that will give you the chance to see what kind of things we build at JetFuel!

## Setup

You'll need to set up your local machine to host this server, leading up to the exercise. 

1. You'll need postgres installed on your local machine. We also recommend you install a CLI to postgres, like psql, so you can run queries and see what is in the database. You can find instructions on how to install postgres and psql here:

https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/

2. Once Postgres is installed, you'll need to create a database for this exercise. Please name the database 'server_take_home'. From psql, you'd need to so something like:

```
psql                                    // To launch the postgres terminal
create table server_take_home           // To create the database
\q                                      // Exit the terminal
psql -d server_take_home                // to relaunch the terminal, but connected specifically to your new database. 
```

3. Once you have the database created, you're ready to run the server. Navigate back to the root directory, and run:
```
node bin/www
```
If all goes well, you should see a message that the server running on port 3000. Navigate to http://localhost:3000/ and you'll see a blank express template. 
```
Express server listening on port: 3000  // it worked!!
```

4. Finally, you'll need a way to send GET requests to the server. We recommend Postman (https://www.postman.com/) but feel free to use an alternative if you prefer. From your Postman or your API Client of choice, try hitting the /creator endpoint:
```
http://localhost:3000/creator?creator_id=1
```

You should get a JSON response back from the server:
```
{
  "id": 1,
  "firstname": "Tim",
  "lastname": "Lenardo",
  "created_at": "2020-11-28T18:50:47.930Z",
  "updated_at": "2020-11-28T18:50:47.930Z",
  "deleted_at": null
 }
```
 
If that works, then you're all set! We'll be in touch with instructions for the actual exercise. Feel free to navigate the code a bit to get a sense for the project layout. 

