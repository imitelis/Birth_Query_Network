# the very basics
import uvicorn
from fastapi import FastAPI

# middlewares
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# introducing our API
import tracemalloc

# and our API routers
from routers import users_router, queries_router, query_comments_router, birth_query_router

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
    description='Birth Query Network for the BigQuery data of "sdoh_cdc_wonder_natality" from Google Cloud',
    version='0.2.0'
)


"""
Middleware config, here we can set the allowed
ports to host our API, but also the origins of
its CORS requests, very useful when deploying
our actual project unto the cloud services
"""
app.add_middleware(TrustedHostMiddleware, allowed_hosts=['localhost', '127.0.0.1'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=['localhost', '127.0.0.1'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


"""
Hello client! so by visiting this endpoint
we can be aware that our server is running
"""
@app.get("/", tags=["hello"])
def greet_client():
    return {"message": "Hello from the Birth Query Network!"}


"""
Our app now can include the APIRouters
we just created in the routers folder
"""
app.include_router(birth_query_router, tags=["birth query"])
app.include_router(users_router, tags=["users"])
app.include_router(queries_router, tags=["queries"])
app.include_router(query_comments_router, tags=["query comments"])

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)