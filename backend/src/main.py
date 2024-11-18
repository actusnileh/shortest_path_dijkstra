from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import routes


def create_app():
    app = FastAPI(title="Dijkstra")

    app.include_router(routes)

    return app
