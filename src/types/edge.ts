export type Edge = {
    id: string;
    source: string;
    target: string;
    type?: 'default' | 'straight' | 'step' | 'smoothstep';
    data?: {
        weight?: number;
        isDirected?: boolean;
    };
}
