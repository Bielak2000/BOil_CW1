import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import trasaApi from "../../Actions/trasy";
import pojazdApi, {Pojazd} from "../../Actions/pojazdy";
import kierowcaApi, {Kierowca} from "../../Actions/kierowcy";
import {useForm} from "@mantine/hooks";
import * as React from 'react';
import Calendar from 'react-calendar';
import {render} from "react-dom";
import { format } from "date-fns";



export const TrasaForm = () => {
    const {id} = useParams<{ id?: string }>();
    

    const form = useForm({
        initialValues: {
            ID_pojazdu: '1',
            ID_kierowcy: '1',
            cena_paliwa: '50',
            km: '1',
            data: new Date('December 20, 2020 10:30:00')
        }
    });

    const [pojazdy, setPojazdy] = useState<Pojazd[]>([]);
    const [kierowcy, setKierowcy] = useState<Kierowca[]>([]);
    const [isError, setError] = useState(false);
    const navigate = useNavigate();
    const [date, onChange] = useState(new Date());

  

    

    useEffect(() => {
        pojazdApi.getAll().then(response => {
            setPojazdy(response.data);
        });
    }, [])

    useEffect(() => {
        kierowcaApi.getAll().then(response => {
            setKierowcy(response.data);
        });
    }, [])

    useEffect(() => {
        if (id)
            trasaApi
                .getById(parseInt(id!))
                .then((response) => {
                    const webTrasa = response.data;
                    form.setValues({
                        ID_pojazdu: webTrasa.ID_pojazdu.toString(),
                        ID_kierowcy: webTrasa.ID_kierowcy.toString(),
                        cena_paliwa: webTrasa.cena_paliwa.toString(),
                        km: webTrasa.km.toString(),
                        data: webTrasa.data
                    });
                })
    }, [id])



    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        form.onSubmit((values) => {
            console.log(values)

            if(id) {
                trasaApi.update(parseInt(id), {
                    ID_pojazdu: parseInt(values.ID_pojazdu),
                    ID_kierowcy: parseInt(values.ID_kierowcy),
                    cena_paliwa: parseInt(values.cena_paliwa),
                    km: parseInt(values.km),
                    data: date
                }).then(() => {
                    navigate('/trasy')
                }).catch(() => {
                    setError(true)
                })
            } else {
                trasaApi.create({
                    ID_pojazdu: parseInt(values.ID_pojazdu),
                    ID_kierowcy: parseInt(values.ID_kierowcy),
                    cena_paliwa: parseInt(values.cena_paliwa),
                    km: parseInt(values.km),
                    data: date
                }).then(() => {
                    navigate('/trasy')
                }).catch(() => {
                    setError(true)
                })
            }

        })(event);
    }

    return (
        <Container size="xl">
            <Space h="md"/>
            <Center>
                <Paper padding="md" style={{width: 400}} shadow="xs" radius="lg">
                    <form onSubmit={handleFormSubmit}>
                        <Select
                            label="Pojazd"
                            name="pojazd"
                            placeholder="Podaj Pojazd"
                            required
                            data={pojazdy.map(a => ({label: a.nr_rejestracyjny.toString(), value: a.ID_pojazdu.toString()}))}
                            {...form.getInputProps('ID_pojazdu')}
                        />

                        <Select
                            label="Kierowca"
                            name="kierowca"
                            placeholder="Podaj Kierowcę"
                            required
                            data={kierowcy.map(a => ({label: (a.imie + " " + a.nazwisko), value: a.ID_kierowcy.toString()}))}
                            {...form.getInputProps('ID_kierowcy')}
                        />

                        <TextInput
                            placeholder="Podaj cenę paliwa"
                            name="cena_paliwa"
                            label="Cena paliwa"
                            required
                            {...form.getInputProps('cena_paliwa')}
                        />

                        <TextInput
                            placeholder="Podaj ilość kilometrów"
                            name="km"
                            label="Km"
                            required
                            {...form.getInputProps('km')}
                        />

                        <TextInput
                            name="data"
                            label="Data"
                          
                            value={format(date, "dd.MM.yyyy")}
                            required
                          
                        />
                        
                        <div>
                            <Calendar onChange={onChange} value={date} />
                        </div>

                        
                        <Space h="md"/>

                        <Button type="submit" fullWidth style={{background: "#960920"}}>
                            Wyślij
                        </Button>
                    </form>
                    {isError &&
                        <>
                            <Space h="md"/>
                            <Alert color="red" title="Błąd">
                                Podano nieprawidłowe dane
                            </Alert>
                        </>
                    }
                </Paper>

            </Center>


        </Container>
    )
}