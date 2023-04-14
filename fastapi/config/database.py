from os import environ
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

protocol = environ['DB_PROTOCOL']
username = environ['DB_USER']
password = environ['DB_PASS']
host = environ['DB_HOST']
port = environ['DB_PORT']
database = environ['DB_NAME']

engine = create_engine(
    url=f"{protocol}://{username}:{password}@{host}:{port}/{database}",
    echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db=next(get_db())