import React, {useEffect, useRef, useState} from 'react';



const Card = React.forwardRef(({ id, info }, ref) => {

    const [display, setDisplay] = useState(false);
    const cardRef = useRef(null);

    const affiche = () => {
        setDisplay(!display);
    };

    useEffect(() => {
        const getComponentPosition = () => {
            const cardElement = cardRef.current;
            if (cardElement) {
                const rect = cardElement.getBoundingClientRect();
                console.log(`Position (x, y):`, rect.x, rect.y);
            }
        };

        getComponentPosition();
    }, []);

    return (
        <div ref={ref}>
        <div className="bg-primary rounded" style={{ width: "fit-content", height: "fit-content" }} ref={cardRef}>
            <button className="btn btn-outline-info w-100 px-5 border-0" onClick={affiche}>
                {info ? info.nom : "N/A"}
            </button>
            <div className={`p-3 ${display ? "d-none" : ""}`}>
                <p>
                    name : <span>{info ? info.nom : "N/A"}</span>
                </p>
                <p>
                    nombre de piste : <span>{info ? info.nombrePiste : "N/A"}</span>
                </p>
                <p>
                    attente sol : <span>{info ? info.attenteSol : "N/A"}</span>
                </p>
                <p>
                    acces piste : <span>{info ? info.accesPiste : "N/A"}</span>
                </p>
            </div>
        </div>
        </div>
    );
});

export default Card;