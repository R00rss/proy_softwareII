import { PassengerInfo } from './passengers'

export interface Client extends PassengerInfo {
    email: string,
    phone: string,
}