import { BaseEdge, EdgeLabelRenderer, getStraightPath, useInternalNode } from '@xyflow/react';
import { getEdgeParams } from '../../utils/getEdgeParams';

interface FloatingEdgeData {
    label?: string;
    weight?: number;
    color?: string;
    isDirected?: boolean;
}

interface FloatingEdgeProps {
    id: string;
    source: string;
    target: string;
    style?: React.CSSProperties;
    data?: FloatingEdgeData;
    selected?: boolean;
}

function FloatingEdge({
    id,
    source,
    target,
    style,
    data,
    selected
}: FloatingEdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    const edgeColor = data?.color || style?.stroke || '#b1b1b7';
    const edgeWeight = data?.weight || 1;
    const strokeWidth = Math.max(1, edgeWeight / 5);
    const isDirected = data?.isDirected ?? true;
    const customMarkerEnd = isDirected ? `url(#arrow-${edgeColor.replace('#', '')})` : undefined;

    return (
        <>
            <defs>
                <marker
                    id={`arrow-${edgeColor.replace('#', '')}`}
                    markerWidth="12"
                    markerHeight="12"
                    refX="10"
                    refY="6"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path
                        d="M 0 0 L 12 6 L 0 12 z"
                        fill={edgeColor}
                    />
                </marker>
            </defs>
            <BaseEdge
                id={id}
                className="react-flow__edge-path"
                path={edgePath}
                markerEnd={customMarkerEnd}
                style={{
                    stroke: edgeColor,
                    strokeWidth: strokeWidth,
                    strokeOpacity: selected ? 1 : 0.8,
                }}
            />
            {data?.label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            fontSize: 12,
                            fontWeight: 700,
                            background: 'white',
                            padding: '2px 6px',
                            borderRadius: 4,
                            border: `1px solid ${edgeColor}`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                    >
                        {data.label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}

export default FloatingEdge;

