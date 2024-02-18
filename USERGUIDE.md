# Birth Query Network: Userguide

Dear user, thank you so much for trusting our Google cloud data and selecting us!

After finishing this small guide, you are going to be able to run the product in your own machine and use it locally (for having it deployed in the cloud, you would have to contact us for details and pricing :-) )

**NOTE:** This guide was written supposing that you are a final client (an IT specialist who can follow and replicate these instructions), i.e. someone who has access to our services in a production form (so you someone gave you a file that contains `birth_query-i.tar`, `birthquery.sql`, `docker-compose.prod.yml` and a copy of this file)

**NOTE:** If you would like to expand your understanding of the backend, frontend, database, bigquery and docker of our app, and check some useful commands, I would welcome you to check the well-docummented coderguide in the `README.md` file on the repository folder; `https://github.com/imitelis/Birth_Query_Network/`

**NOTE:** In some old versions of docker compose, you still need to run the command with a `-` symbol, i.e. `docker-compose -f docker-compose.prod.yml up`, check this in your OS before executing the `activate.sh` file, this file assumes newer versions (using `docker compose -f docker-compose.prod.yml up`)

**REQUIREMENTS:** Both this guide and the youtube video assumes that you have certain requirements installed in your OS; git, psql, docker and docker compose. If that's not the case, then I would also suggest you to point out again to the coderguide in the `README.md` file


## Youtube Video:
  *  For our trainees and interns: https://www.youtube.com/watch?v=N6nzUE7ENGg


## Make the App run locally:
  *  Well, this guide cannot asume that you are a tech wizard, but it supposes at least that you are somehow familiar with a computer terminal
  *  Someone has passed you a folder (that's titled `birth_query_network`, this is important for the docker compose loading)
  *  And it contains the dockerized images: a `birth_query-i.tar` file, our `docker-compose.prod.yaml`, our product database `birthquery.sql`, a `USERGUIDE.md` document, a `secrets.sh` and a naive `activate.sh` file
  *  Be sure to have all files located in that folder called `birth_query_network` so then the docker-compose wont have problems after the images are loaded
  *  Just in case, check that you don't have any docker images in your OS titled as: `birth_query_network-frontend`, `birth_query_network-backend` and `birth_query_network-database` (you can use `docker images -a` in the terminal for this)
  *  If that is not the case, then be sure to completely delete them, you can use `docker rmi <image_id>` for achieving this
  *  And if they depend on existing containers then you are going to have to find those containers and remove them first `docker rm <container_id>`
  *  Most of the scripts for starting the app have been automated by the `activate.sh` file, however you are still required to upload the DB data unto the DB container manually, as shown below
  *  Grant permissions to the `activate.sh` file, at least in Ubuntu I can use `chmod +x activate.sh` in the terminal for that
  *  After giving the proper permissions to the file, run `source activate.sh` in the main directory where you store the image files
  *  It should do well, and finally reaching the docker-compose part, from here the script will initialize the app image
  *  You'll read the magic happening in the terminal, so why don't you visit `localhost:9000` and check it out in the browser? :-)
  *  Well, that turned out to be pretty, but now you need to load the sql data unto the database container so your app isn't data empty
  *  DO NOT close the running docker compose terminal, otherwise you are going to have to run `docker compose -f docker-compose.prod.yml up` again
  *  Open a new window for the existing terminal and find out the name of the container that serves the database image (`docker images -a`)
  *  In my case it was `bq-database-c` (and this is also the default name I configured for the database container, so just confirm the name matches)  
  *  After identifying it you can use `cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery`
  *  You might read some "ERROR" logs, but they are due the shaping of our existing database in the container, the command will automatically copy the contents of the folders database unto the container database!
  *  If you omit this previous step, the app will start but you are going to have to sign up and create an account, create at least one with username as `administrator`
  *  And that's it! Now you have the database data in your container, feel free to continue using the app in `localhost:9000`
  *  And if you want to check the API documentation, you are welcome to visit `localhost:8000/docs#` (although from now you are going to have to set the header authorizations before trying to do any actual request)
  *  This might lead you to think about using Postman or Insomnia again, or just to login and use the actual app

## Once the App is running:
  *  There you go! From here you can go to `localhost:9000/` in your preferred browser and see the app running
  *  In the home page, you can go to the navbar at top and go to `sign up` in order to create your new account (or if you feel uncomfortable you can log in directly by using `goodcitizen` and `veryoriginalpassword`, but only after having loaded the database data in the database container)
  *  And after a successfully signing up (you'll be notified about this!), you can go to login to log with your new account
  *  From here you are going to be capable to new options in the navbar, particularly the `Queries`, click there
  *  In this page, you can see the full list of all queries created by other users and you can search on them by name on the searching field
  *  You can also select a random query and by pressing on its `Run` button it will automatically redirect you to the executed Birth Query, you can also see its comments, edit and even delete it
  *  It contains the query data, but still requires you to press `Run` again to request data with it, or even edit it if you want
  *  Here you can manipulate the query and make one on your own, and after successful `Run` you will see new options
  *  If you are happy with the result, you can use `Save` to save your query, it will request you a query name and query comment, your username will be setted automatically
  *  You can also download the query data as in an CSV file, no need to worry about ordering that data :-)
  *  So now other users can go and see your query, they can also run it from the `Queries` route
  *  There you can also see comments, menu to edit and delete the query, if you are the query owner
  *  As you can see, once you are logged now there is a new button available `logout` on the top navbar
  *  For admin privileges, consider login in as `administrator` with `verystrongpassword` as password (or creating an account with such username)
  *  Now you can see what the others cannot, if you go for example, to `Queries`, you will notice additional info about all queries (the fields `visible to users` and `admin query`, which refer to the status and the origin of the query)
  *  You will also notice a button `Reboot` close to the search input field, here you can reboot your app and only remain the the `admin query` queries as `visible` (don't worry, as an admin you are still going to be able to see all queries and they will keep intact in our database)
  *  By checking the queries, query comments and users in the `Users` route, you will notice that all of those have a `trash` icon button, I wonder why?
  *  At last be not least, as an admin, you can delete any query, comment and user (yes, even your own! so use those powers carefully :-) )
