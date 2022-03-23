import React, {useEffect, useState} from 'react';
import {Button, Container, Space, Table} from '@mantine/core';
import pojazdyApi, {Pojazd} from "../../Actions/pojazdy";
import {format, parseISO} from 'date-fns'
import {EditIcon, MagnificationIcon, DeleteIcon} from "../../Icons";
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuthState } from '../../Containers/auth';


export const PojazdyList = () => {
    const [cookies] = useCookies(['isLogged']);
    const [pojazdy, setTrasy] = useState<Pojazd[]>([])
    const navigate = useNavigate()
    const [isError, setError] = useState(false);
    const {isLoggedIn} = useAuthState();
    useEffect(() => {
        pojazdyApi.getAll().then(response => setTrasy(response.data))
    }, [])

    const show = (id: number) => {
        navigate(`/pojazdy/${id}`)
    }

    const edit = (id: number) => {
        navigate(`/pojazdy/edit/${id}`)
    }

    const deletee = (id: number) => {
        console.log("sdasdasdasd")
        //navigate(`/pojazdy/delete/${id}`)
        pojazdyApi.remove(id).then(() => {
            navigate('/pojazdy');
        }).catch(() => {
            setError(true)
        })
    }

//<td>{format(parseISO(trasa.data!), 'MM/dd/yyyy HH:mm')}</td>
    const rows = pojazdy.map((pojazd) => (
        <tr key={pojazd.ID_pojazdu}>
            <td>{pojazd.ID_pojazdu}</td>
            <td>{pojazd.nr_rejestracyjny}</td>
            <td>{isLoggedIn && <Button variant="outline" style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
             leftIcon={<MagnificationIcon/>} onClick={() => show(pojazd.ID_pojazdu!)}>Podgląd</Button>}
                {isLoggedIn && <Button variant="outline" style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                 leftIcon={<EditIcon/>} onClick={() => edit(pojazd.ID_pojazdu!)}>Edytuj</Button>}
            
                {isLoggedIn && <Button variant="outline" style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                  leftIcon={<DeleteIcon/>} onClick={() => deletee(pojazd.ID_pojazdu!)}>Usun</Button>}
            </td>
        </tr>
    ));

    return (
        <Container style={{background: "white"}}>
        <Table>
            <thead>
            <tr>
                <th>ID pojazdu</th>
                <th>Numer rejestracyjny</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
        </Container>
    );
}