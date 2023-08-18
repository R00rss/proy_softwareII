-- Insert data into plane table
INSERT INTO plane (model, capacity, serial_number, code)
VALUES
    ('Boeing 747', 400, 'SN123', 'PLN001'),
    ('Airbus A320', 180, 'SN456', 'PLN002'),
    ('Embraer E190', 100, 'SN789', 'PLN003'),
    -- ... add more rows here ...

-- Insert data into pilot table
INSERT INTO pilot (name, lastname, ci, license)
VALUES
    ('John', 'Doe', '123456789', 'P12345'),
    ('Jane', 'Smith', '987654321', 'P67890'),
    ('Michael', 'Johnson', '567890123', 'P54321'),
    -- ... add more rows here ...

-- Insert data into airport table
INSERT INTO airport (name, city, country, code)
VALUES
    ('JFK International Airport', 'New York', 'USA', 'JFK'),
    ('Heathrow Airport', 'London', 'UK', 'LHR'),
    ('Charles de Gaulle Airport', 'Paris', 'France', 'CDG'),
    -- ... add more rows here ...

-- Insert data into passenger table
INSERT INTO passenger (name, lastname, ci, phone, email)
VALUES
    ('Alice', 'Johnson', '111111111', '123-456-7890', 'alice@example.com'),
    ('Bob', 'Smith', '222222222', '987-654-3210', 'bob@example.com'),
    ('Eve', 'Davis', '333333333', '555-555-5555', 'eve@example.com'),
    -- ... add more rows here ...

-- Insert data into user table
INSERT INTO "user" (name, lastname, ci, phone, email, password, role)
VALUES
    ('Admin', 'Adminson', '444444444', '999-999-9999', 'admin@example.com', 'admin123', 'admin'),
    ('User', 'Userson', '555555555', '888-888-8888', 'user@example.com', 'user123', 'user'),
    -- ... add more rows here ...

-- Insert data into luggage table
INSERT INTO luggage (weight, price)
VALUES
    (20.5, 50.00),
    (15.0, 30.00),
    (10.2, 25.00),
    -- ... add more rows here ...

-- Insert data into airplane_seat table
INSERT INTO airplane_seat (plane_id, seat_number, seat_type, seat_status)
VALUES
    ('34cf3f16-2170-4515-ac2f-ea2e7eb19f79', '1A', 'First Class', 'Available'),
    ('34cf3f16-2170-4515-ac2f-ea2e7eb19f79', '1B', 'First Class', 'Available'),
    ('34cf3f16-2170-4515-ac2f-ea2e7eb19f79', '2A', 'Business Class', 'Available'),
    -- ... add more rows here ...

-- Insert data into flight table
INSERT INTO flight (plane_id, pilot_id, airport_origin_id, airport_destination_id, origin, destination, departure, arrival)
VALUES
    ('PLN001', 'P12345', 'JFK', 'LHR', 'New York', 'London', NOW(), NOW() + INTERVAL '8 hours'),
    ('PLN002', 'P67890', 'LHR', 'CDG', 'London', 'Paris', NOW(), NOW() + INTERVAL '4 hours'),
    -- ... add more rows here ...

-- Insert data into invoice table
INSERT INTO invoice (invoice_status, invoice_date, payment_type, payment_status, user_id, total)
VALUES
    ('Pending', NOW(), 'Credit Card', 'Unpaid', '444444444', 150.00),
    ('Paid', NOW(), 'PayPal', 'Paid', '555555555', 250.00),
    -- ... add more rows here ...

-- Insert data into reservation table
INSERT INTO reservation (flight_id, seat_id, passenger_id, luggage_id, invoice_id, reservation_code, reservation_status, reservation_date)
VALUES
    ('FLIGHT_ID_1', 'SEAT_ID_1', 'PASSENGER_ID_1', 'LUGGAGE_ID_1', 'INVOICE_ID_1', 'RES123', 'Confirmed', NOW()),
    ('FLIGHT_ID_2', 'SEAT_ID_2', 'PASSENGER_ID_2', 'LUGGAGE_ID_2', 'INVOICE_ID_2', 'RES456', 'Confirmed', NOW()),
    -- ... add more rows here ...
