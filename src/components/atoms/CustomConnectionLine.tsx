import { getStraightPath } from '@xyflow/react';
import React from 'react';

interface CustomConnectionLineProps {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    connectionLineStyle?: React.CSSProperties;
}

function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: CustomConnectionLineProps) {
    const [edgePath] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    });

    return (
        <g>
            <path style={connectionLineStyle} fill="none" d={edgePath} />
        </g>
    );
}

export default CustomConnectionLine;
