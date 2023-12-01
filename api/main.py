from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get(
    "/",
)
def read_root():
    """

    docstring

    """
    return {"Hello": "World"}


@app.get(
    "/items/{item_id}",
    summary="Sample",
    description="This is sample description.",
    response_description="response",
    tags=["sample"],
)
def read_item(item_id: int, q: Union[str, None] = None):
    """

    docstring

    """
    return {"item_id": item_id, "q": q}
