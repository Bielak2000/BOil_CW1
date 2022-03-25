import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";
import {InputData} from "./inputData";
import data from "./inputData";
import {useNavigate, useParams} from "react-router-dom";
import {EditIcon, MagnificationIcon, DeleteIcon} from "./Icons";
import {Component2} from "./Component2";
import { useForm , formList} from "@mantine/form";



export const DataForm = () => {
    
    const form = useForm({
        initialValues: {
          actions: formList([
              { action: '',
                duration: '',
                prev: '',
                next: ''}]),
        },
      });



    const [isError, setError] = useState(false);
    const [actionList,  setActionList] = useState<InputData[]>([]);

    const navigate = useNavigate();


    // const actionList : InputData[] = [];
    

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



    const fields = form.values.actions.map((_ : any , index : number) => (
        
        <tr  key={index}>
        <th>
        <TextInput
                 placeholder={"Podaj Nazwe"}
                 name={"action"}
                 label={"Action"}
                 required
                 {...form.getListInputProps('actions', index, 'action')}
             />
        </th>
        <th>
        <TextInput
                 placeholder={"Podaj czas trwania"}
                 name={"duration"}
                 label={"Duration"}
                 required
                 {...form.getListInputProps('actions', index, 'duration')}
             />
        </th>
        <th>
        <TextInput
                 placeholder={"Podaj poprzednie zadanie"}
                 name={"prev"}
                 label={"Prev"}
                 required
                 {...form.getListInputProps('actions', index, 'prev')}
             />
        </th>
        <th>
        <TextInput
                 placeholder={"Podaj następne zdarzenie"}
                 name={"next"}
                 label={"Next"}
                 required
                 {...form.getListInputProps('actions', index, 'next')}
             />
        </th>
         </tr>
      
      ));


    return (
        <Container size="xl">
            
            <Space h="md"/>
            <Center>
                <Paper style={{width: 1000,}} shadow="xs" radius="lg">
                    <form onSubmit={form.onSubmit((values) => alert(JSON.stringify(values, null, 2)))}> 
                        <table>
                            <tbody>{fields}</tbody>
                        </table>
                        <Button onClick={() => form.addListItem('actions', { 
                            action: '',
                            duration: '',
                            prev: '',
                            next: '' })}>
                             ADD
                    </Button>
                        <Button type="submit" fullWidth  style={{background: "#960920"}} >
                                    Wykonaj
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
