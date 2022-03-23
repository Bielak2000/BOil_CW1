import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import pojazdyApi, {Pojazd} from "../../Actions/pojazdy"
import {Card, Container} from "@mantine/core";

export const PojazdPreview = () => {
    const {id} = useParams<{ id: string }>();
    const [pojazd, setPojazd] = useState<Pojazd | null>(null)

    useEffect(() => {
        pojazdyApi.getById(parseInt(id!)).then(response => setPojazd(response.data))
    }, [id])

    
    return (
        <Container>
            <Card shadow="sm" padding="lg">
                <div>
                    <span>ID pojazdu: {pojazd?.ID_pojazdu}</span>
                </div>

                <div>
                    <span>Numere rejestracyjny: {pojazd?.nr_rejestracyjny}</span>
                </div>

                <div>
                    <span>Stawka: {pojazd?.stawka}</span>
                </div>

                <div>
                    <span>Spalanie: {pojazd?.spalanie}</span>
                </div>
            </Card>
        </Container>
    )
}