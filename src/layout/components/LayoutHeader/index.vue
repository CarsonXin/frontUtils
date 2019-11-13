<template>
    <el-header
            v-bind="$props"
            class="layout-header navbar"
            :class="{'fixed-top': fixedTop}"
            :style="{lineHeight: height}"
    >
        <div class="header-title navbar-left">
            <router-link to="/index">{{title}}</router-link>
        </div>
        <div class="navbar-right">
            <div class="navbar-nav-item" role="banner">
                <el-dropdown @command="changeLanguage" trigger="click" style="display: none">
                    <div class="el-dropdown-link">
                        <a href="javascript: void(0)" type="text" slot="reference">
                            <i class="fa fa-language"></i>
                            {{language}}
                        </a>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="(lang, key) in languageNames"
                                :key="lang"
                                :command="key"
                        >
                            {{lang}}
                            <i class="el-icon-check" v-show="locale === key"></i>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {SettingsModule} from '@/store/modules/settings'
import {languageNames, ProjectTitle} from '@/utils/properties'

@Component
export default class LayoutHeader extends Vue {
    @Prop({
        default: '50px',
    }) height!: string

    @Prop({
        default: ProjectTitle,
    }) title!: string
    @Prop({
        default: true,
    }) fixedTop!: boolean
    languageNames: any = languageNames

    get locale():string {
        return SettingsModule.language
    }

    get language() {
        return this.languageNames[this.locale]
    }

    changeLanguage(lang: string) {
        this.$i18n.locale = lang
        // this.$store.dispatch('settings/setLanguage', lang)
    }
}
</script>

<style lang="scss" scoped>
    .layout-header {
        background-color: $headerBackgroundColor;
        border-radius: 0;
        text-align: left;

        .header-title {
            color: #fff;
            font-size: 24px;
            font-weight: 500;
        }

        a {
            color: #fff;
            text-decoration: none;

            &:hover,
            &:focus {
                text-shadow: 0 0 2px #fff;
                /*color: #fff;*/
                background-color: transparent !important;
            }
        }

        &.fixed-top {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 5;
            box-shadow: 0 0 8px 0 rgba($headerBackgroundColor, 0.5);
        }
    }

    .dropdown-menu li a {
        color: $headerBackgroundColor;
    }
</style>
