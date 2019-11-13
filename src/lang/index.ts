import VueI18n from 'vue-i18n'
import { Vue } from 'vue-property-decorator'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhCnLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementZhTwcLocal from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from './en'
import zhCnLocale from './zh-cn'
import zhTwLocale from './zh-tw'
import { getLanguage } from '@/utils/cookies'
import { SettingsModule } from '@/store/modules/settings'

Vue.use(VueI18n)

const messages = {
    en: {
        ...elementEnLocale,
        ...enLocale,
    },
    'zh-cn': {
        ...elementZhCnLocale,
        ...zhCnLocale,
    },
    'zh-tw': {
        ...elementZhTwcLocal,
        ...zhTwLocale,
    },
}

function getLocale(): string {
    let cookieLang = getLanguage()
    if (cookieLang) {
        SettingsModule.updateLanguage(cookieLang)
        return cookieLang
    }
    return 'zh-cn'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages,
})

export default i18n
