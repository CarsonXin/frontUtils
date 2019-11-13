import {
    Action,
    getModule,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { setLanguage } from '@/utils/cookies'

@Module({ name: 'settings', dynamic: true, store })
class Settings extends VuexModule {
    language: string = 'zh-cn'
    fixedHeader: boolean = false

    @Action({ commit: 'UPDATE_LANGUAGE' })
    updateLanguage(lang: string) {
        return lang
    }

    @Mutation
    UPDATE_LANGUAGE(lang: string) {
        this.language = lang
        setLanguage(lang)
    }
}

export const SettingsModule = getModule(Settings)
