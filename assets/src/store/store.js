import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Page from './../types/Page';
import PageService from './../services/page.services';
import ProjectsService from './../services/project.services';

import { SET_LOADING, SET_PAGE, SET_PROJECTS, FETCH_PAGE, FETCH_PAGE_BY_SLUG, FETCH_PROJECTS, SET_ABOUT } from './mutation-types';


export const store = new Vuex.Store({

    state: {
        //title: '',
        loading: true,
        //isMenuOpen: false,
        isAbout: false,
        page: new Page(),
        //options: [],
        projects: []
    },

    getters: {
        
    },

    mutations: {
        
        [SET_LOADING] (state, value) {
            state.loading = value;
        },
        
        [SET_PAGE] (state, page) {
            state.page = page;
        },

        [SET_PROJECTS] (state, projects) {
            state.projects = projects;
        },

        [SET_ABOUT] (state, value) {
            state.isAbout = value;
        }

    },

    actions: {

        [FETCH_PAGE] ({ commit }, id) {
            return PageService
                .getPage(id)
                    .then(page => {
                        commit(SET_PAGE, page);
                    });
        },

        [FETCH_PAGE_BY_SLUG] ({ commit }, slug) {
            return PageService
                .getPageBySlug(slug)
                    .then(page => {
                        commit(SET_PAGE, page);
                    });
        },

        [FETCH_PROJECTS] ({ commit }) {
            return ProjectsService
                .getProjects()
                    .then(projects => {
                        commit(SET_PROJECTS, projects);
                    });
        }

    }

});