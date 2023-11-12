# BirthQuery Network


## To Dos

### To Do (the bare minimum):
  *  The assigned BigQuery read-only database. V
  *  A graphical web frontend written in Javascript or Typescript. 
    *  Use either Vue or a React framework. 
  *  A backend written in Python or Java. V
    *  If you are using Python, you should use either Flask or Django. V
    *  If you are using Java, you should use either Spring Boot or Dropwizard. V
  *  Your own read-write database. This can be either by MySQL or PostgreSQL. This is where you will store all state specific to your application. V
  *  A Docker compose file that runs the application. W
    *  It should run a minimum of 3 containers: your frontend, your backend, and a database. W

(remember to fill this form: https://docs.google.com/forms/d/e/1FAIpQLScSBvVtvT9mNeO_FgVrodAymHYmSE4dXrNndiA96farYuWYOQ/viewform)!!!

### To Do (if time smiles):
  *  Functional tests (httpx and pytest with mock DB)
  *  E2E tests (Cypress)


## My Stack:

  *  **DataBase:** PostgreSQL, SQLAlchemy
  *  **Google Cloud:** Google Cloud, Google Auth, BigQuery
  *  **BackEnd:** FastAPI, Pydantic, venv, dotenv, CORSMiddleware, logging, bcrypt, jwt, pytest
  *  **FrontEnd:** React, vite, React Redux, React Router, Tailwind
  


## Coder Manual:

### For the BackEnd:

### Starting:
  *  Locate at the backend folder in the terminal and run `python3 -m venv venv` to create a virtual environment
  *  Then activate the venv using running `source venv/bin/activate`
  *  Install the dependencies neccessarily for the app to run, for this run `python3 install -r reqs.txt`
  *  Start the application by finally running `python3 main.py`
  *  You can check the API by visiting `localhost/docs#` in your browser and read about our endpoints available
  *  Keep in mind, you still need to connect the database in order to make any request to the API

### Connecting DB
  *  TO do

### Unit Testing:
  *  Locate at the backend folder (`/birthquery-backend` NOT the `/birthquery-backend/tests` folder)
  *  Be sure that the venv is activated (run `source venv/bin/activate`) for that
  *  Then run `export PYTHONPATH=$(pwd)`, this will automatically retrieve your folder location at set it to PYTHONPATH,
  which is required to run the tests correctly
  *  Then just run `pytest tests/` and see the tests results in the terminal
  *  If facing the `ImportError: No module named psycopg2` error when running the tests, it's likely the issue is in the OS itself. Running this solved the problem in my Ubuntu: `sudo apt-get install libpq-dev`
and then having the venv activated; `pip install psycopg2`
  
### Functional Testing:
  *  Be sure you have installed the mock DB
  *  Start the testing environment by running `export FASTAPI_ENV=testing`
  *  Actually, there seems to be an issue even with FastAPI testing libraries, I found this; "https://stackoverflow.com/questions/72978364/modulenotfounderror-no-module-named-httpx" and unfortunately this too; "https://github.com/tiangolo/fastapi/discussions/6195", so it is 'open', somehow  
  *  Since I can test the API manually, this is not required and we are out of time, I'll see what I can do later 
  
### Trying on your own:
  *  Admin user: { "username": "administrator", "password:" "verystrongpassword" }
  *  Average joe: { "username": "goodcitizen", "password": "veryoriginalpassword" }
  *  After logging, retrieve the access token and begin exploring the endpoints
  *  Do not forget to add the access token and admin_secret for the admin privileges
  *  Create new query, comment on query, update query, and get data from bigquery

### Docker:
  *  Be sure you have Docker installed in your OS, for Ubuntu you can check this by running `docker --version`
  *  For checking all existing docker images, you can use `sudo docker images` (most of the times, it requires sudo)
  *  By locating at the backend folder (`/birthquery-backend`), you can run `sudo docker build -t birthquery-backend .` to build a docker image from the Dockerfile
  *  Read the terminal, it will explicitly record each step of the deployment and state if there is any problem or update
  *  If the port is available (you arent running the app locally), you can use `sudo run -p 8000:8000 birthquery-backend` to start the app
  *  Check that there are not tags in the images again, if that's the case then use `sudo run -p 8000:8000 birthquery-backend:tag` to start the app
  *  Only bug right now is the DB connection
  *  If anything goes wrong, you can also use `docker stop <container_id>`
  

### Docker-compose:
  *  For multiple Docker apps, basic commands; `docker-compose build`, `docker-compose up`, `docker-compose down`
  
    
  
