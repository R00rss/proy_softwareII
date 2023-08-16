from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL


url = URL.create(
    drivername="postgresql",
    username="admin",
    host="localhost",
    database="AirlineDev",
    password="devDB123",
)

# DATABASE_URL = "postgresql://admin:devDB123@localhost/AirlineDev"  # El formato es: dialect://user:password@host:port/database_name

# Crear la instancia del motor de la base de datos
engine = create_engine(url)

# Crear una sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
