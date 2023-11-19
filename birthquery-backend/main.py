# the very basics
# import os
import uvicorn
from fastapi import FastAPI

# middlewares
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# introducing our API
import tracemalloc

# and our API routers
from routers import users_router, queries_router, query_comments_router, birth_query_router

# dotenv
# from dotenv import load_dotenv


"""
Let's start our FastAPI app :-)
"""
app = FastAPI()

"""
Naming, commenting and versioning our API
"""
tracemalloc.start()

app = FastAPI(
    title='Birth Query API',
    description='Birth Query API for the BigQuery data of "sdoh_cdc_wonder_natality" from Google Cloud',
    version='0.8.0'
)

"""
Let's import those secrety things
by using python-dotenv and os
"""
# load_dotenv()

# ALLOWED_HOST = os.getenv('ALLOWED_HOST')
# ALLOWED_ORIGIN = os.getenv('ALLOWED_ORIGIN')

"""
Middleware config, here we can set the allowed
ports to host our API, but also the origins of
its CORS requests, very useful when deploying
our actual project unto the cloud services
we also configure hosts and origins for settings
"""
origins=["*"]
hosts=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=hosts)

"""
Hello server! so by visiting this endpoint I'm sure we can
all be aware, well aware, that our server is running
"""
@app.get("/", tags=["hello"])
def greet_client():
    return {"message": "Hello from FastAPI!"}

"""
Our app now can include the APIRouters
we just created in the routers folder
"""
app.include_router(birth_query_router, prefix="/api", tags=["birth query"])
app.include_router(users_router, prefix="/api", tags=["users"])
app.include_router(queries_router, prefix="/api", tags=["queries"])
app.include_router(query_comments_router, prefix="/api", tags=["query comments"])


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)