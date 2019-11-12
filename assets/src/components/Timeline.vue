<template>
    <ul class="c-timeline">
        <li v-for="(entry, index) in entries" :key="index" class="c-timeline__item">
            
            <h3 class="c-timeline__title">{{ entry.title }}</h3>   

            <div class="c-timeline__content">
                
                <figure class="c-timeline__imgbox">
                    <!-- TODO: make rwd img/picture component -->
                    <img v-if="entry.image" :src="entry.image.sizes.medium_large" class="c-timeline__img" alt="">
                    <img v-else src="" alt="">

                    <span class="c-timeline__year">{{ entry.year }}</span>
                </figure>

                <div class="c-timeline__text">
                    <h6 v-if="entry.heading.url"><a :href="entry.heading.url" target="_blank" rel="noopener">{{ entry.heading.text }}</a></h6>
                    <h6 v-else>{{ entry.heading.text }}</h6>
                
                    <div v-html="entry.content"></div>
                </div>

            </div>
        </li>
        <li class="c-timeline__featured">
            <p v-html="summary" class="c-timeline__featured-p"></p>
            <router-link :to="{path: distUrl + 'portfolio'}" class="c-button c-button--secondary effect-shine">
                Portfolio
            </router-link>
        </li>
    </ul>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
    data() {
        return {
            items: null,
            viewportHeight: 0,
            throttledFunc: throttle(this.handleTimeline, 250)
        }
    },
    props: {
        entries: Array,
        summary: String
    },
    mounted() {
        this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        this.items = document.querySelectorAll(".c-timeline__item");

        //TODO: Intesection Observer API
        window.addEventListener("scroll", this.throttledFunc);
    },
    destroyed() {
        window.removeEventListener("scroll", this.throttledFunc);
    },
    computed: {
        viewportMiddle() {
            return this.viewportHeight / 2;
        }
    },
    methods: {
        handleTimeline() {
            Array.from(this.items).forEach((el) => {
                if(this.isInViewport(el)) {
                    el.classList.add('c-timeline__item--active');
                } else {
                    el.classList.remove('c-timeline__item--active');
                }
            });
        },
        isInViewport(elem) {
            let bounding = elem.getBoundingClientRect(),
                elemTop = bounding.top,
                elemBottom = bounding.bottom;
                
            return elemTop <= this.viewportHeight - 150 && elemBottom > 150;
        }
    }
}
</script>
