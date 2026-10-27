from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Homework App")

class User(BaseModel):
    name : str
    age : int
    isAdult : bool

@app.get("/ping")
def ping():
    return {"status" : "ok"}

@app.get("/square/{number}")
def square(number : int):
    return {"number" : number, "square" : number ** 2}

@app.get("/fullname")
def fullname(name : str, surname : str):
    return {"fullname" : f"{name} {surname}"}

@app.get("/revers/{text}")
def revers_text(text):
    return {"text" : text, "revers_text" : text[::-1]}

@app.post("/user")
def create_user(user : User):
    return {
        "user" : user.name,
        "age" : user.age,
        "isAdult" : user.name >= 18
        }