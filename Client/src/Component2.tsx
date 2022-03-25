import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";
import {InputData} from "./inputData";
import data from "./inputData";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "@mantine/hooks";
import {EditIcon, MagnificationIcon, DeleteIcon} from "./Icons";
import React, {FunctionComponent} from 'react';

interface Props {}


export const Component2 = () => {

    const form = useForm({
        initialValues: {
            action: '',
            duration: '',
            prev: '',
            next: ''
        }
    });

    const [isError, setError] = useState(false);
    const navigate = useNavigate();
    const actionList : InputData[] = [];
    

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

            actionList.push({
                action: values.action,
                duration: parseInt(values.duration),
                prev: parseInt(values.prev),
                next: parseInt(values.next)
            });
                /*data.calculate({
                    action: values.action,
                    duration: parseInt(values.duration),
                    prev: parseInt(values.prev),
                    next: parseInt(values.next)
                }).then(() => {
                    navigate('/')
                }).catch(() => {
                    setError(true)
                })*/
                
        })(event);
    }

    const execute = () => {
        data.calculate(actionList);
    }

    return (
        <form onSubmit={handleFormSubmit}>
                        <table>
                            
                            <tr>
                                <th>
                                    <TextInput
                                        placeholder="Podaj Nazwe"
                                        name="action"
                                        label=""
                                        required
                                        {...form.getInputProps('action')}
                                    />
                                </th>
                                <th>
                                    <TextInput
                                        placeholder="Podaj czas trwania w dniach"
                                        name="duration"
                                        label=""
                                        required
                                        {...form.getInputProps('duration')}
                                    />
                                </th>
                                <th>
                                    <TextInput
                                        placeholder="Podaj poprzednie zdarzenie"
                                        name="prev"
                                        label=""
                                        required
                                        {...form.getInputProps('prev')}
                                    />
                                </th>
                                <th>
                                    <TextInput
                                        placeholder="Podaj następne zdarzenie"
                                        name="next"
                                        label=""
                                        required
                                        {...form.getInputProps('next')}
                                     />
                                </th>
                                <th>
                                    <Button type="submit" fullWidth  style={{background: "#960920"}} >
                                    Dodaj
                                    </Button>
                                </th>
                            </tr>
                        </table>

                    </form>
    )
}
