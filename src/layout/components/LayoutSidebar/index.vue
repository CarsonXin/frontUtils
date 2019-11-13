<template>
    <el-aside :width="width">
        <div class="sidebar content-box">
        </div>
    </el-aside>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class LayoutSidebar extends Vue {
    @Prop({
        default: '180px'
    }) width!: string

    get currentPath() {
        return this.$route.path
    }
}
</script>

<style lang="scss" scoped>
aside {
    display: block;
}

@media (min-width: 992px) {
    .sidebar {
        /*position: fixed;*/
    }
}
</style>

