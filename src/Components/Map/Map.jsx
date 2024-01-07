import React, {useContext, useEffect, useRef, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

import Card from '../Card/card';
import { AeroportContext } from '../Context/AeoroportContextProvider';
import TrackComponentPosition from '../TrackComponnentPosition';
import { VolContext } from '../Context/VolContexProvider';
import AddVol from "../AddVol/AddVol";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";

function Map(props) {
    let { aeroports } = useContext(AeroportContext);
    let { vols } = useContext(VolContext);
    const positionsVerifiees = new Set();
    const visibleRef = useRef(null);
    let [i,setI] =useState(0);
    let [index,setIndex] =useState(0);
    let rotationAnglesArray = [];
    let Navigate=useNavigate();
    const [monTableau, setMonTableau] = useState([]);

    useEffect(()=>{
        setI(0);
    },[index]);
    function switchToLogin() {
        return Navigate("/login");
    }

    function startSimulation() {
        visibleRef.current = true;
        setI(0);
        moveImages();
        fetchData();
        setMonTableau( Array(vols.length).fill(0))
    }
    async function fetchData() {
        try {
            await axios.get('http://localhost:8080/aeroports/start');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [imagePositions, setImagePositions] = useState([]);

    const calculateRotationAngle = (startPosition, endPosition) => {
        const dx = endPosition[0] - startPosition[0];
        const dy = endPosition[1] - startPosition[1];
        return (Math.atan2(dy, dx) * 180) / Math.PI;
    };

    function s() {


        for (const vol of vols) {
            let rotationAngles = [];

            for (const point of vol.trajectoires) {
                let rotationAngle = calculateRotationAngle(
                    [point?.aeroportDepart?.localisation?.x, point?.aeroportDepart?.localisation?.y],
                    [point?.aeroportArrivet?.localisation?.x, point?.aeroportArrivet?.localisation?.y]
                );

                rotationAngles.push(rotationAngle);
            }

            rotationAnglesArray.push(rotationAngles);
        }

        console.log("wd"+rotationAnglesArray);
    }
    s();

    const animateTrajectory = (vol, index, currentTrajectoryIndex) => {
        const trajectories = vol.trajectoires;
        const trajectory = trajectories[currentTrajectoryIndex];

        // Check if trajectory and aeroportArrivet are defined
        if (trajectory && trajectory.aeroportArrivet) {

            const targetPosition = [
                trajectory.aeroportArrivet.localisation.x,
                trajectory.aeroportArrivet.localisation.y,
            ];

            const duration =
                (Math.sqrt(
                    Math.pow(
                        trajectory.aeroportDepart.localisation.x - trajectory.aeroportArrivet.localisation.x,
                        2
                    ) +
                    Math.pow(
                        trajectory.aeroportDepart.localisation.y - trajectory.aeroportArrivet.localisation.y,
                        2
                    )
                ) / vol.avion.vitess) * 60 * 60 * 5;

            const imagePosition = [
                trajectory.aeroportDepart.localisation.x,
                trajectory.aeroportDepart.localisation.y,
            ];

            const dx = (targetPosition[0] - imagePosition[0]) / duration;
            const dy = (targetPosition[1] - imagePosition[1]) / duration;

            let startTime = null;

            const animate = (timestamp) => {

                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;

                if (progress < duration) {
                    setImagePositions((prevPositions) => {
                        const newPositions = [...prevPositions];
                        newPositions[index] = [imagePosition[0] + dx * progress, imagePosition[1] + dy * progress];
                        return newPositions;
                    });

                    requestAnimationFrame(animate);
                } else {
                    setImagePositions((prevPositions) => {
                        const newPositions = [...prevPositions];
                        newPositions[index] = targetPosition;

                        return newPositions;
                    });

                    currentTrajectoryIndex++;

                    if (currentTrajectoryIndex < trajectories.length) {
                        animateTrajectory(vol, index, currentTrajectoryIndex);
                    } else {
                        if (index === vols.length - 1) {
                           // visibleRef.current = false;
                        }
                    }
                }
            };

            requestAnimationFrame(animate);
        }
    };
    const tab=[];
    for (let j = 0; j < vols.length; j++) {
        tab.push(0);
        console.log("tab"+tab)
    }

    const moveImages = () => {
        visibleRef.current = true;
        vols.forEach((vol, index) => {

            animateTrajectory(vol, index, 0);
        });
    };

    return (
<div>
    <div className="App position-relative">
        <Button variant="primary" className="position-absolute top-0 end-0 m-4" style={{zIndex:"9999999"}} onClick={()=>{
            switchToLogin();
        }}>Disconnect</Button>
        <div className="position-absolute top-50 start-0 translate-middle-y" style={{zIndex:99999}}>
            <AddVol/>
        </div>
        <button
            className="position-absolute bottom-0 start-0 btn btn-info "
            style={{ marginTop: '20px', zIndex: 99999 }}
            onClick={() => {
                startSimulation();
            }}
        >
            Start Simulation
        </button>
        <MapContainer center={[1, 2]} zoom={2} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {aeroports.map((aer, index) => (
                <Marker key={index} position={[aer.localisation.x, aer.localisation.y]}>
                    <Popup>
                        <TrackComponentPosition>
                            <Card id={'id' + index} info={aer} />
                        </TrackComponentPosition>
                    </Popup>
                </Marker>
            ))}
            {
                visibleRef.current && (
                    vols.map((vol, index) => {

                        const position = imagePositions[index] || [vol?.trajectoires[i]?.aeroportDepart?.localisation.x,vol?.trajectoires[i]?.aeroportDepart?.localisation.y];
                        console.log("position: "+ position)
                        console.log("mon tab"+monTableau)

                        if (!positionsVerifiees.has(JSON.stringify(position))&&(position[0] === vol?.trajectoires[i]?.aeroportArrivet?.localisation.x) && (position[1] === vol.trajectoires[i]?.aeroportArrivet.localisation.y)) {
                                monTableau[index]=1;
                                console.log("i=" + i);
                                console.log("index =" + index);
                                console.log("mon tab" + monTableau);

                                // Ajoutez la position vérifiée à l'ensemble
                                positionsVerifiees.add(JSON.stringify(position));
                                console.log("pq"+positionsVerifiees.toString())
                            }


                        const  rotationAngle=rotationAnglesArray[index][monTableau[index]];
                        console.log("rotation ongle "+rotationAngle)
                        return (
                            <Marker
                                key={index}
                                position={position}
                                icon={L.divIcon({
                                    className: 'custom-div-icon',
                                    html: `<div style="transform: rotate(${rotationAngle}deg);"><img  style="width: 20px;" src="airplan.png" alt=""/></div>`,
                                    iconSize: [20, 20],
                                })}
                            />
                        );
                    })
                )}
        </MapContainer>

    </div>
</div>
    );
}

let DefaultIcon = L.icon({
    iconUrl: 'img.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -20],
});

const planIcon = new L.Icon({
    iconUrl: 'airplan.png',
    iconSize: [25, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default Map;

/*
* map vols -> length

J hook = lenght
if vol.aeoroport arrivee = position
J--
if J==0 visibleRef.false

____________________________________
if vol.aeropot arrivee =position{
	set.add position
	if set.lenght==vol.lenght : visibleRef.false ;;
}*/
