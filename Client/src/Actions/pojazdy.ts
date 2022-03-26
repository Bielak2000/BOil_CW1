import client from '../Services/api'

export interface Pojazd {
    ID_pojazdu: number;
    nr_rejestracyjny: string;
    stawka: number;
    spalanie: number;
}

export interface PojazdDto {
    nr_rejestracyjny: string;
    stawka: number;
    spalanie: number;
}


const pojazdy = {
    getAll: () => client.get<Pojazd[]>('/pojazdy'),
    getById: (id: number) => client.get<Pojazd>(`/pojazdy/${id}`),
    update: (id: number, {nr_rejestracyjny, stawka, spalanie}: PojazdDto) => client.put(`/pojazdy/${id}`, { nr_rejestracyjny, stawka, spalanie}),
    remove: (id: number) => client.delete(`/pojazdy/${id}`),
    create: ({ nr_rejestracyjny, stawka, spalanie}: PojazdDto) => client.post('/pojazdy', { nr_rejestracyjny, stawka, spalanie})
}

export default pojazdy;