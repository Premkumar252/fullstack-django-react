from fastapi import FastAPI
from api.models import Student
from asgiref.sync import sync_to_async

app = FastAPI()

@sync_to_async
def create_student(data):
    return Student.objects.create(**data)

@sync_to_async
def get_students():
    return list(Student.objects.values())

@sync_to_async
def filter_students(name):
    return list(Student.objects.filter(name__icontains=name).values())

@app.post("/insert/")
async def insert_student(data: dict):
    student = await create_student(data)
    return {"message": "Inserted"}

@app.get("/students/")
async def fetch_students():
    return await get_students()

@app.get("/filter/")
async def filter_data(name: str):
    return await filter_students(name)