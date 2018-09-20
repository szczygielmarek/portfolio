<template>
    <div class="p-portfolio o-page">

        <!-- LOADER -->
        <div class="pre-loader"></div>
        <div :class="{'loader--active': loading}" class="loader"><div class="sprite"></div></div>

        <div class="p-portfolio__content o-page__content">

            <div ref="slider" class="c-slider c-slider--clip">
                
                <div ref="sliderWrapper" class="c-slider__wrapper">
                    <div v-for="(project, index) in projects" :key="project.id" 
                        class="c-slider__slide" :class="{'c-slider__slide--next': (index == 0)}"
                        :style="{backgroundColor: project.dominant_image_color}">
                        
                        <img :src="project.featured_image" class="c-slider__img" alt="">
                        
                        <div class="p-portfolio__overlay o-overlay d-flex align-items-end justify-content-center">
                            
                            <!-- <div class="o-overlay" :style="{background: 'linear-gradient('+ project.dominant_image_color +', transparent)'}"></div> -->

                            <div class="c-slider__headline headlineBg">
                                {{ project.acf.headline }}
                            </div>

                            <div class="c-slider__cta">
                                <p>{{ project.title }}</p>
                                <a :href="project.acf.url" target="_blank" class="c-button c-button--dark effect-shine">
                                    On-line
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <button @click="handleClickPrev" type="text" class="c-slider__arrow c-slider__arrow--prev effect-shine"><i class="fas fa-arrow-left"></i></button>
                <button @click="handleClickNext" type="text" class="c-slider__arrow c-slider__arrow--next effect-shine"><i class="fas fa-arrow-right"></i></button>
            
            </div>

        </div>

    </div>
</template>

<script>
import { GlobalEvents } from './../global-events.js';
import ProjectsService from './../services/project.services';

export default {
    data () {
        return {
            loading: {
                type: Boolean,
                default: true
            },
            projects: [],
            slides: '',
            currentSlide: null,
            firstSlide: null,
            lastSlide: null,
            animated: false
        }
    },
    components: {
        
    },
    mounted() {  
        //TODO: https://codepen.io/noeldelgado/pen/ByxQjL
        
        this.fetchProjects()
            .then(() => {
                this.slides = document.querySelectorAll(".c-slider__slide"); //stała kolekcja NodeList / bez klonow
                //this.slides = this.$refs.slider.getElementsByClassName('c-slider__slide'); //zywa kolekcja HTMLCollection / z klonami
                this.init();
            });

        // this.$refs.sliderWrapper.addEventListener('webkitTransitionStart', this.handleTransitionStart);
        // this.$refs.sliderWrapper.addEventListener('transitionstart', this.handleTransitionStart);
        this.$refs.sliderWrapper.addEventListener('webkitTransitionEnd', this.handleTransitionEnd);
        this.$refs.sliderWrapper.addEventListener('transitionend', this.handleTransitionEnd);
    },
    beforeDestroy() {
        this.$refs.sliderWrapper.removeEventListener('webkitTransitionEnd', this.handleTransitionEnd);
        this.$refs.sliderWrapper.removeEventListener('transitionend', this.handleTransitionEnd);
    },
    computed: {
        sliderLength() {
            return this.slides.length;
        }
    },
    watch: {
        '$route': 'fetchProjects'
    },
    methods: {
        fetchProjects() {
            return ProjectsService
                .getProjects()
                .then(projects => {
                    this.projects = projects;
                    this.loading = false;
                    this.$emit('loaded');
                    GlobalEvents.$emit('page-loaded');
                });
        },
        init() {
            let { sliderWrapper } = this.$refs;

            this.firstSlide = sliderWrapper.firstChild;
            let firstClone = this.firstSlide.cloneNode(true);
            firstClone.classList.add("clone");
            firstClone.classList.remove("c-slider__slide--next");
            
            this.lastSlide = sliderWrapper.lastChild;
            let lastClone = this.lastSlide.cloneNode(true);
            lastClone.classList.add("clone");  
            lastClone.classList.add("c-slider__slide--next");
            
            sliderWrapper.appendChild(firstClone);
            sliderWrapper.prepend(lastClone);
        },
        handleClickPrev(e) {
            let target = this.findLastElemByClassName(this.slides, "c-slider__slide--next");
            target.classList.remove('c-slider__slide--next');
        },
        handleClickNext(e) {
            let target = this.findLastElemByClassName(this.slides, "c-slider__slide--next");
            target.nextElementSibling.classList.add('c-slider__slide--next');
        },
        handleTransitionStart(e) {
            this.animated = true;
        },
        handleTransitionEnd(e) {
            if(e.target.classList.contains("clone")) {
                this.$refs.slider.classList.remove("c-slider--clip");
                this.removeClasses();
                e.target.classList.remove("c-slider__slide--next");
                this.firstSlide.classList.add('c-slider__slide--next');
               
               setTimeout(() => {
                    this.$refs.slider.classList.add("c-slider--clip");
                }, 25);
            } else if(e.target.previousElementSibling.classList.contains("clone")) {
                this.$refs.slider.classList.remove("c-slider--clip");
                this.addClasses();
            
                setTimeout(() => {
                    this.$refs.slider.classList.add("c-slider--clip");
                }, 25);
            }
        },
        addClasses() {
            Array.from(this.slides).forEach((slide) => {
                slide.classList.add('c-slider__slide--next');
            });
        },
        removeClasses() {
            Array.from(this.slides).forEach((slide) => {
                slide.classList.remove('c-slider__slide--next');
            });
        },
        findElemsByClassName(nodeList, className) {
            return Array.from(nodeList).filter(el => {
                return el.classList.contains(className);
            });
        },
        findLastElemByClassName(nodeList, className) {
            let target = this.findElemsByClassName(nodeList, className);
            return target[target.length - 1];
        }
    }
}
</script>


