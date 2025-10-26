import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useEdge } from "../../hooks/useEdge";
import { useNode } from "../../hooks/useNode";

export const GraphCanvasInner = () => {
    const { nodes, selectNode } = useNode();
    const { edges, onConnect } = useEdge();

    const onNodeClick = (_event: React.MouseEvent, node: any) => {
        selectNode(node.id);
    };

    const onPaneClick = () => {
        // Deselect when clicking on empty space
        selectNode(null);
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            className="react-flow-canvas"
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