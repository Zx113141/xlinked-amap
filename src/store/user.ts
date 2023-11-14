
import { defineStore } from 'pinia';
import { store } from './index';


export interface User {
    user: {
        id: string
        name: string
        phone: string
    }
}
// map id -> (polygon | polyline | marker) -> array[]
export const useUserInfo = defineStore({
    id: 'data-source',
    state: (): User => ({
        user: {
            name: 'xx',
            phone: '100xxx1111',
            id: '189u73'
        }
    }),
    getters: {
        getUserInfo() {
            return this.user
        }
    },
    actions: {

    },
});

// Need to be used outside the setup
export function useUser() {
    return useUserInfo(store);
}
