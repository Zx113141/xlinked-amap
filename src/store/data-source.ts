
import { defineStore } from 'pinia';
import { store } from './index';

interface DataSource {

    source: Map<string, Source[]>

}

export type SourceId = 'polygon' | 'polyline' | 'marker'

export interface Source {
    id: SourceId
    dataIds: number[]
}
// map id -> (polygon | polyline | marker) -> array[]
export const useDataSource = defineStore({
    id: 'data-source',
    state: (): DataSource => ({
        source: new Map(),
    }),
    getters: {

    },
    actions: {
        updateDataSourceByMapId(mapId, source: Source) {
            if (this.source.has(mapId)) {
                const { id } = source
                const arr = this.source.get(mapId)?.filter(item => item.id !== id)
                arr?.push(source)
                this.source.set(mapId, arr)
            } else {
                this.source.set(mapId, [source])
            }
            console.log(this.source);
        }
    },
});

// Need to be used outside the setup
export function useMapDataSource() {
    return useDataSource(store);
}
