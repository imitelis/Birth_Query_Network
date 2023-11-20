# Birth Query Network: Userguide

Dear user, thank you so much for trusting our Google cloud data and selecting us!

After finishing this small guide, you are going to be capable to run the product in your own machine and use it locally (for having it deployed in the cloud, you would have to contact us for details and pricing :-) )


**NOTE:** This guide was written supposing that you are a final client (an IT specialist who can replicate these instructions), i.e. someone who has access to our services in a production form (so you someone gave you a file that contains `birth_query-i.tar`, `birthquery.sql`, `docker-compose.prod.yml` and a copy of this file)

**NOTE:** If you want to expand the understanding of the backend, frontend, database, bigquery and docker of our app, and check some useful commands you should use the well-docummented coderguide in the `README.md` file on the repository folder; `https://github.com/imitelis/Birth_Query_Network/`

**REQUIREMENTS:** Both this guide and the youtube video assumes that you have certain requirements installed in your OS; git, psql, docker and docker compose. If that's not the case, then I would also suggest you to point out again to the coderguide in the `README.md` file


## Youtube Video:
  *  For our trainees, interns and junior engineers: ``


## Make the App run locally:
  *  Well, this guide cannot asume that you are a tech wizard, but it supposes at least that you are somehow familiar with a computer terminal
  *  Someone has passed you a `.rar` file that contains the dockerized app image: a `birth_query-i.tar` file, our `docker-compose.prod.yaml`, our production database `birthquery.sql`, a `USERGUIDE.md` document and a naive `activate.sh` file 
  *  Just in case, check that you don't have any docker images titled as: `birth_query_network_frontend`, `birth_query_network_backend` and `postgres:14` (you can use `docker images -a` in the terminal for this)
  *  From all of those images, probably the only problematic one might be `postgres:14`, so you can also rename it by using something like `docker tag postgres:14 mynewimage:tag`, but if you do this you are going to have to set the new image name in the `docker-compose.prod.yaml` file
  *  If that is not the case, then be sure to completely delete them, you can use `docker rmi <image_id>` for achieving this
  *  And if they depend on existing containers then you are going to have to find those containers and remove them first
  *  If you want to delete all existing images `docker stop $(docker ps -a -q) docker rm $(docker ps -a -q)` (be sure to never do this on your company computer)
  *  Now, start by loading the app image by using `docker load -i birth_query-i.tar`, after success, use `docker images -a` to check they are there
  *  And after having given the proper permissions (to the `.sh` file), run `source activate.sh` to activate the environment variables from our images
  *  Finally, by locating in a folder with the docker compose file, run `docker compose -f docker-compose.prod.yml up --build`
  *  You'll read the magic happening in the terminal, so why don't you visit `localhost:9000` and check it out in the browser? :-)
  *  Well, that turned out to be pretty, but now you need to load the sql data unto the database container so your app isn't data empty
  *  By using `docker images -a`, find out the name of the container that serves the database image, in my case it was `bq-database-c`
  *  After identifying it you can use `cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery`
  *  And that's it! Now you have the database data in your container, feel free to continue using the app in `localhost:9000`
  *  And if you want to check the API documentation, you are welcome to visit `localhost:8000/docs#` (although from now you are going to have to set the header authorizations before trying to do any actual request)
  *  This might lead you to think about using Postman or Insomnia again, or just to login and use the actual app


## Once that App is running:
  *  And that's it! From here you can go to `localhost:9000/` in your preferred browser and see the app running
  *  In the home page, you can go to the navbar at top and go to `sign up` in order to create your new account (or you feel uncomfortable you can log in directly by using `goodcitizen` and `veryoriginalpassword`, but only after having loaded the database data in the database container)
  *  And after a successfully signing up (you'll be notified about this), you can go to login to log with your new account
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
  *  At last be not least, as an admin, you can delete any query, comment and user (yes, even yourself! so use those powers carefully :-) )
