//styles
import './scss/style.scss';

//Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { store } from './store/store';
import { GlobalEvents } from './global-events';

const DIST_URL = wp.dist_url;
Vue.mixin({
    data() {
        return {
            get distUrl() {
                return DIST_URL;
            }
        }
    }
});

import OptionsService from './services/options.services';

import TopBar from './components/TopBar.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Portfolio from './components/Portfolio.vue';
import Project from './components/Project.vue';

const routes = [
    {path: DIST_URL, component: Home},
    {path: DIST_URL + 'about', component: About},
    {path: DIST_URL + 'contact', component: Contact},
    {path: DIST_URL + 'portfolio', component: Portfolio},
    {path: DIST_URL + 'portfolio/:id', component: Project},
    //{path: '/portfolio/:id', component: Page}
]

const router = new VueRouter({
    mode: "history",
    routes,
    linkExactActiveClass: 'active'
});

var app = new Vue({
    el: '#app',
    router,
    store,
    data: {
        options: [],
        isAbout: false
    },
    components: {
        TopBar
    },
    created() {
        OptionsService.getOptions()
            .then(options => this.options = options);   
            
        GlobalEvents.$on('page-loaded', (slug) => {
            this.isAbout = (slug && slug === 'about');
        });    
    },
    methods: {
        onHandleLoaded() {
            //console.log('loaded');
        }
    }
});























