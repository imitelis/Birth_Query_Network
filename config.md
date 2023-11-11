### MINIMUM

Your application will be composed of a minimum of these components:

  *  The assigned BigQuery read-only database.
  *  A graphical web frontend written in Javascript or Typescript. 
  *  Use either Vue or a React framework. 
	A backend written in Python or Java.
	If you are using Python, you should use either Flask or Django.
	If you are using Java, you should use either Spring Boot or Dropwizard.
  *  Your own read-write database. This can be either by MySQL or PostgreSQL. This is where you will store all state specific to your application. 
  *  A Docker compose file that runs the application.
It should run a minimum of 3 containers: your frontend, your backend, and a database.

(remember to fill this form: https://docs.google.com/forms/d/e/1FAIpQLScSBvVtvT9mNeO_FgVrodAymHYmSE4dXrNndiA96farYuWYOQ/viewform)

# (My) Architecture
  *  **BigQuery:** database name; sdoh_cdc_wonder_natality, tables:
  country_natality, country_natality_by_abnormal_conditions, 		  country_natality_by_congenital_abnormalities, country_natality_by_father_race, country_natality_by_mother_race, country_natality_by_maternal_morbidity, country_natality_by_payment

  *  **FrontEnd:** React, Redux, BigQuery, D3, Tailwind
  
  *  **BackEnd:** FastAPI, SQLAlchemy, PostgreSQL, Pydantic, Pytest, Httpx
  
  *  **DevOps:** Docker, Git Actions
  
