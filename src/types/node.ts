import type { NodeActions, NodeData } from "../interfaces/graph";
import type { NodeState } from "../interfaces/store";

export type NodeTypes = 'customNode' | 'resizableNode' | 'default';

export type ResizableNodeData = NodeData;

export type NodeSlice = NodeState & NodeActions;