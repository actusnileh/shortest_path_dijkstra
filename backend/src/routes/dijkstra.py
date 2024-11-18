from fastapi import APIRouter


router = APIRouter()


@router.post("/dijkstra/")
async def dijkstra():
    pass
