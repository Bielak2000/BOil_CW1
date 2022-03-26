import React, {useEffect, useState} from 'react';
import {Button, Container, Space, Table} from '@mantine/core';
import trasyApi, {Trasa} from "../../Actions/trasy";
import {format, parseISO} from 'date-fns'
import {EditIcon, MagnificationIcon, DeleteIcon} from "../../Icons";
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuthState } from '../../Containers/auth';

export const TrasyList = () => {
    const [cookies] = useCookies(['isLogged']);
    const [trasy, setTrasy] = useState<Trasa[]>([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [isError, setError] = useState(false);
    const {isLoggedIn} = useAuthState();

    useEffect(() => {
        trasyApi.getAll().then(response => setTrasy(response.data))
    }, [refresh])

    const show = (id: number) => {
        navigate(`/trasy/${id}`)
    }

    const edit = (id: number) => {
        navigate(`/trasy/edit/${id}`)
    }

    const deletee = (id: number) => {
        //navigate(`/pojazdy/delete/${id}`)
        trasyApi.remove(id).then(() => {
            navigate('/trasy');
            setRefresh(prev=>!prev);
        }).catch(() => {
            setError(true)
        })
    }

    const rows = trasy.map((trasa) => (
        <tr key={trasa.ID_kursu}>
            <td>{trasa.ID_kursu}</td>
            <td>{trasa.km}</td>
            <td>{format(parseISO(trasa.data.toString()!), 'MM/dd/yyyy')}</td>
            <td>{isLoggedIn && <Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
            leftIcon={<MagnificationIcon/>} onClick={() => show(trasa.ID_kursu!)}>Podgląd</Button>}
                {isLoggedIn &&<Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                leftIcon={<EditIcon/>} onClick={() => edit(trasa.ID_kursu!)}>Edytuj</Button>}
                {isLoggedIn &&<Button variant="outline"  style={{color: "white", border: "none", background: "#960920", marginRight: "4px"}}
                leftIcon={<DeleteIcon/>} onClick={() => deletee(trasa.ID_kursu!)}>Usun</Button>}
            </td>
        </tr>
    ));

    return (
        <Container style={{background: "white"}}>
        <Table>
            <thead>
            <tr>
                <th>ID_kursu</th>
                <th>km</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
        </Container>
    );
}