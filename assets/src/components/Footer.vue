<template>
    <footer :class="[classNames]" class="m-page-footer u-relative o-container-padding pt-3 pb-3 justify--content-between align-items-end">
        <div class="row no-gutter justify-content-between">

            <div class="col-10 col-sm-auto">
                <p>&copy; 2018 <i class="fas fa-code"></i> Szczygieł Marek <br><span class="d-none d-sm-inline">-</span> Front End Developer - Kraków</p>
            </div>

            <div class="col-2 col-sm-auto text-right">
                <p>
                    <a href="https://github.com/szczygielmarek" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </p>
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        classNames: {
            type: String,
            required: false,
            default: ''
        }
    }
}
</script>
