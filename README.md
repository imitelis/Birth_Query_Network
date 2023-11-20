# Birth Query Network


## To Dos

### To Do (the bare minimum):
  *  The assigned BigQuery read-only database. V
  *  A graphical web frontend written in Javascript or Typescript. V
      *  Use either Vue or a React framework.
  *  A backend written in Python or Java. V
      *  If you are using Python, you should use either Flask or Django.
      *  If you are using Java, you should use either Spring Boot or Dropwizard.
  *  Your own read-write database. This can be either by MySQL or PostgreSQL. This is where you will store all state specific to your application. V
  *  A Docker compose file that runs the application. V
      *  It should run a minimum of 3 containers: your frontend, your backend, and a database.

(remember to fill this form: https://docs.google.com/forms/d/e/1FAIpQLScSBvVtvT9mNeO_FgVrodAymHYmSE4dXrNndiA96farYuWYOQ/viewform) before the deadline!!!

### To Do (functionalities):
  *  Visual Summary of Queried Data V
  *  Save Query With Name, Username, and Comment V
  *  Show All Saved Queries V
  *  Comment on Query D
  *  Select Saved Query V
  *  Persistence V
  *  Multiplayer Functionality V

### To Do (if time smiles):
  *  Functional tests (httpx and pytest with mock DB) <- ended highly problematic due that dependencies between `httpx` and `starlette`, review below
  *  E2E tests (Cypress)


## My Stack:

  *  **Google Cloud:** Google Cloud, Google Auth, BigQuery
  *  **DataBase:** PostgreSQL, SQLAlchemy
  *  **BackEnd:** venv, FastAPI, CORSMiddleware, Pydantic, bcrypt, jwt, pytest
  *  **FrontEnd:** vite, React, React Query, React Router, Tailwind, Jest, Cypress
  *  **Deploying**: Docker, docker-compose


## Coder Manual:

### Requirements and git clone:
  *  First of all, download git and log unto github from your terminal, you can do so by following some online resources, such as `https://git-scm.com/downloads` and `https://docs.github.com/en/get-started/quickstart/set-up-git`
  *  Check that you have docker and docker compose installed in your OS (by running something like `docker --version` and `docker-compose --version`). If that's not the case, then download those unto your machine, you can find more documentation here: `https://docs.docker.com/get-docker/` and `https://docs.docker.com/compose/install/`
  *  Similarly check that you have at least python, psql and npm (or use nvm on its defect) installed in your computer, you can use internet for that
  *  If you think you are ready, open the terminal and run `git clone https://github.com/imitelis/Birth_Query_Network` it will probably request your git credentials btw
  *  That's it for now, eventually you are probably going to be required to install more things, so always keep an eye on that terminal and also periodically check what you are working with

### BigQuery from GCP:
  *  You can go to `https://console.cloud.google.com` and see your projects available
  *  Since you are starting, check the left side bar and look for `API and services` and then to `credentials`
  *  Check that you have a service account, then click on `create credentials` and go for `Service account`
  *  In the 'Service account details' fill the name of your service account
  *  Then on 'Grant this service account access to project' fill the Role as 'Owner' and another one for
  `BigQuery Admin` role
  *  Finally in 'Create key' go for `Create Key` and select 'JSON', click on 'Create' and it will automatically download it on your device
  *  For the modularity of our app, you can place the json file in the `/birthquery-backend` folder and then set its name in the `.env` file
  *  Or if you want to make the SQL queries by yourself you can go to `https://console.cloud.google.com/bigquery` and click on `Write a new query`
  *  From here you can select the databases available, but for our project we are going to be working with the `sdoh_cdc_wonder_natality`,
  *  Which has the following tables; `county_natality`, `county_natality_by_abnormal_conditions`, `county_natality_by_congenital_abnormalities`, `county_natality_by_father_race`, `county_natality_by_maternal_morbidity`, `county_natality_by_mother_race`, `county_natality_by_payment`
  *  For the sake of sanity, we are going to be working only with; `county_natality`, `county_natality_by_father_race`, `county_natality_by_mother_race` and `county_natality_by_payment`
  
### For the DataBase:
  *  If you have an existing PostgreSQL database for this project and you want to use it for this app you can dump (actual word to 'extract') it, by using `pg_dump -U username -d dbname -f dbname.sql`
  *  You can also use the existing folder database `birthquery.sql` and set it in your OS system by first running `createdb -U postgres birthquery` and then (by locating at the same folder that contains the sql file), running `psql -U postgres -d birthquery -f birthquery.sql`

### Starting the BackEnd:
  *  Locate at the backend folder in the terminal and run `python3 -m venv venv` to create a virtual environment
  *  Then activate the venv using running `source venv/bin/activate`
  *  Install the dependencies neccessarily for the app to run, for this run `python3 install -r reqs.txt`
  *  Configure the database port, so be sure that it matches with the one that you are running locally
  *  Start the application by finally running `python3 main.py`
  *  You can check the API by visiting `localhost/docs#` in your browser and read about our endpoints available
  *  Keep in mind, you still need to connect the database in order to make any request to the API

### Unit Testing the BackEnd:
  *  Locate at the backend folder (`/birthquery-backend` NOT the `/birthquery-backend/tests` folder)
  *  Be sure that the venv is activated (run `source venv/bin/activate`) for that
  *  Then run `export PYTHONPATH=$(pwd)`, this will automatically retrieve your folder location at set it to PYTHONPATH,
  which is required to run the tests correctly
  *  Then just run `pytest tests/` and see the tests results in the terminal
  *  If facing the `ImportError: No module named psycopg2` error when running the tests, the issue is likely to lay in your OS itself. Running this solved the problem in my Ubuntu: `sudo apt-get install libpq-dev` and then by having the venv activated; `pip install psycopg2`
  
### Functional Testing the BackEnd:
  *  Be sure you have installed the mock DB
  *  Start the testing environment by running `export FASTAPI_ENV=testing`
  *  Actually, there seems to be an issue even with FastAPI testing libraries, I found this; "https://stackoverflow.com/questions/72978364/modulenotfounderror-no-module-named-httpx" and unfortunately this too; "https://github.com/tiangolo/fastapi/discussions/6195", so it is 'open', somehow  
  *  Since I can test the API manually, this is not required and we are out of time, we'll see what we can do later 
  
### Trying the API on your own:
  *  Be sure that you have configured the local database correctly and the db connection (the `DATABASE_URL` in the backend environment variables)
  *  Here are some credentials, for our admin user: `{ "username": "administrator", "password:" "verystrongpassword" }`
  *  And those for the average joe: `{ "username": "goodcitizen", "password": "veryoriginalpassword" }`
  *  After logging, retrieve the access token and begin exploring the endpoints, from now the tokens need to go in the headers authorization
  *  This means that it is not longer possible to manipulate queries or users from the API docs, unfortunately (but this is actually more secure!)
  *  However, you can still use some tools such as Postman or Insomnia for parsing the authentication bearer and playing around
  *  Create new query, comment on query, update query, and get your data from the birthquery!

### Starting the FrontEnd:
  *  Locate at the frontend folder in the terminal and run `npm install` to download the `node_modules` dependencies
  *  Then run `npm run start` to start the app and go to `localhost:9000`    
  *  If your backend is successfully connected to the database and running at port `localhost:8000`, you should be capable to see the app running in your browser

**NOTE:** If you face proxy or even hash errors during downloading the necccessary dependencies for the containers (either pip or npm installs), it's very likely that the error is from your internet connection (speed) itself, trust me, that happened to me the past night

### Docker:
  *  Be sure you have Docker installed in your OS, for Ubuntu you can check this by running `docker --version`
  *  For checking all existing docker images, you can use `sudo docker images` (most of the times, `docker` commands require `sudo`)
  *  Before building any docker image, be sure that you have configured and considered the ports of the backend and frontend apps you plan to deploy
  *  By locating at the backend folder (`/birthquery-backend`), you can run `sudo docker build -t bq-backend-c .` to build a docker image from the Dockerfile
  *  Read the terminal, it will explicitly record each step of the deployment and state if there is any problem or update
  *  If the port is available (you arent running the app locally), you can use `sudo run -p 8000:8000 bq-backend-c` to start the app
  *  Check that there are not tags in the images again, if that's the case then use `sudo run -p 8000:8000 bq-backend-c:tag` to start the app
  *  You can do something similarly for the frontend, just remember to config the ports and keep in mind that you are using a proxy
  *  If anything goes wrong, you can also use `docker stop <container_id>` to stop the container and release the port and `docker stop $(docker ps -q)` for them all
  *  You might also like to use `docker rmi <image_id>` to delete images from your OS (they can take quite space), or if you want to hard delete them all, use: `docker rmi -f $(docker images -q)`

### Docker-compose:
  *  For running multiple containers in a single environment, and after configuring your `docker-compose.yaml` (`docker-compose.dev.yaml` in our case) file you can also use the `docker-compose` (`docker compose` at least on my Ubuntu) commands, most of the times the are going to request you a `sudo`
  *  `docker compose up --build` to start building the environment, but for our environment, start the commands with `docker-compose -f docker-compose.yml -f docker-compose.dev.yml`, i.e. run `docker-compose -f docker-compose.dev.yml up --build` instead
  *  If everything goes well you should see the app running at `localhost:9000` in your local browser, and for the backend documentation `localhost:8000/docs#`
  *  If you want to shut it down and then remove the containers you can use `docker compose down`
  *  If it is successful, you can only reinit it by using `docker compose up`, but if you want to build it again, then use `docker compose up --build` once more
  *  Ultimately, you can also use `docker system prune` to clean all docker stuff; images, containers and others, do it on your own (but never with your company code!)
  *  If you want to interact with the container themselves, you can try: `sudo docker exec -it bq-backend-c bash`, `sudo docker exec -it bq-frontend-c bash` and finally `sudo docker exec -it bq-database-c bash`, this can be quite handy when configuring and debugging those containers

### For the containerized DataBase:
  *  After using the docker-compose, the DB instance that the rest of your code will be using will the be one running on the container, this means that the you are not longer being able to access the DB in the same way you used to do locally with tools such as `pgAdmin 4`
  *  Now, for copying unto the database container your actual DB, once your docker compose is running you can use `cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery`
  *  You might read some "ERROR" logs, but they are due the shaping of our existing database in the container, the command will automatically copy the contents of the folders database unto the container database!
  *  From here, and by having access to the image database on its container (by running `sudo docker exec -it bq-database-c bash`) and accessing the database with `psql -U postgres -p 5432 -h localhost -d birthquery` you can just check the database data, try something like `SELECT * FROM users;` :-)
  *  Suppose you have been working a long day on the container database and you want to get it out and export it, first use `sudo docker exec -it bq-database-c bash` to access the container
  *  From there you can use `pg_dump -U postgres -d birthquery > backup.sql` to create a backup of the db
  *  Finally, you can use `docker cp bq-database-c:/backup.sql .` to copy it in your working directory
  
### For zipping the App image:
 *  Start by running `docker ps -a` to identify all of your docker containers and images, in my case I was able to identify `birth_query_network_frontend`, `birth_query_network_backend` and `postgres:14` as my app images
 *  Then you should stop each of those with `docker stop <container_name_or_id>`
 *  After that, you can use `docker save -o <image_name.tar> <image_name_01> <image_name_02> <image_name_03>` for the 3 images
 *  So, in my case, I use it as `docker save -o birth_query-i.tar birth_query_network-frontend birth_query_network-backend postgres:14`
 *  Ultimately you are going to be left with 1 tar file: `birth_query-i.tar`
 
### For the zipped App image:
  *  Someone has passed you a `.tar` file that contains the dockerized app image: a `birth_query-i.tar` file, our `docker-compose.prod.yaml` and our production database `birthquery.sql`
  *  Just in case, check that you don't have any docker images titled as: `birth_query_network_frontend`, `birth_query_network_backend` and `postgres:14` (you can use `docker images -a` in the terminal for this)
  *  If that is not the case, then be sure to completely delete them, you can use `docker rmi <image_id>` for achieving this
  *  And if they depend on existing containers and you want to delete all existing images `docker stop $(docker ps -a -q) docker rm $(docker ps -a -q)`
  *  Now, start by loading the app image by using `docker load -i birth_query-i.tar`, after success, use `docker images -a` to check they are there
  *  And after having given the proper permissions, run `source activate.sh` to activate the environment variables of our images
  *  Finally, by locating in a folder with the docker compose file, run `docker compose -f docker-compose.prod.yml up --build`
  *  You'll read the magic happening in the terminal, why don't you visit `localhost:9000` and check it out in the browser? :-)
  *  Well, that turned out to be pretty, but now you need to load the sql data unto the database container so your app isn't data empty
  *  By using `docker images -a`, find out the name of the container that serves the database image, in my case it was `bq-database-c`
  *  After identifying it you can use `cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery`
  *  And that's it! Now you have the database data in your container, feel free to continue using the app in `localhost:9000`


## Looking forward:

### Some improvements and production ready
  *  There are several things we could've improved here, either from finishing those functional tests in the backend, creating different coding (development/production) environment (and setting different keys or ports, even different Dockerfiles for any of those coding environments), managing different branches in git, setting automatized tests in git actions, writing some E2E tests with Cypress and even deploying the actual thing on AWS. However, most of those things are likely to stay in a "wishing list" for the remaining time of this test
