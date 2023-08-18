export const TYPE_COLUMN = {
    TEXT: 'TEXT',
    DATE: 'DATE',
    NUMBER: 'NUMBER'
}

export const ICON_SORT_TYPE = {
    TEXT: {
        ASC: 'pi-sort-alpha-up',
        DESC: 'pi-sort-alpha-down'
    },
    DATE: {
        ASC: 'pi-sort-amount-up',
        DESC: 'pi-sort-amount-down'
    },
    NUMBER: {
        ASC: 'pi-sort-numeric-up-alt',
        DESC: 'pi-sort-numeric-down-alt'
    }
}


export const EXAMPLE_FLIGHTS = [{
    "plane_id": "b055fdfe-ffae-4372-939a-33e55334dbb7",
    "pilot_id": "e12a107a-75cf-48a3-9e1b-25c046b22606",
    "airport_origin_id": "6e1267dc-8b06-458b-8d60-d7a05cc83cbd",
    "airport_destination_id": "1ce6c77e-feb2-4cea-94ad-0bf90a6ca6d4",
    "origin": "Guayaquil",
    "destination": "Quito",
    "departure": "2023-08-15T23:57:44.489575",
    "arrival": "2023-08-16T07:57:44.489575",
    "id": "505036c7-f186-45b7-a024-973df6006b15",
    "pilot": {
        "name": "Ronny",
        "lastname": "Garcia",
        "ci": "1723403083",
        "license": "B1",
        "id": "e12a107a-75cf-48a3-9e1b-25c046b22606"
    },
    "plane": {
        "model": "Boeing 747",
        "capacity": 400,
        "serial_number": "SN123",
        "code": "PLN001",
        "id": "b055fdfe-ffae-4372-939a-33e55334dbb7"
    },
    "airport_origin": {
        "name": "Mariscal Sucre",
        "city": "Guayaquil",
        "country": "Ecuador",
        "code": "0001",
        "id": "6e1267dc-8b06-458b-8d60-d7a05cc83cbd"
    },
    "airport_destination": {
        "name": "José Joaquín de Olmedo",
        "city": "Quito",
        "country": "Ecuador",
        "code": "0002",
        "id": "1ce6c77e-feb2-4cea-94ad-0bf90a6ca6d4"
    },
    "reservations": []
}]