import type { ApiResponse, GraphData, SyncStatus } from "../interfaces/api";

class MockApiService {
    private syncStatus: SyncStatus = { status: 'offline' };
    private serverData: GraphData | undefined = undefined;
    private networkDelay = 1000;
    private failureRate = 0.1;
    private isOnline = false;

    constructor() {
        this.syncStatus = { status: 'offline' };
        console.log('🔌 MockAPI: Started in offline mode (demo mode)');

        window.addEventListener('online', () => {
            console.log('🌐 Browser: Network is available (use simulator to go online)');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.syncStatus = { status: 'offline' };
        });
    }

    private simulateNetworkDelay(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, this.networkDelay + Math.random() * 1000);
        });
    }

    private simulateNetworkFailure(): boolean {
        return Math.random() < this.failureRate;
    }

    private generateChecksum(data: GraphData): string {
        const content = JSON.stringify(data.nodes) + JSON.stringify(data.edges);
        return btoa(content).slice(0, 8);
    }

    public async syncGraph(localData: GraphData): Promise<ApiResponse<GraphData>> {
        console.log('🔄 API: Starting sync...', {
            nodes: localData.nodes.length,
            edges: localData.edges.length,
            checksum: localData.meta.checksum
        });

        this.syncStatus = { status: 'syncing' };

        if (!this.isOnline) {
            this.syncStatus = {
                status: 'offline',
                errorMessage: 'No internet connection',
                pendingChanges: localData.nodes.length + localData.edges.length
            };
            return {
                success: false,
                error: 'No internet connection',
                timestamp: Date.now()
            };
        }

        try {
            await this.simulateNetworkDelay();

            if (this.simulateNetworkFailure()) {
                throw new Error('Network timeout or server error');
            }

            // Simulate server-side conflict resolution
            if (this.serverData) {
                const serverVersion = this.serverData.meta.version;
                const localVersion = localData.meta.version;

                if (serverVersion > localVersion) {
                    console.log('⚠️ API: Server has newer version, returning server data');
                    this.syncStatus = {
                        status: 'synced',
                        lastSync: new Date(),
                        pendingChanges: 0
                    };

                    return {
                        success: true,
                        data: this.serverData,
                        timestamp: Date.now()
                    };
                }
            }

            // Update server data
            const updatedData: GraphData = {
                ...localData,
                meta: {
                    ...localData.meta,
                    version: (this.serverData?.meta.version || 0) + 1,
                    lastModified: Date.now(),
                    checksum: this.generateChecksum(localData)
                }
            };

            this.serverData = updatedData;

            this.syncStatus = {
                status: 'synced',
                lastSync: new Date(),
                pendingChanges: 0
            };

            console.log('✅ API: Sync completed successfully');
            return {
                success: true,
                data: updatedData,
                timestamp: Date.now()
            };

        } catch (error) {
            this.syncStatus = {
                status: 'error',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
                pendingChanges: localData.nodes.length + localData.edges.length
            };

            console.error('❌ API: Sync failed', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Sync failed',
                timestamp: Date.now()
            };
        }
    }

    public getSyncStatus(): SyncStatus {
        return this.syncStatus;
    }

    public setNetworkDelay(delay: number): void {
        this.networkDelay = delay;
    }

    public goOffline(): void {
        this.isOnline = false;
        this.syncStatus = {
            status: 'offline',
            errorMessage: 'Simulated offline mode'
        };
    }

    public goOnline(): void {
        this.isOnline = true;
        this.syncStatus = {
            status: 'online',
            errorMessage: undefined
        };
    }
}

export const mockApi = new MockApiService();