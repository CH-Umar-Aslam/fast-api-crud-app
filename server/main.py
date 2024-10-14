from fastapi import FastAPI
from views import router
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware


# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()


# CORS configuration
origins = [
    "http://localhost:5173",  # Add your frontend URL here
   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Include the router from views
app.include_router(router)

@app.get("/")
def welcome():
    return {"message": "Welcome to my FastAPI Ideas application"}
