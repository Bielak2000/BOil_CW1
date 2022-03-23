import React, {FormEvent, FunctionComponent, useState, useEffect} from 'react';
import {Center, Container, Notification, Paper, Space} from "@mantine/core";
import styles from "./Login.module.css";
import auth from "../../Actions/auth";
import loggOut from "../../Actions/loggOut";
import {useNavigate} from "react-router-dom";
import {ErrorIcon} from "../../Icons";
import { useAuthState } from '../../Containers/auth';

interface Props {
}

export const Wyloguj: FunctionComponent<Props> = (props: Props) => {
    // Niezbedne by strona sie nie przeladowala!
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const {setIsLoggedIn} = useAuthState();
    useEffect(() => {
        loggOut.wyloguj().then(
            () => (navigate('/'),setIsLoggedIn(false))
        ).catch(() => {
            setError(true);
        })
    }, [])
   return (<div></div>);
};