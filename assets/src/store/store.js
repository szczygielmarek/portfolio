import Vue from 'vue';
import Vuex from 'vuex';

import Page from './../types/Page';

Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        loading: true,
        options: [],
        homeId: 7,
        homePage: new Page(),
        isAbout: false,
        aboutPage: new Page(),
        sections: {},
    },

    getters: {

    },

    mutations: {
        increment( state ) {
            state.count++
        }
    },

    actions: {

    }

});