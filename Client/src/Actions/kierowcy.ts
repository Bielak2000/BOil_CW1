import client from '../Services/api'

export interface Kierowca {
    ID_kierowcy: number,
    imie: string,
    nazwisko: string,
    pesel: string,
    stawka: number,
    nr_telefonu: string,
}

export interface KierowcaDto {
    imie: string,
    nazwisko: string,
    pesel: string,
    stawka: number,
    nr_telefonu: string,
}


const kierowcy = {
    getAll: () => client.get<Kierowca[]>('/kierowcy'),
    getById: (id: number) => client.get<Kierowca>(`/kierowcy/${id}`),
    update: (id: number, {imie, nazwisko, pesel, stawka, nr_telefonu}: KierowcaDto) => client.put(`/kierowcy/${id}`, {imie, nazwisko, pesel, stawka, nr_telefonu}),
    remove: (id: number) => client.delete(`/kierowcy/${id}`),
    create: ({ imie, nazwisko, pesel, stawka, nr_telefonu}: KierowcaDto) => client.post('/kierowcy', {imie, nazwisko, pesel, stawka, nr_telefonu})
}

export default kierowcy;