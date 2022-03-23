import client from '../Services/api'
import {useCookies} from "react-cookie";

const loggOut = {
    
    wyloguj: () => client.get('/wyloguj'),
}

export default loggOut;