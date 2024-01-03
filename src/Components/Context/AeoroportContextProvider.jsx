import {createContext, useEffect, useState} from "react";
import axios from "axios";

export  let AeroportContext =createContext(0)
    function AeoroportContextProvider(props) {
        const [aeroports, setAeroport] = useState([]);
        async function fetchData() {
            try {
                const result = await axios.get('http://localhost:8080/aeroports/listaeroport');
                setAeroport(result.data);
                console.log(aeroports);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        useEffect(() => {
            fetchData();
        }, []);
    return <AeroportContext.Provider value={{aeroports}}>
        {props.children}
    </AeroportContext.Provider>
}

export default AeoroportContextProvider ;
