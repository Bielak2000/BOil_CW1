import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import trasyApi, {Trasa} from "../../Actions/trasy";
import {Card, Container} from "@mantine/core";
import {format, parseISO} from 'date-fns';

export const TrasaPreview = () => {
    const {id} = useParams<{ id: string }>();
    const [trasa, setTrasa] = useState<Trasa | null>(null);


    useEffect(() => {
        trasyApi.getById(parseInt(id!)).then(response => setTrasa(response.data))
    }, [id])

    //'MM/dd/yyyy HH:mm'
    return (
        <Container>
            <Card shadow="sm" padding="lg">
                <div>
                    <span>ID_kursu: {trasa?.ID_kursu}</span>
                </div>

                <div>
                    <span>ID_pojazdu: {trasa?.ID_pojazdu}</span>
                </div>

                <div>
                    <span>ID_kierowcy: {trasa?.ID_kierowcy}</span>
                </div>

                <div>
                    <span>Data: { trasa ? format(parseISO(trasa.data.toString()!), 'MM/dd/yyyy') : null}</span>
                </div>

                <div>
                    <span>Kilometry: {trasa?.km}</span>
                </div>

                <div>
                    <span>Cena paliwa: {trasa?.cena_paliwa}</span>
                </div>

            </Card>
        </Container>
    )
}