from sqlalchemy import create_engine, Column, Integer, String, Text, Sequence
from sqlalchemy.ext.declarative import declarative_base

# Database setup
DATABASE_URL = "sqlite:///./ideas.db"  # SQLite database

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()

# Define the Idea model
class IdeaModel(Base):
    __tablename__ = "ideas"

    id = Column(Integer, Sequence('idea_id_seq'), primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    tags = Column(String, nullable=True)  # You can store tags as a comma-separated string
