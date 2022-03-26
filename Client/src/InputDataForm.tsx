import {Alert, Button, Center, Container, Paper, Select, Space, TextInput} from "@mantine/core";
import {FormEvent, useEffect, useState} from "react";
import {InputData, Form, OutputData} from "./inputData";
import data from "./inputData";
import {useNavigate, useParams} from "react-router-dom";
import {EditIcon, MagnificationIcon, DeleteIcon} from "./Icons";
import {Component2} from "./Component2";
import { useForm , formList} from "@mantine/form";
import client from './Services/api'
import cytoscape from 'cytoscape'
import {draw} from './graph'
import './cy.css';

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


    
    const [klikneto, setKliknieto] = useState(false);
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

    const send = async ( values: Form) => {
        const backendData : InputData[] = values.actions.map((v) => {
            return {
                ...v,
                duration: Number(v.duration),
                prev: Number(v.prev),
                next: Number(v.next)
            }
        })
        //console.log(backendData);
        const output = await client.post('/', backendData);
        //console.log(output);
        //console.log("63");
        setKliknieto(true);
        
        //console.log("65");
        draw(output.data);
        //console.log("67");
        //return output.data;
    }

    


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
                    <form onSubmit={form.onSubmit(async (values) => await send(values))}> 
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
            
            {klikneto &&
                <>
                
                    <script src='./graph.js'></script>
                    <div id='cy'></div>
                </>
            }

        </Container>
    )
}
