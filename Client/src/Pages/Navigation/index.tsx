import {Link, useLocation} from "react-router-dom";
import React, { useEffect } from "react";
import styles from "./Navigation.module.scss"
import {useCookies} from "react-cookie";
import { useAuthState } from "../../Containers/auth";

const getActive = (path: string, target: string) => path === target ? styles.active : undefined

export const Navigation = () => {
    const [cookies] = useCookies();     // cookies to obiekt. Klucze to nazwy cookiesów
    const {isLoggedIn, setIsLoggedIn} = useAuthState();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        setIsLoggedIn(cookies.isLogged)
    }, [cookies.isLogged])


    return (
        <nav className={styles.navigation}>

                <ul>
                    {!isLoggedIn && <li className={getActive(path, '/')}>
                        <Link to="/">Panel logowania</Link>
                    </li>}
                    <li className={getActive(path, '/trasy')}>
                        <Link to="/trasy">Trasy</Link>
                    </li>
                    <li className={getActive(path, '/pojazdy')}>
                        <Link to="/pojazdy">Pojazdy</Link>
                    </li>
                    <li className={getActive(path, '/kierowcy')}>
                        <Link to="/kierowcy">Kierowcy</Link>
                    </li>

                    <li className={getActive(path, '/trasy/add')}>
                        <Link to="/trasy/add">Dodaj trasę</Link>
                    </li>

                    <li className={getActive(path, '/pojazdy/add')}>
                        <Link to="/pojazdy/add">Dodaj pojazd</Link>
                    </li>

                    <li className={getActive(path, '/kierowcy/add')}>
                        <Link to="/kierowcy/add">Dodaj kierowcę</Link>
                    </li>

                    {isLoggedIn &&
                    <li className={getActive(path, '/wyloguj')}>
                        <Link to="/wyloguj">Wyloguj</Link>
                    </li>
                    }              

                </ul>

        </nav>
    )
}