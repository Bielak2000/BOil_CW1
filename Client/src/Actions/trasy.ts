import client from '../Services/api'
import {Pojazd} from "./pojazdy";
import {Kierowca} from "./kierowcy";

export interface Trasa {
    ID_kursu: number,
    data: Date,
    km: number,
    cena_paliwa: number,
    pojazd: Pojazd,
    ID_pojazdu: number,
    kierowca: Kierowca,
    ID_kierowcy: number
}

export interface TrasaDto {
    ID_pojazdu: number,
    ID_kierowcy: number,
    cena_paliwa: number,
    km: number,
    data: Date
}

const trasy = {
    getAll: () => client.get<Trasa[]>('/trasy'),
    getById: (id: number) => client.get<Trasa>(`/trasy/${id}`),
    update: (id: number, {ID_pojazdu, ID_kierowcy, cena_paliwa, km, data}: TrasaDto) => client.put(`/trasy/${id}`, {ID_pojazdu, ID_kierowcy, cena_paliwa, km, data}),
    remove: (id: number) => client.delete(`/trasy/${id}`),
    create: ({ID_pojazdu, ID_kierowcy, cena_paliwa, km, data}: TrasaDto) => client.post('/trasy', {ID_pojazdu, ID_kierowcy, cena_paliwa, km, data})
}

export default trasy;