import { Background, Controls, MarkerType, ReactFlow, useReactFlow } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import { useGraphHandlers } from "../../hooks/useGraphHandlers";
import { useGraphStore } from "../../store";
import CustomConnectionLine from "../atoms/CustomConnectionLine";
import { CustomNode } from "../atoms/CustomNode";
import FloatingEdge from "../atoms/FloatingEdge";

export const GraphCanvasInner = () => {
    const {
        nodes,
        edges,
        isSnap,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onSelectionChange,
        setSelectedNode,
        setSelectedEdge
    } = useGraphStore();
    const { onConnectEnd } = useGraphHandlers();
    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = useMemo(() => ({
        custom: CustomNode,
    }), []);

    const edgeTypes = useMemo(() => ({
        floating: FloatingEdge,
        default: FloatingEdge,
    }), []);

    const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
        setSelectedNode(node.id);
        console.log('Node selected:', node.id);
    }, [setSelectedNode]);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, [setSelectedNode, setSelectedEdge]);

    const handleConnectEnd = useCallback((event: any, connectionState: any) => {
        onConnectEnd(event, connectionState, screenToFlowPosition);
    }, [onConnectEnd, screenToFlowPosition]);

    const onEdgeClick = useCallback((_event: React.MouseEvent, edge: any) => {
        setSelectedEdge(edge.id);
        console.log('Edge selected:', edge.id);
    }, [setSelectedEdge]);

    const defaultEdgeOptions = useMemo(() => ({
        type: 'floating',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#b1b1b7',
        },
        style: { stroke: '#b1b1b7' }
    }), []);

    const snapGrid = useMemo(() => ([20, 20] as [number, number]), []);

    const connectionLineStyle = useMemo(() => ({
        stroke: '#b1b1b7',
    }), []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            onConnectEnd={handleConnectEnd}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeClick={onEdgeClick}
            onSelectionChange={onSelectionChange}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={CustomConnectionLine}
            connectionLineStyle={connectionLineStyle}
            snapGrid={snapGrid}
            snapToGrid={isSnap}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            selectNodesOnDrag={false}
            fitView
            className="react-flow-canvas"
            proOptions={{ hideAttribution: true }}
        >
            <Background
                color="#13161b"
                gap={20}
                size={1}
            />
            <Controls position="bottom-left" />
        </ReactFlow>
    );
}