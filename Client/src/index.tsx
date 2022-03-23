import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { AuthStateProvider } from './Containers/auth';

ReactDOM.render(
    <React.StrictMode>
            <BrowserRouter>
            <AuthStateProvider>
                <App/>
            </AuthStateProvider>
             </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
