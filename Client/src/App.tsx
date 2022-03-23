import './App.css';
import {Route, Routes} from "react-router-dom";
import {Navigation} from "./Pages/Navigation";
import {DataForm} from "./InputDataForm"

function App() {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path="/" element={<DataForm/>}/>
            </Routes>
        </div>

    );
}

export default App;