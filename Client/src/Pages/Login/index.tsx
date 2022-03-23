import React, {FormEvent, FunctionComponent, useState} from 'react';
import {Center, Container, Notification, Paper, Space} from "@mantine/core";
import styles from "./Login.module.css";
import auth from "../../Actions/auth";
import {useNavigate} from "react-router-dom";
import {ErrorIcon} from "../../Icons";
import { useAuthState } from '../../Containers/auth';
import { Image } from '@mantine/core';
interface Props {
}

export const Login: FunctionComponent<Props> = (props: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuthState();
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();     // Niezbedne by strona sie nie przeladowala!
        auth.login(username, password).then(
            () => (navigate('/trasy'),setIsLoggedIn(true))
        ).catch(() => {
            setError(true);
        })
    }

    return (
        <Container size="xl">
            <Center>
                <Paper padding="md" shadow="xs" radius="lg" style={{marginTop:"10px"}}>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Email: </label>
                            <input
                                id="username"
                                type="text"
                                required
                                className={styles.Input}
                                onChange={(e) => setUsername(e.target.value)}
                                data-cy="username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Hasło: </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className={styles.Input}
                                onChange={(e) => setPassword(e.target.value)}
                                data-cy="password"
                            />
                        </div>

                        <button type="submit" className={styles.Input} style={{background: "#960920", color: "whi"}}>Zaloguj</button>
                    </form>
                   
                  
                </Paper>
            </Center>
            <Space h="md"/>
            {error &&
                <Center>
                    <Notification icon={<ErrorIcon/>} onClose={() => {
                        setError(false)
                    }} color="red">
                        Zły email lub hasło!
                    </Notification>
                </Center>
            }
            <div style={{display:"flex", gap:"10px", justifyContent: "center"} }>
                <Image
                    radius="md"
                    src="https://cdn.biznesfinder.pl/f-37906-czym-charakteryzuje-sie-dobra-firma-transportowa.jpg"
                    alt="Random unsplash image"
                    width="500px"
                    height="400px"
                />
                <Image
                    radius="md"
                    src="https://thumbs.dreamstime.com/b/plik-z-logo-wektora-ci%C4%99%C5%BCar%C3%B3wki-eps-ze-stylizowanym-wizerunkiem-idealnym-dla-firmy-transportowej-lub-logistycznej-201139184.jpg"
                    alt="Random unsplash image"
                    width="500px"
                    height="400px"
                />
                <Image
                    radius="md"
                    src="https://us.123rf.com/450wm/ivanspasic/ivanspasic2005/ivanspasic200500056/147865205-transport-autostrad%C4%85-z-konwojem-ci%C4%99%C5%BCar%C3%B3wek-mijaj%C4%85cych-ci%C4%99%C5%BCar%C3%B3wki-pod-pi%C4%99knym-niebem-o-zachodzie-s%C5%82o%C5%84.jpg?ver=6"
                    alt="Random unsplash image"
                    width="500px"
                    height="400px"
                />
            </div>
           

        </Container>
    )
};