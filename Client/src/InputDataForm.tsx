import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";
import data from "./inputData";
//import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "@mantine/hooks";



export const DataForm = () => {
    //const {id} = useParams<{ id?: string }>();
    

    const form = useForm({
        initialValues: {
            nr_rejestracyjny: 'ABC1234',
            stawka: '20',
            spalanie: '7'
        }
    });

    const [isError, setError] = useState(false);
    //const navigate = useNavigate();

    /*useEffect(() => {
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
    }, [id])*/



    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        form.onSubmit((values) => {
            console.log(values)
/*
                data.calculate({
                    action: values.action,
                    duration: parseInt(values.duration),
                    prev: parseInt(values.prev),
                    next: parseInt(values.next)
                }).then(() => {
                    navigate('/')
                }).catch(() => {
                    setError(true)
                })
*/
        })(event);
    }

    return (
        <Container size="xl">
            <Space h="md"/>
            <Center>
                <Paper style={{width: 400}} shadow="xs" radius="lg">
                    <form onSubmit={handleFormSubmit}>

                        <TextInput
                            placeholder="Podaj nazwe czynności"
                            name="action"
                            label="Action"
                            required
                            {...form.getInputProps('action')}
                        />

                        <TextInput
                            placeholder="Podaj czas trwania w dniach"
                            name="duration"
                            label="Duration"
                            required
                            {...form.getInputProps('duration')}
                        />

                        <TextInput
                            placeholder="Podaj poprzednie zdarzenie"
                            name="prev"
                            label="Prev"
                            required
                            {...form.getInputProps('prev')}
                        />

                        <TextInput
                            placeholder="Podaj następne zdarzenie"
                            name="next"
                            label="Next"
                            required
                            {...form.getInputProps('next')}
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