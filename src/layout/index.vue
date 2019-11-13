<template>
    <div class="app-wrapper">
        <layout-header class="layout-header" :class="{'header-fixed-top': fixedTop}"></layout-header>
        <div class="main-container">
            <el-aside class="layout-sidebar">
                <layout-sidebar></layout-sidebar>
            </el-aside>
            <div class="layout-main">
                <layout-main></layout-main>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { LayoutHeader, LayoutMain, LayoutSidebar } from '@/layout/components'
import {SettingsModule} from '@/store/modules/settings'
import {EventBus} from '@/utils/EventBus'
let Bus = new EventBus()
@Component({
    components: { LayoutHeader, LayoutSidebar, LayoutMain },
})
export default class Layout extends Vue {
    @State('settings') settings: any

    get fixedTop(): boolean {
        return SettingsModule.fixedHeader
    }

    mounted() {
        console.log('msg')
        Bus.on('message', (data: any, date:any = new Date()) => {
            console.log('data', data)
            console.log('date', date)
        })

        setTimeout(() => {
            Bus.emit('message', 'hello', 2333)
        }, 50)
    }
}

</script>
<style lang="scss">
    .app-wrapper {
        height: 100%;
        box-sizing: border-box;
        /*padding-top: 60px;*/

        .layout-header {

        }
    }

    .main-container {
        /*margin-top: 70px;*/
        position: relative;
        max-height: 100%;
        box-sizing: border-box;
        padding: 8px;

        .layout-sidebar {
            position: absolute;
            width: 180px;
            left: 8px;
            top: 8px;
            box-sizing: border-box;
        }

        .layout-main {
            max-height: 100%;
            background-color: #fff;
            margin-left: 180px;
            box-sizing: border-box;

        }
    }
</style>
