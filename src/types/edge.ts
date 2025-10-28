import type { EdgeActions } from "../interfaces/graph";
import type { EdgeState } from "../interfaces/store";

// Edge-specific types
export type EdgeTypes = 'default' | 'straight' | 'step' | 'smoothstep' | 'floating';

// Slice type
export type EdgeSlice = EdgeState & EdgeActions;
