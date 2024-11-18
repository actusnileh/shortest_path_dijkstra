from pydantic import BaseModel


class GraphRequest(BaseModel):
    graph: list[list[tuple[int, float]]]
    start: int
