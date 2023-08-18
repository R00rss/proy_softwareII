from fastapi import FastAPI, HTTPException, Depends, Query

from os import path
import uvicorn
from database.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from database import models, schemas
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import schemas as schemasResponse

origins = [
    # all origins
    "*"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pathname = path.dirname(path.realpath(__file__))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Rutas CRUD para la tabla Plane
@app.get("/planes/", response_model=List[schemas.Plane])
def read_plane(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    db_planes = db.query(models.Plane).offset(skip).limit(limit).all()
    if db_planes is None:
        raise HTTPException(status_code=404, detail="Plane not found")
    return db_planes


@app.post("/planes/", response_model=schemas.Plane)
def create_plane(plane: schemas.PlaneCreate, db: Session = Depends(get_db)):
    db_plane = models.Plane(**plane.dict())
    db.add(db_plane)
    db.commit()
    db.refresh(db_plane)
    return db_plane


@app.get("/planes/{plane_id}", response_model=schemas.Plane)
def read_plane(plane_id: str, db: Session = Depends(get_db)):
    db_plane = db.query(models.Plane).filter(models.Plane.id == plane_id).first()
    if db_plane is None:
        raise HTTPException(status_code=404, detail="Plane not found")
    return db_plane


@app.put("/planes/{plane_id}", response_model=schemas.Plane)
def update_plane(
    plane_id: str, plane: schemas.PlaneCreate, db: Session = Depends(get_db)
):
    db_plane = db.query(models.Plane).filter(models.Plane.id == plane_id).first()
    if db_plane is None:
        raise HTTPException(status_code=404, detail="Plane not found")
    for key, value in plane.dict().items():
        setattr(db_plane, key, value)
    db.commit()
    db.refresh(db_plane)
    return db_plane


@app.delete("/planes/{plane_id}", response_model=schemas.Plane)
def delete_plane(plane_id: str, db: Session = Depends(get_db)):
    db_plane = db.query(models.Plane).filter(models.Plane.id == plane_id).first()
    if db_plane is None:
        raise HTTPException(status_code=404, detail="Plane not found")
    db.delete(db_plane)
    db.commit()
    return db_plane


# Rutas CRUD para la tabla Flight
@app.get("/flights/", response_model=List[schemas.Flight])
def read_flights(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    db_flights = db.query(models.Flight).offset(skip).limit(limit).all()
    return db_flights


@app.get("/flights/search", response_model=schemasResponse.DataAndCount[schemas.Flight])
def search_flights(
    db: Session = Depends(get_db),
    dateFrom: datetime = Query(None),
    dateTo: datetime = Query(None),
    origin: str = Query(None),
    destination: str = Query(None),
    skip: int = 0,
    limit: int = 100,
):
    query = db.query(models.Flight)

    if dateFrom:
        query = query.filter(models.Flight.departure >= dateFrom)
    if dateTo:
        query = query.filter(models.Flight.departure <= dateTo)
    if origin:
        query = query.filter(models.Flight.origin == origin)
    if destination:
        query = query.filter(models.Flight.destination == destination)

    total_count = query.count()

    db_flights = query.offset(skip).limit(limit).all()

    # if not db_flights:
    #     raise HTTPException(status_code=404, detail="No flights found")

    return schemasResponse.DataAndCount[schemas.Flight](
        data=db_flights, count=total_count
    )


@app.post("/flights/", response_model=schemas.Flight)
def create_flight(flight: schemas.FlightCreate, db: Session = Depends(get_db)):
    db_flight = models.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight


@app.get("/flights/{flight_id}", response_model=schemas.Flight)
def read_flight(flight_id: str, db: Session = Depends(get_db)):
    db_flight = db.query(models.Flight).filter(models.Flight.id == flight_id).first()
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight


@app.put("/flights/{flight_id}", response_model=schemas.Flight)
def update_flight(
    flight_id: str, flight: schemas.FlightCreate, db: Session = Depends(get_db)
):
    db_flight = db.query(models.Flight).filter(models.Flight.id == flight_id).first()
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    for key, value in flight.dict().items():
        setattr(db_flight, key, value)
    db.commit()
    db.refresh(db_flight)
    return db_flight


@app.delete("/flights/{flight_id}", response_model=schemas.Flight)
def delete_flight(flight_id: str, db: Session = Depends(get_db)):
    db_flight = db.query(models.Flight).filter(models.Flight.id == flight_id).first()
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    db.delete(db_flight)
    db.commit()
    return db_flight


# Rutas CRUD para la tabla Airports
@app.get("/airports/", response_model=List[schemas.Airport])
def read_airports(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    db_airports = db.query(models.Airport).offset(skip).limit(limit).all()
    return db_airports


@app.get("/airports/search", response_model=List[schemas.Airport])
def search_airports(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    query = db.query(models.Airport)
    db_airport = query.offset(skip).limit(limit).all()
    if not db_airport:
        raise HTTPException(status_code=404, detail="No airports found")
    return db_airport


@app.post("/airports/", response_model=schemas.Airport)
def create_airports(airport: schemas.AirportCreate, db: Session = Depends(get_db)):
    db_airport = models.Airport(**airport.dict())
    db.add(db_airport)
    db.commit()
    db.refresh(db_airport)
    return db_airport


@app.get("/airports/{airport_id}", response_model=schemas.Airport)
def read_airport(airport_id: str, db: Session = Depends(get_db)):
    db_airport = (
        db.query(models.Airport).filter(models.Airport.id == airport_id).first()
    )
    if db_airport is None:
        raise HTTPException(status_code=404, detail="Airport not found")
    return db_airport


@app.put("/airports/{airport_id}", response_model=schemas.Airport)
def update_airport(
    airport_id: str, airport: schemas.AirportCreate, db: Session = Depends(get_db)
):
    db_airport = (
        db.query(models.Airport).filter(models.Airport.id == airport_id).first()
    )
    if db_airport is None:
        raise HTTPException(status_code=404, detail="Airport not found")
    for key, value in airport.dict().items():
        setattr(db_airport, key, value)
    db.commit()
    db.refresh(db_airport)
    return db_airport


@app.delete("/airports/{airport_id}", response_model=schemas.Airport)
def delete_airport(airport_id: str, db: Session = Depends(get_db)):
    db_airport = db.query(models.Flight).filter(models.Airport.id == airport_id).first()
    if db_airport is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    db.delete(db_airport)
    db.commit()
    return db_airport


@app.get("/airports/", response_model=List[schemas.Airport])
def read_airports(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    db_airports = db.query(models.Airport).offset(skip).limit(limit).all()
    return db_airports


@app.get("/destinations/", response_model=List[schemasResponse.destination])
def get_destinations(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    db_airports = db.query(models.Airport).offset(skip).limit(limit).all()
    return db_airports


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
