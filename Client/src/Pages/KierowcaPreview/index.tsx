import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import kierowcyApi, {Kierowca} from "../../Actions/kierowcy"
import {Card, Container} from "@mantine/core";

export const KierowcaPreview = () => {
    const {id} = useParams<{ id: string }>();
    const [kierowca, setKierowca] = useState<Kierowca | null>(null)

    useEffect(() => {
        kierowcyApi.getById(parseInt(id!)).then(response => setKierowca(response.data))
    }, [id])

    
    return (
        <Container>
            <Card shadow="sm" padding="lg">
                <div>
                    <span>ID kierowcy: {kierowca?.ID_kierowcy}</span>
                </div>

                <div>
                    <span>Imie: {kierowca?.imie}</span>
                </div>

                <div>
                    <span>Nazwisko: {kierowca?.nazwisko}</span>
                </div>

                <div>
                    <span>PESEL: {kierowca?.pesel}</span>
                </div>

                <div>
                    <span>Stawka: {kierowca?.stawka}</span>
                </div>

                <div>
                    <span>Numer telefonu: {kierowca?.nr_telefonu}</span>
                </div>

            </Card>
        </Container>
    )
}