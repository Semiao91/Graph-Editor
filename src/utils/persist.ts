import { del, get, set } from 'idb-keyval';
import type { StoreApi } from 'zustand';
import type { PersistData } from '../types/persist';
import type { Store } from '../types/store';

const env = import.meta.env;

const STORAGE_KEY = env.VITE_STORAGE_KEY || 'graph-editor:v1';
const SAVE_DEBOUNCE_MS = env.VITE_SAVE_DEBOUNCE_MS ? parseInt(env.VITE_SAVE_DEBOUNCE_MS) : 800;

export function initPersistence(store: StoreApi<Store>) {
    let timeout: number | null = null;
    let lastSnapshot: string | null = null;
    let unsub: (() => void) | null = null;

    const load = async () => {
        try {
            console.log('Loading graph from IndexedDB...');
            const data = await get<PersistData>(STORAGE_KEY);
            if (data && data.nodes && data.edges) {
                console.log('Loaded graph:', {
                    nodes: data.nodes.length,
                    edges: data.edges.length,
                    savedAt: data.meta?.savedAt ? new Date(data.meta.savedAt) : 'unknown'
                });

                const state = store.getState();
                state.loadGraph(data.nodes, data.edges);
            } else {
                console.log('No saved graph found');
            }
        } catch (err) {
            console.error('Failed to load persisted graph:', err);
        }
    };

    const save = async (snapshot: PersistData) => {
        try {
            console.log('Saving graph to IndexedDB:', {
                nodes: snapshot.nodes.length,
                edges: snapshot.edges.length
            });
            await set(STORAGE_KEY, snapshot);

            console.log('💾 Saved to local storage (sync status unchanged)');
        } catch (err) {
            console.error('Failed to persist graph:', err);
        }
    };

    const subscribe = () => {
        unsub = store.subscribe((state: Store) => {
            if (!state.isDirty) return;

            const snapshot: PersistData = {
                nodes: state.nodes,
                edges: state.edges,
                meta: {
                    savedAt: Date.now(),
                    version: 1
                },
            };

            const json = JSON.stringify(snapshot);
            if (json === lastSnapshot) return;

            lastSnapshot = json;

            if (timeout) {
                window.clearTimeout(timeout);
            }

            timeout = window.setTimeout(() => {
                save(snapshot);
                timeout = null;
            }, SAVE_DEBOUNCE_MS);
        });
    };

    const handleBeforeUnload = () => {
        const state = store.getState();
        if (state.isDirty && state.nodes.length > 0) {
            const snapshot: PersistData = {
                nodes: state.nodes,
                edges: state.edges,
                meta: { savedAt: Date.now(), version: 1 },
            };

            try {
                localStorage.setItem(STORAGE_KEY + ':backup', JSON.stringify(snapshot));
            } catch (err: unknown) {
                console.warn('Failed to create backup on unload', err);
            }
        }
    };

    load().then(() => {
        subscribe();
        window.addEventListener('beforeunload', handleBeforeUnload);
    });

    return {
        dispose() {
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = null;
            }
            if (unsub) {
                unsub();
                unsub = null;
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
        },

        async saveNow() {
            const state = store.getState();
            const snapshot: PersistData = {
                nodes: state.nodes,
                edges: state.edges,
                meta: { savedAt: Date.now(), version: 1 },
            };
            await save(snapshot);
        },

        async clear() {
            try {
                console.log('Clearing persisted graph data');
                await del(STORAGE_KEY);
                localStorage.removeItem(STORAGE_KEY + ':backup');
            } catch (err: unknown) {
                console.error('Failed to clear storage:', err);
            }
        },

        key: STORAGE_KEY,
    };
}