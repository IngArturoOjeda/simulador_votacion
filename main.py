from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Esto sirve todo lo que esté en tu carpeta actual
app.mount("/", StaticFiles(directory=".", html=True), name="static")