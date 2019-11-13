let path = require('path')

export function deviceType(): string {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isAndroid) {
        return 'android'
    } else if (isiOS) {
        return 'ios'
    } else {
        return ''
    }
}

export function resolvePath(routePath: string = '', subPath: string = '') {
    return path.resolve(routePath, subPath)
}

export function combineURLs(baseURL: string = '', relativeURL: string = '') {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' +
        relativeURL.replace(/^\/+/, '') : baseURL
}
