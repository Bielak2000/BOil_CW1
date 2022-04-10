import './App.css';
import {Route, Routes} from "react-router-dom";
import {DataForm} from "./InputDataForm"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DataForm/>}/>
            </Routes>
        </div>

    );
}

export default App;