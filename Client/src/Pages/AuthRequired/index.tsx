import React, {FunctionComponent, ReactElement} from 'react';
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";

interface Props {
    children: ReactElement;
}

export const AuthRequired: FunctionComponent<Props> = ({ children }) => {
    const [cookies] = useCookies(['isLogged']);

    return cookies.isLogged ? children : <Navigate to="/" />;
};