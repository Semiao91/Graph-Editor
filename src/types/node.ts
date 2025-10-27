export type Node = {
    id: string;
    type: NodeTypes;
    position: { x: number; y: number };
    data: {
        label: string;
        color: string;
        weight: number;
    }
}

export type NodeTypes = {
    ResizableNode: ResizableNodeData,
    ResizableNodeSelected: string,
    CustomResizerNode: string,
    Default: string,
}

export type HandleConfig = {
    id: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    type: 'source' | 'target';
};

export type ResizableNodeData = {
    label: string;
    color?: string;
    weight?: number;
    handles?: HandleConfig[];
};