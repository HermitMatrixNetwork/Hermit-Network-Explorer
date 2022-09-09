import Vue from "vue";
import Vuex from "vuex";
import { Language } from '@/utils/Language/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        Language: {},
        tokenPrice: 10,
    },
    mutations: {
        CHANGE_LANGUAGE(state) {
            const langVal = localStorage.getItem('language')
            if (langVal) {
                state.Language = Language[langVal]
            } else {
                state.Language = Language[0]
            }
        }
    },
    actions: {

    }
})

export default store