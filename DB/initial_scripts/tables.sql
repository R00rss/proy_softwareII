-- CREATE DEV DATABASE AND TABLES
-- Create database
CREATE DATABASE AirlineDev;

-- Switch to the newly created database
\c AirlineDev;

-- create table planes
CREATE TABLE IF NOT EXISTS plane (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model varchar(255) NOT NULL,
    capacity int NOT NULL,
    serial_number varchar(255) NOT NULL,
    code varchar(255) NOT NULL
);

-- create table pilots
CREATE TABLE IF NOT EXISTS pilot (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    ci varchar(255) NOT NULL,
    license varchar(255) NOT NULL,
    CONSTRAINT unique_ci_pilot UNIQUE (ci)
);

-- create table airports
CREATE TABLE IF NOT EXISTS airport (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    code varchar(255) NOT NULL,
    CONSTRAINT unique_code_airport UNIQUE (code)
);

-- create table passengers
CREATE TABLE IF NOT EXISTS passenger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    ci varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    CONSTRAINT unique_ci_passenger UNIQUE (ci)
);

-- create table users
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    ci varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    CONSTRAINT unique_ci_user UNIQUE (ci)
);

-- create table luggage
CREATE TABLE IF NOT EXISTS luggage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    weight decimal(10, 2) NOT NULL,
    price decimal(10, 2) NOT NULL
);

-- create table Airplane seats
CREATE TABLE IF NOT EXISTS airplane_seat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plane_id UUID NOT NULL,
    seat_number varchar(255) NOT NULL,
    seat_type varchar(1) NOT NULL,
    seat_status varchar(255) NOT NULL,
    CONSTRAINT fk_airplane_seat_plane FOREIGN KEY (plane_id) REFERENCES plane (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table flights
CREATE TABLE IF NOT EXISTS flight (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plane_id UUID NOT NULL,
    pilot_id UUID NOT NULL,
    airport_origin_id UUID NOT NULL,
    airport_destination_id UUID NOT NULL,
    origin varchar(255) NOT NULL,
    destination varchar(255) NOT NULL,
    departure timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    arrival timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_flight_plane FOREIGN KEY (plane_id) REFERENCES plane (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_flight_pilot FOREIGN KEY (pilot_id) REFERENCES pilot (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_flight_airport_origin FOREIGN KEY (airport_origin_id) REFERENCES airport (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_flight_airport_destination FOREIGN KEY (airport_destination_id) REFERENCES airport (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table invoices
CREATE TABLE IF NOT EXISTS invoice (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_status varchar(255) NOT NULL,
    invoice_date timestamp,
    payment_type varchar(255) NOT NULL,
    payment_status varchar(255) NOT NULL,
    user_id UUID NOT NULL,
    total decimal(10, 2) NOT NULL,
    CONSTRAINT fk_invoice_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table reservations
CREATE TABLE IF NOT EXISTS reservation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flight_id UUID NOT NULL,
    seat_id UUID NOT NULL,
    passenger_id UUID NOT NULL,
    luggage_id UUID NOT NULL,
    invoice_id UUID NOT NULL,
    reservation_code varchar(255) NOT NULL,
    reservation_status varchar(255) NOT NULL,
    reservation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reservation_flight FOREIGN KEY (flight_id) REFERENCES flight (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reservation_seat FOREIGN KEY (seat_id) REFERENCES airplane_seat (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reservation_passenger FOREIGN KEY (passenger_id) REFERENCES passenger (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reservation_invoice FOREIGN KEY (invoice_id) REFERENCES invoice (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reservation_luggage FOREIGN KEY (luggage_id) REFERENCES luggage (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table paypal data
CREATE TABLE IF NOT EXISTS paypal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL,
    paypal_email varchar(255) NOT NULL,
    paypal_password varchar(255) NOT NULL,
    CONSTRAINT fk_paypal_invoice FOREIGN KEY (invoice_id) REFERENCES invoice (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table credit card data
CREATE TABLE IF NOT EXISTS creditcard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL,
    creditcard_number varchar(255) NOT NULL,
    creditcard_name varchar(255) NOT NULL,
    creditcard_expiration varchar(255) NOT NULL,
    creditcard_cvv varchar(255) NOT NULL,
    creditcard_type varchar(255) NOT NULL,
    CONSTRAINT fk_creditcard_invoice FOREIGN KEY (invoice_id) REFERENCES invoice (id) ON DELETE CASCADE ON UPDATE CASCADE
);
