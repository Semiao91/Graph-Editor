import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import type { GraphHandlers } from "../../interfaces/graph";
import { useGraphStore } from "../../store";
import ResizableNode from "../atoms/ResizableNode";

interface GraphCanvasInnerProps {
    handlers?: GraphHandlers;
}

export const GraphCanvasInner = ({ handlers }: GraphCanvasInnerProps) => {
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

    const { screenToFlowPosition } = useReactFlow();

    const nodeTypes = useMemo(() => ({
        ResizableNode: ResizableNode,
    }), []);

    const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
        setSelectedNode(node.id);
        console.log('Node selected:', node.id);
    }, [setSelectedNode]);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, [setSelectedNode, setSelectedEdge]);

    const onConnectEnd = useCallback((event: any, connectionState: any) => {
        if (handlers?.onConnectEnd) {
            handlers.onConnectEnd(event, connectionState, screenToFlowPosition);
        }
    }, [handlers, screenToFlowPosition]);

    const onEdgeClick = useCallback((_event: React.MouseEvent, edge: any) => {
        setSelectedEdge(edge.id);
        console.log('Edge selected:', edge.id);
    }, [setSelectedEdge]);

    const defaultEdgeOptions = useMemo(() => ({
        type: 'default',
        style: { stroke: '#b1b1b7' }
    }), []);

    const snapGrid = useMemo(() => ([20, 20] as [number, number]), []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onConnectEnd={onConnectEnd}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeClick={onEdgeClick}
            onSelectionChange={onSelectionChange}
            defaultEdgeOptions={defaultEdgeOptions}
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