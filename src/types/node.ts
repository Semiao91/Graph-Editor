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
    ResizableNode: string,
    ResizableNodeSelected: string,
    CustomResizerNode: string,
    Default: string,
}