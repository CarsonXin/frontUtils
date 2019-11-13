export function setCookie(name: string, value: any, expiresDay: number = 7) {
    let d = new Date()
    d.setTime(d.getTime() + (expiresDay * 86400000 /*24 * 60 * 60 * 1000*/))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires
}

export function getCookie(name: string) {
    let $name = name + '='
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim()
        if (cookie.indexOf($name) === 0) {
            return cookie.substring($name.length, cookie.length)
        }
    }
    return ''
}

const languageCookieKey = 'language'

export function getLanguage(): string {
    return getCookie(languageCookieKey)
}

export function setLanguage(lang: string) {
    setCookie(languageCookieKey, lang, 7)
}
