import React, { useRef, useEffect } from 'react';

function TrackElementPosition({ children }) {
    const elementRef = useRef(null);

    useEffect(() => {
        const trackPosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                console.log('Element position:', { top: rect.top, left: rect.left });
            }
        };

        // Initial position
        trackPosition();

        // Set up an observer to track position changes
        const observer = new ResizeObserver(trackPosition);
        observer.observe(elementRef.current);

        // Clean up the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return React.cloneElement(children, { ref: elementRef });
}


export default TrackElementPosition;

