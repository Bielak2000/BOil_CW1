import React, {useEffect, useState} from 'react';
import {Button, Container, Space, Table} from '@mantine/core';
import kierowcyApi, {Kierowca} from "../../Actions/kierowcy";
import {format, parseISO} from 'date-fns'
import {EditIcon, MagnificationIcon, DeleteIcon} from "../../Icons";
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuthState } from '../../Containers/auth';



export const KierowcyList = () => {
    const [cookies] = useCookies(['isLogged']);
    const [kierowcy, setKierowcy] = useState<Kierowca[]>([])
    const navigate = useNavigate()
    const [isError, setError] = useState(false);
    const {isLoggedIn} = useAuthState();

    useEffect(() => {
        kierowcyApi.getAll().then(response => setKierowcy(response.data))
    }, [])

    const show = (id: number) => {
        navigate(`/kierowcy/${id}`)
    }

    const edit = (id: number) => {
        navigate(`/kierowcy/edit/${id}`)
    }

    const deletee = (id: number) => {
        kierowcyApi.remove(id).then(() => {
            navigate('/kierowcy');
        }).catch(() => {
            setError(true)
        })
    }

//<td>{format(parseISO(trasa.data!), 'MM/dd/yyyy HH:mm')}</td>
    const rows = kierowcy.map((kierowca) => (
        <tr key={kierowca.ID_kierowcy}>
            <td>{kierowca.ID_kierowcy}</td>
            <td>{kierowca.imie}</td>
            <td>{kierowca.nazwisko}</td>
            <td>{isLoggedIn &&<Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
            leftIcon={<MagnificationIcon/>} onClick={() => show(kierowca.ID_kierowcy!)}>Podgląd</Button>}
                {isLoggedIn &&<Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                leftIcon={<EditIcon/>} onClick={() => edit(kierowca.ID_kierowcy!)}>Edytuj</Button>}
                {isLoggedIn &&<Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                leftIcon={<DeleteIcon/>} onClick={() => deletee(kierowca.ID_kierowcy!)}>Usun</Button>}
            </td>
        </tr>
    ));

    return (
        <Container style={{background: "white"}}>
        <Table>
            <thead>
            <tr>
                <th>ID_kierowcy</th>
                <th>Imie</th>
                <th>Nazwisko</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
        </Container>
    );
}