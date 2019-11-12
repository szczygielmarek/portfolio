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
                                <a :href="project.acf.url" target="_blank" rel="noopener" class="c-button c-button--dark effect-shine">
                                    On-line
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <button @click="handleClickPrev" type="text" aria-label="Previous" class="c-slider__arrow c-slider__arrow--prev effect-shine"><i class="fas fa-arrow-left"></i></button>
                <button @click="handleClickNext" type="text" aria-label="Next" class="c-slider__arrow c-slider__arrow--next effect-shine"><i class="fas fa-arrow-right"></i></button>
            
            </div>

        </div>

    </div>
</template>

<script>
import { SET_LOADING, FETCH_PROJECTS, SET_PROJECTS, SET_ABOUT } from './../store/mutation-types';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    data () {
        return {
            slides: '',
            currentSlide: null,
            firstSlide: null,
            lastSlide: null,
            animated: false,
            x0: null,
            locked: false
        }
    },
    computed: {
        ...mapState([
            'loading',
            'projects'
        ]),
        sliderLength() {
            return this.slides.length;
        }
    },
    watch: {
        loading(val) {
            if(!val)
                this.$store.commit(SET_ABOUT, false);
        }
    },
    beforeCreate() {
        this.$store.commit(SET_LOADING, true);
    },
    mounted() {  
        //TODO: https://codepen.io/noeldelgado/pen/ByxQjL
        this.fetchProjects();
        // this.$refs.sliderWrapper.addEventListener('webkitTransitionStart', this.handleTransitionStart);
        // this.$refs.sliderWrapper.addEventListener('transitionstart', this.handleTransitionStart);
        this.$refs.sliderWrapper.addEventListener('webkitTransitionEnd', this.handleTransitionEnd);
        this.$refs.sliderWrapper.addEventListener('transitionend', this.handleTransitionEnd);

        this.$refs.sliderWrapper.addEventListener('mousedown', this.lock);
        this.$refs.sliderWrapper.addEventListener('touchstart', this.lock);

        //this.$refs.sliderWrapper.addEventListener('mousemove', this.drag.bind(this), false);
        //this.$refs.sliderWrapper.addEventListener('touchmove', this.drag.bind(this), false);

        this.$refs.sliderWrapper.addEventListener('mouseup', this.move);
        this.$refs.sliderWrapper.addEventListener('touchend', this.move);

        document.body.addEventListener('keydown', this.handleKeyEvents);
    },
    beforeDestroy() {
        this.$refs.sliderWrapper.removeEventListener('webkitTransitionEnd', this.handleTransitionEnd);
        this.$refs.sliderWrapper.removeEventListener('transitionend', this.handleTransitionEnd);

        this.$refs.sliderWrapper.removeEventListener('mousedown', this.lock);
        this.$refs.sliderWrapper.removeEventListener('touchstart', this.lock);

        this.$refs.sliderWrapper.removeEventListener('mouseup', this.move);
        this.$refs.sliderWrapper.removeEventListener('touchend', this.move);

        document.body.removeEventListener('keydown', this.handleKeyEvents);

        this.$store.commit(SET_PROJECTS, []);
        this.$store.commit(SET_LOADING, true);
    },
    methods: {
        ...mapMutations([
            SET_LOADING,
            SET_ABOUT
        ]),
        ...mapActions([
            FETCH_PROJECTS
        ]),
        async fetchProjects() {
            await this.$store.dispatch(FETCH_PROJECTS);

            this.slides = document.querySelectorAll(".c-slider__slide"); //stała kolekcja NodeList / bez klonow
            this.init();
            
            setTimeout(() => {
                this.$store.commit(SET_LOADING, false);
            }, 50);
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
        handleKeyEvents(e) {
            if( e.keyCode == 37 )
                this.handleClickPrev();
            if( e.keyCode == 39 )
                this.handleClickNext();    
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
        },
        unify(e) {
            return e.changedTouches ? e.changedTouches[0] : e
        },
        lock(e) {
            this.x0 = this.unify(e).clientX;
            this.locked = true
        },
        drag(e) {
            e.preventDefault();

            if(this.locked) {
                var dx = this.unify(e).clientX - this.x0,
                    shift = +( dx / window.innerWidth).toFixed(2);

                //console.log(shift);
            }
        },
        move(e) {
            if(this.locked) {
                var dx = this.unify(e).clientX - this.x0,
                    s = Math.sign(dx),
                    f = +( s * dx / window.innerWidth ).toFixed(2);

                var distance = s * f;
                if(distance > -0.05 && distance < 0.05) return false;

                if( distance < 0 ) {
                    this.handleClickPrev();
                } else {
                    this.handleClickNext();
                }

                this.x0 = null;
                this.locked = false;
            }
        }
    }
}
</script>


