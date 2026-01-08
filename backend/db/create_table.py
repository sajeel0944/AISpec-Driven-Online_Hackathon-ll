import sys
from pathlib import Path

# ensure project root is on sys.path so imports like `models` work
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlmodel import SQLModel, create_engine
import os
from dotenv import load_dotenv
from models.todo import AddTodoNeno, userTodoData

# --- LOAD ENV VARIABLES ---
load_dotenv()

# --- DATABASE CONNECTION STRING ---
NEON_DB_CONNECTION = os.getenv("NEON_DB_CONNECTION")
engine = create_engine(NEON_DB_CONNECTION)

# --- CREATE DATABASE AND TABLES ---
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    print("Database and tables created.")

if __name__ == "__main__":
    create_db_and_tables()  