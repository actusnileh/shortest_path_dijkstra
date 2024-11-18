from src.schemas.dijkstra_schema import GraphRequest
from src.services.dijkstra_service import dijkstra
from fastapi import APIRouter


router = APIRouter()


@router.post("/dijkstra/")
async def dijkstra_endpoint(request: GraphRequest):
    distances, predecessors, log = dijkstra(request.graph, request.start)

    return {
        "distances": distances,
        "predecessors": predecessors,
        "log": log,
    }
