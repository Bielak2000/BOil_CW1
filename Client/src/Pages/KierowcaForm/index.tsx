import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import kierowcaApi, {Kierowca} from "../../Actions/kierowcy";
import {useForm} from "@mantine/hooks";



export const KierowcaForm = () => {
    const {id} = useParams<{ id?: string }>();
    

    const form = useForm({
        initialValues: {
            imie: 'Edumnd',
            nazwisko: 'Nowak',
            pesel: '85868622529', 
            stawka: '1.8',
            nr_telefonu: '957 566 922'
        }
    });

    const [kierowcy, setKierowcy] = useState<Kierowca[]>([]);
    const [isError, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        kierowcaApi.getAll().then(response => {
            setKierowcy(response.data);
        });
    }, [])

    useEffect(() => {
        if (id)
         kierowcaApi
                .getById(parseInt(id!))
                .then((response) => {
                    const webKierowca = response.data;
                    form.setValues({
                        imie: webKierowca.imie.toString(),
                        nazwisko: webKierowca.nazwisko.toString(),
                        pesel: webKierowca.pesel.toString(),
                        stawka: webKierowca.stawka.toString(),
                        nr_telefonu: webKierowca.nr_telefonu.toString()
                    });
                })
    }, [id])



    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        form.onSubmit((values) => {
            console.log(values)

            if(id) {
                kierowcaApi.update(parseInt(id), {
                    imie: values.imie,
                    nazwisko: values.nazwisko,
                    pesel: values.pesel,
                    stawka: parseInt(values.stawka),
                    nr_telefonu: values.nr_telefonu
                }).then(() => {
                    navigate('/kierowcy')
                }).catch(() => {
                    setError(true)
                })
            } else {
                kierowcaApi.create({
                    imie: values.imie,
                    nazwisko: values.nazwisko,
                    pesel: values.pesel,
                    stawka: parseInt(values.stawka),
                    nr_telefonu: values.nr_telefonu
                }).then(() => {
                    navigate('/kierowcy')
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
                        <TextInput
                            placeholder="Podaj imie"
                            name="imie"
                            label="Imie"
                            required
                            {...form.getInputProps('imie')}
                        />

                        <TextInput
                            placeholder="Podaj nazwisko"
                            name="nazwisko"
                            label="Nazwisko"
                            required
                            {...form.getInputProps('nazwisko')}
                        />

                        <TextInput
                            placeholder="Podaj pesel"
                            name="pesel"
                            label="Pesel"
                            required
                            {...form.getInputProps('pesel')}
                        />

                        <TextInput
                            name="stawka"
                            label="Stawka"
                            required
                            {...form.getInputProps('stawka')}
                        />

                        <TextInput
                            name="nr telefonu"
                            label="Nr telefonu"
                            required
                            {...form.getInputProps('nr_telefonu')}
                        />

                        
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