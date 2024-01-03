import {createContext, useEffect, useState} from "react";
import axios from "axios";

export  let VolContext =createContext(0)
function VolContextProvider(props) {
    const [vols, setVol] = useState([]);
    async function fetchData() {
        try {
            const result = await axios.get('http://localhost:8080/vols/listvol');
            setVol(result.data);
            console.log(vols);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return <VolContext.Provider value={{vols}}>
        {props.children}
    </VolContext.Provider>
}

export default VolContextProvider ;