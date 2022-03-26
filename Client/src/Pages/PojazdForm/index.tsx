import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import pojazdApi, {Pojazd} from "../../Actions/pojazdy";
import {useForm} from "@mantine/hooks";



export const PojazdForm = () => {
    const {id} = useParams<{ id?: string }>();
    

    const form = useForm({
        initialValues: {
            nr_rejestracyjny: 'ABC1234',
            stawka: '20',
            spalanie: '7'
        }
    });

    const [isError, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id)
            pojazdApi
                .getById(parseInt(id!))
                .then((response) => {
                    const webPojazd = response.data;
                    form.setValues({
                        nr_rejestracyjny: webPojazd.nr_rejestracyjny.toString(),
                        stawka: webPojazd.stawka.toString(),
                        spalanie: webPojazd.spalanie.toString()
                    });
                })
    }, [id])



    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        form.onSubmit((values) => {
            console.log(values)

            if(id) {
                pojazdApi.update(parseInt(id), {
                    nr_rejestracyjny: values.nr_rejestracyjny,
                    stawka: parseInt(values.stawka),
                    spalanie: parseInt(values.spalanie)
                }).then(() => {
                    navigate('/pojazdy')
                }).catch(() => {
                    setError(true)
                })
            } else {
                pojazdApi.create({
                    nr_rejestracyjny: values.nr_rejestracyjny,
                    stawka: parseInt(values.stawka),
                    spalanie: parseInt(values.spalanie)
                }).then(() => {
                    navigate('/pojazdy')
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
                            placeholder="Podaj numer rejestracyjny"
                            name="nr rejestracyjny"
                            label="Nr rejestracyjny"
                            required
                            {...form.getInputProps('nr_rejestracyjny')}
                        />

                        <TextInput
                            placeholder="Podaj stawkę"
                            name="stawka"
                            label="Stawka"
                            required
                            {...form.getInputProps('stawka')}
                        />

                        <TextInput
                            placeholder="Podaj spalanie"
                            name="spalanie"
                            label="Spalanie"
                            required
                            {...form.getInputProps('spalanie')}
                        />

                        
                        <Space h="md"/>

                        <Button type="submit" fullWidth  style={{background: "#960920"}} >
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