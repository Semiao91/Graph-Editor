import type { GraphData, SyncStatus } from '../interfaces/api';
import { graphStoreApi } from '../store';
import { mockApi } from './mockApi.service';

export class SyncManager {
    private syncInterval: number | null = null;
    private retryTimeout: number | null = null;
    private readonly SYNC_INTERVAL = 30000; // 30 seconds
    private readonly RETRY_DELAY = 5000; // 5 seconds
    private readonly MAX_RETRIES = 3;
    private retryCount = 0;

    public startAutoSync(): void {
        console.log('SyncManager: Starting auto-sync');

        this.syncInterval = window.setInterval(() => {
            this.performSync();
        }, this.SYNC_INTERVAL);

        setTimeout(() => this.performSync(), 1000);
    }

    public stopAutoSync(): void {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }

        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }

        console.log('⏹️ SyncManager: Auto-sync stopped');
    }

    public async performSync(): Promise<boolean> {
        const state = graphStoreApi.getState();

        console.log('🔍 SyncManager.performSync: state check', {
            isOnline: state.isOnline,
            isDirty: state.isDirty,
            nodeCount: state.nodes.length,
            edgeCount: state.edges.length
        });

        if (!state.isOnline) {
            if (state.isDirty) {
                console.group('📴 SyncManager: OFFLINE - Changes queued for sync');
                console.log('🔄 These changes will sync when online:');
                console.log('📦 Nodes waiting:', state.nodes.length);
                console.log('� Edges waiting:', state.edges.length);
                console.log('📊 Total queued changes:', state.nodes.length + state.edges.length);
                console.groupEnd();
            } else {
                console.log('�📴 SyncManager: Skipping sync - currently offline');
            }
            return false;
        }

        if (!state.isDirty) {
            console.log('✅ SyncManager: No changes to sync');
            this.retryCount = 0;
            return true;
        }

        const graphData: GraphData = {
            nodes: state.nodes,
            edges: state.edges,
            meta: {
                version: state.version || 1,
                lastModified: Date.now(),
                checksum: this.generateChecksum(state.nodes, state.edges)
            }
        };

        console.log('🔄 SyncManager: Attempting sync...', {
            nodes: graphData.nodes.length,
            edges: graphData.edges.length,
            isDirty: state.isDirty,
            retryAttempt: this.retryCount + 1
        });

        this.logChangesToSync(graphData);

        const response = await mockApi.syncGraph(graphData);

        if (response.success) {
            this.retryCount = 0;
            console.log('✅ SyncManager: Sync successful');

            if (response.data && response.data.meta.checksum !== graphData.meta.checksum) {
                console.log('📥 SyncManager: Applying server updates');
                this.logServerUpdates(response.data);
                state.loadGraph(response.data.nodes, response.data.edges);
            }

            state.markClean();
            return true;
        } else {
            this.retryCount++;
            console.warn(`⚠️ SyncManager: Sync failed (attempt ${this.retryCount}/${this.MAX_RETRIES})`, response.error);

            if (state.isOnline && this.retryCount < this.MAX_RETRIES) {
                console.log(`🔄 SyncManager: Will retry in ${this.RETRY_DELAY / 1000} seconds`);

                if (this.retryTimeout) {
                    clearTimeout(this.retryTimeout);
                }

                this.retryTimeout = window.setTimeout(() => {
                    this.retryTimeout = null;
                    this.performSync();
                }, this.RETRY_DELAY);
            } else {
                console.log('❌ SyncManager: Stopping retries - max attempts reached or offline');
                this.retryCount = 0;
            }

            return false;
        }
    }

    private generateChecksum(nodes: any[], edges: any[]): string {
        const content = JSON.stringify(nodes) + JSON.stringify(edges);
        return btoa(content).slice(0, 8);
    }

    public getSyncStatus(): SyncStatus {
        return mockApi.getSyncStatus();
    }

    public async forcSync(): Promise<boolean> {
        console.log('🔄 SyncManager: Force sync requested');
        this.retryCount = 0;
        return this.performSync();
    }

    public resetSyncState(): void {
        this.retryCount = 0;
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }
        console.log('🔄 SyncManager: Sync state reset');
    }

    public async goOnline(): Promise<void> {
        const state = graphStoreApi.getState();

        console.log('🌐 SyncManager: Going online - checking for queued changes...');
        console.log('🔍 Current state:', {
            isDirty: state.isDirty,
            nodeCount: state.nodes.length,
            edgeCount: state.edges.length,
            version: state.version
        });

        if (state.isDirty) {
            const graphData: GraphData = {
                nodes: state.nodes,
                edges: state.edges,
                meta: {
                    version: state.version || 1,
                    lastModified: Date.now(),
                    checksum: this.generateChecksum(state.nodes, state.edges)
                }
            };

            console.group('📋 SyncManager: Found queued changes while offline');
            console.log('🔄 Changes that will be synced to server:');
            console.log('📦 Nodes:', graphData.nodes.length);
            console.log('🔗 Edges:', graphData.edges.length);
            console.log('📊 Total queued items:', graphData.nodes.length + graphData.edges.length);
            console.groupEnd();

            // Reset state and trigger immediate sync
            this.resetSyncState();

            console.log('🚀 SyncManager: Starting immediate sync of queued changes...');
            setTimeout(() => {
                this.performSync();
            }, 500);
        } else {
            console.log('✅ SyncManager: No changes queued - already in sync');
        }
    }

    private logChangesToSync(graphData: GraphData): void {
        console.group('📤 SyncManager: Changes to sync to server');
        console.log('Nodes to sync:', graphData.nodes.map(node => ({
            id: node.id,
            type: node.type,
            label: node.data?.label,
            position: node.position,
            lastModified: 'local changes'
        })));
        console.log('Edges to sync:', graphData.edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
            weight: edge.data?.weight,
            isDirected: edge.data?.isDirected
        })));
        console.log('Metadata:', {
            version: graphData.meta.version,
            checksum: graphData.meta.checksum,
            totalNodes: graphData.nodes.length,
            totalEdges: graphData.edges.length
        });
        console.groupEnd();
    }

    private logServerUpdates(serverData: GraphData): void {
        console.group('📥 SyncManager: Server updates being applied');
        console.log('Server nodes:', serverData.nodes.map(node => ({
            id: node.id,
            label: node.data?.label,
            position: node.position,
            source: 'server'
        })));
        console.log('Server edges:', serverData.edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            weight: edge.data?.weight
        })));
        console.log('Server metadata:', {
            version: serverData.meta.version,
            checksum: serverData.meta.checksum,
            lastModified: new Date(serverData.meta.lastModified).toISOString()
        });
        console.groupEnd();
    }
}