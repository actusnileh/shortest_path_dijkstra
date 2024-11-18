from fastapi import APIRouter
from src.routes.dijkstra import router as solve_router

routes = APIRouter()

router_list = [solve_router]

for router in router_list:
    routes.include_router(router)
