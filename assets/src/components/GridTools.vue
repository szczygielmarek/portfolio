<template>
    <ul v-if="icons" class="c-grid-tools">
        <li v-for="(icon, index) in icons" :key="index" class="c-grid-tools__icon">
            <a :href="icon.url" target="_blank" class="effect-shine" :title="icon.title">
                <i v-if="icon.font_icon" :class="'fab ' + icon.font_icon"></i>
                <img v-if="icon.icon" :src="icon.icon.sizes.thumbnail" alt="">
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        icons: {
            type: Array,
            default: [],
            required: true
        }
    }
}
</script>
