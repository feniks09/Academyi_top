from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI(title="Books API")

class Book(BaseModel):
    id: int
    title: str
    author: str
    year: int


class BookCreate(BaseModel):
    title: str
    author: str
    year: int


books: list[Book] = []

_next_id = 0


@app.get("/books", response_model=list[Book])
def get_books(author: str | None = None):
    if author:
        return [b for b in books if b.author == author]
    return books


@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    for b in books:
        if b.id == book_id:
            return b
    raise HTTPException(status_code=404, detail="Book not found")

@app.post("/books", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate):
    global _next_id
    _next_id += 1
    new_book = Book(id=_next_id, **book.model_dump())
    books.append(new_book)
    return new_book


@app.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, book: BookCreate):
    for i, b in enumerate(books):
        if b.id == book_id:
            updated = Book(id=book_id, **book.model_dump())
            books[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Book not found")


@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int):
    for i, b in enumerate(books):
        if b.id == book_id:
            books.pop(i)
            return
    raise HTTPException(status_code=404, detail="Book not found")