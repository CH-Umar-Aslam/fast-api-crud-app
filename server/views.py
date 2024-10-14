from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import IdeaModel
from serializers import Idea
from typing import List, Optional
from database import SessionLocal

router = APIRouter()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to get all ideas
@router.get("/ideas", response_model=List[Idea])
async def read_ideas(db: Session = Depends(get_db)):
    return db.query(IdeaModel).all()

# Route to create a new idea
@router.post("/ideas", response_model=Idea)
async def create_idea(idea: Idea, db: Session = Depends(get_db)):
    db_idea = IdeaModel(**idea.dict())
    db.add(db_idea)
    db.commit()
    db.refresh(db_idea)
    return db_idea

# Route to update an existing idea by its ID
@router.put("/ideas/{idea_id}", response_model=Idea)
async def update_idea(idea_id: int, idea: Idea, db: Session = Depends(get_db)):
    db_idea = db.query(IdeaModel).filter(IdeaModel.id == idea_id).first()
    if db_idea is None:
        raise HTTPException(status_code=404, detail="Idea not found")
    
    for key, value in idea.dict(exclude_unset=True).items():
        setattr(db_idea, key, value)
    
    db.commit()
    db.refresh(db_idea)
    return db_idea

# Route to delete an idea by its ID
@router.delete("/ideas/{idea_id}")
async def delete_idea(idea_id: int, db: Session = Depends(get_db)):
    db_idea = db.query(IdeaModel).filter(IdeaModel.id == idea_id).first()
    if db_idea is None:
        raise HTTPException(status_code=404, detail="Idea not found")

    db.delete(db_idea)
    db.commit()
    return {"message": "Idea deleted"}
