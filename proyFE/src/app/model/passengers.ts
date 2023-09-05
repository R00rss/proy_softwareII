export interface Passengers {
    old: number;
    adults: number;
    children: number;
    infants: number;
}

export type PassengerType = keyof Passengers;

export interface PassengerInfo {
    name: string;
    lastName: string;
    passport: string;
    birdDate?: Date;
    type: PassengerType; // Usar PassengerType como tipo para 'type'
}