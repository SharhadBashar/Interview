# RS Fullstack


## Enviroment Setup

### Client

See the [frontend README](client/README.md)

### Server

1. Run `./init-db.sh` from the `scripts` directory to init the database (or view and manually create the database)

Once db is set:

1. run `pip install pipenv` to install pipenv
2. run `pipenv install` to install dependencies
3. run `pipenv shell` to activate the pipenv shell
4. run `python manage.py migrate` to migrate database
5. run `python manage.py runserver` to run the Django API (default - localhost:8000/admin)

## Task

We want to build a simple product gallery app where users can register, login then add/delete products to their accounts, any product can have a name,price and description as well as image (the products images can be just a remote image url like 'https://picsum.photos/400?image=780')

#### Required

1. Setup your enviroment
2. Create the following REST endpoints
   1. User Registration
   2. Products CRUD endpoints
3. Using any css library or vanila css create the following pages
   1. Login page
   2. Registration page
   3. A simple grid view of the user products
4. Finish the addProducts store mutation
5. Change the products from hard delete to soft delete (we need also to know what date any product was deleted)

#### Optional

These tasks are not required but nice to have!

1. Is it possible to improve server or and client security? If so, what suggestions would you make? (Feel free to code it).
2. Only if existed remove any code/logic that you think is useless
3. Use git and push the project to github
4. Write unit tests for the endpoints you've created
5. If possible deploy the project on heroku

**Hint :** What the description didn't mention, the code did
