# Birth Query Network: Userguide

Dear user, thank you so much for trusting our Google cloud data and for selecting us!

After finishing this small guide, you are going to be capable to run the product in your own machine and use it locally (for having it deployed in the cloud, you would have to contact us for details and pricing :-) )


**NOTE:** This guide was written supposing that you are a final client (an IT specialist who can replicate these instructions), i.e. someone who has access to our services in a production form (so you someone gave you a file that contains `birth_query-i.tar`, `birthquery.sql`, `docker-compose.prod.yml` and a copy of this file)

**NOTE:** If you want to expand the understanding of the backend, frontend, database, bigquery and docker of our app, and check some useful commands you should use the well-docummented coderguide in the `README.md` file on the repository folder; `https://github.com/imitelis/Birth_Query_Network/`

**REQUIREMENTS:** Both this guide and the youtube video assumes that you have certain requirements installed in your OS; git, psql, docker and docker compose. If that's not the case, then I would also suggest you to point again to the coderguide in the `README.md` file


## Youtube Video:
  *  For our trainees, interns and junior engineers: ``


## Make the App run locally:
  *  Well, this guide cannot asume that you are a tech wizard, but it supposes at least that you are somehow familiar with a computer terminal
  *  Start by unzipping the file `birthquery.rar` and extract it in a folder, you'll see the files: `birth_query-i.tar`, `birthquery.sql`, `docker-compose.prod.yml` and `USERGUIDE.md` (an actual copy of this file)
  *  Just in case, check that you don't have any docker images titled as: `birth_query_network_frontend`, `birth_query_network_backend` and `postgres:14` (you can use `docker images -a` in the terminal for this)
  *  If that is not the case, then be sure to completely delete them, you can use `docker rmi <image_id>` for achieving this
  *  Now, start by loading the app image by using `docker load -i birth_query-i.tar`, after success, use `docker images -a` to check they are there
  *  Finally, by locating in a folder with the docker compose file, run `docker compose -f docker-compose.prod.yml up`
  *  You'll read the magic happening in the terminal, why don't you visit `localhost:9000` and check it out in the browser? :-)
  *  Well, that turned out to be pretty, but now you need to load the sql data unto the database container so your app isn't data empty
  *  By using `docker images -a`, find out the name of the container that serves the database image, in my case it was `bq-database-c`
  *  After identifying it you can use `cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery`
  *  And that's it! Now you have the database data in your container, feel free to continue using the app in `localhost:9000`


## Once that App is running:
  *  And that's it! From here you can go to `localhost:9000/` in your preferred browser and see the app running
  *  In the home page, you can go to the navbar at top and go to `sign up` in order to create your new account (or you feel uncomfortable you can log in directly by using `goodcitizen` as the username and `veryoriginalpassword` for the password)
  *  And after a successfully signing up (you'll be notified about this), you can go to login to log with your new account
  *  From here you are going to be capable to new options in the navbar, particularly the `Queries`, click there
  *  In this page, you can see the full list of all queries created by other users and you can search on them by name on the searching field
  *  You can also select a random query and by pressing on its `Run Query` button it will automatically redirect you to the executed Birth Query
  *  Here you can manipulate the query and make one on your own, feel free to customize it as much as you want
  *  If you are happy with the result, you can use `Save Query` to save your query, it will request you a query name and query comment, your username will be setted automatically.
  *  So now other users can go and see your query, they can also run it
  *  As you can see, once you are logged now there is a new button available `logout` on the top navbar
  *  For admin privileges, consider login in as `administrator` with `verystrongpassword` as password
  *  Now you can see what the others cannot, if you go for example, to `Queries`, you will notice additional info about all queries (the fields `visible` and `primal`, which refer to the status and the origin of the query)
  *  You will also notice a button with a "switch" icon close to the search input field, here you can reboot your app and only remain the the `primal` queries as `visible` (don't worry, as an admin you are still going to be able to see all queries and they will keep intact in our database)
  *  Checking the queries, query comments and users in the `Users` route, you will notice that all of those have a `trash` icon button, why would it be?
  *  At last be not least, as an admin, you can delete any query, comment and even user (yes, even yourself! so use those powers carefully :-) )
