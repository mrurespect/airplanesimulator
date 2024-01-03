import React, { useEffect, useRef } from 'react';

function LineDrawingCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const component1Rect = document.getElementById('component1').getBoundingClientRect();
        const component2Rect = document.getElementById('component2').getBoundingClientRect();

        // Set line properties (color, width, etc.)
        context.strokeStyle = 'black';
        context.lineWidth = 2;

        // Draw a line between the centers of the two components
        context.beginPath();
        context.moveTo(component1Rect.x + component1Rect.width / 2, component1Rect.y + component1Rect.height / 2);
        context.lineTo(component2Rect.x + component2Rect.width / 2, component2Rect.y + component2Rect.height / 2);
        context.stroke();
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <Component id="component1" text="Component 1" />
            <Component id="component2" text="Component 2" />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    );
}

function Component({ id, text }) {
    return (
        <div id={id} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {text}
        </div>
    );
}

export default LineDrawingCanvas;
