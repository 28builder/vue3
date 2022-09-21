import { InjectionKey, ComponentCustomOptions } from "vue";

import { useStore as baseUseStore, createStore, Store } from  'vuex'

interface State {
    username: string
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore( {
    state: {
        username: '章三'
    },
    getters: {
        getName: (state) => {
            return state.username
        }
    },
    mutations: {
        SET_USERNAME(state, username: string) {
            state.username = username
        }
    },
    actions: {

    }
})
// declare module '@vue/runtime-core' {
//     interface State {
//         username: string
//     }
//     interface ComponentCustomOptions {
//         $store: Store<State>
//     }
// }

// 自定义组合
export function useStore () {
    return baseUseStore(key)
}