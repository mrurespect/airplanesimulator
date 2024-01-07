import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AeroportContext} from "../Context/AeoroportContextProvider";
import axios from "axios";

function AddVol() {
    const [plans, setPlans] = useState([]);
    const {aeroports} =useContext(AeroportContext);
    const listAeroport = aeroports.map(air => air.nom);
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [volType, setVolType] = useState('direct');
    const [airplan,setAirplan] =useState('');
    const [types,setTypes] =useState(['direct','non direct']);
    let [visible,setVisible]=useState(true);
    useNavigate();
    async function fetchData() {
        try {
            const result = await axios.get('http://localhost:8080/avions/listavions');
            setPlans(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    const handleDepartureChange = (event) => {
        setDepartureAirport(event.target.value);
    };
    const handleSelectedType = (event) => {
        setVolType(event.target.value);
    };

    const handleArrivalChange = (event) => {
        setArrivalAirport(event.target.value);
    };
    const handleSelectedPlan=(event)=>{
        setAirplan(event.target.value)
    }

    function switchToSimulator(){
        const selectedDepartureAirport = aeroports.find(air => air.nom === departureAirport);
        const selectedArrivalAirport = aeroports.find(air => air.nom === arrivalAirport);
        const selectedPlan = plans.find(p => p.type === airplan);

        const requestData = {
            aeroportDepart: selectedDepartureAirport,
            aeroportArrivet: selectedArrivalAirport,
            avion: selectedPlan,
            type:volType
        };
        const apiEndpoint = 'http://localhost:8080/vols/vol';

        console.log(selectedDepartureAirport)
        console.log(selectedArrivalAirport)
        console.log(selectedPlan)

        axios.post(apiEndpoint, requestData)
            .then(response => {
                console.log('Request successful:', response.data);
            })
            .catch(error => {
                console.error('Error making request:', error);
            });
    }
    function switchv(){
        if (visible===true){
            setVisible(false);
        }else setVisible(true)
    }

    return  (
        <div className="d-flex align-items-center">
            <button className={"btn btn-info "} onClick={switchv}>AddVol</button>
            <div className={"container mt-5 " + (visible ? "d-none" : "d-block")}>
                <div className="row">
                    <div className="col-md-3">
                        <h4>Choisir l'aéroport de départ</h4>
                        <select
                            className="form-select"
                            id="departureAirport"
                            name="departureAirport"
                            value={departureAirport}
                            onChange={handleDepartureChange}
                        >
                            {listAeroport.length > 0 ? (
                                <>
                                    <option value={listAeroport[0]}>{listAeroport[0]}</option>
                                    {listAeroport.slice(1).map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </>
                            ) : null}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <h4>Choisir l'aéroport d'arrivée</h4>
                        <select
                            className="form-select"
                            id="arrivalAirport"
                            name="arrivalAirport"
                            value={arrivalAirport}
                            onChange={handleArrivalChange}
                        >
                            {listAeroport.length > 0 ? (
                                <>
                                    <option value={listAeroport[0]}>{listAeroport[0]}</option>
                                    {listAeroport.slice(1).map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </>
                            ) : null}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <h4>Choisir l'avion</h4>
                        <select
                            className="form-select"
                            id="listPlans"
                            name="listPlans"
                            value={airplan}
                            onChange={handleSelectedPlan}
                        >
                            {plans.length > 0 ? (
                                <>
                                    <option value={plans[0].type}>{plans[0].type}</option>
                                    {plans.slice(1).map((item, index) => (
                                        <option key={index} value={item.type}>
                                            {item.type}
                                        </option>
                                    ))}
                                </>
                            ) : null}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <h4>Choisir le type de vol</h4>
                        <select
                            className="form-select"
                            id="listType"
                            name="listType"
                            value={volType}
                            onChange={handleSelectedType}
                        >
                            {types.length > 0 ? (
                                <>
                                    <option value={types[0]}>{types[0]}</option>
                                    {types.slice(1).map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </>
                            ) : null}
                        </select>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <h4>Selected Options</h4>
                        <p>Selected departure airport: {departureAirport}</p>
                        <p>Selected arrival airport: {arrivalAirport}</p>
                        <p>Selected airplane: {airplan}</p>
                        <p>Selected Type: {volType}</p>
                        <button className="btn btn-primary"   onClick={() => {
                            if (departureAirport && arrivalAirport && airplan ) {
                                switchToSimulator();
                                switchv();
                            } else {
                                alert("Please select all options before validating.");
                            }
                        }}>
                            validate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVol;

