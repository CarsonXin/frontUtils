<template>
    <section class="main-container ">
        <transition name="fade-transform" mode="out-in" enter-active-class="animated faster fadeIn"
                    leave-active-class="animated faster fadeOut">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class LayoutMain extends Vue {
}
</script>

<style scoped>
    .main-container {
        padding: 0 8px;
        box-sizing: border-box;
        width: 100%;
    }
</style>
