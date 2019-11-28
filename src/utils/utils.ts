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

export function validatePhoneNum(phone: string | number): boolean {
    return /^1[345678][0-9]\d{8}$/.test(phone.toString())
}

export function priceFormatter(price: any) {
    if (isNaN(price)) {
        return price
    } else if (price) {
        return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    } else {
        return 0
    }
}

export function isImage(fileType: string) {
    return /^(image\/jpeg|image\/png)$/i.test(fileType)
}

export function transUint8Array(dataUrl: string) {
    let arr = dataUrl.split(',')
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return u8arr
}

export function dataURLtoBlob(dataUrl: string) {
    let arr = dataUrl.split(',')
    // @ts-ignore
    let mime = arr[0].match(/:(.*?);/)[1]
    return new Blob([transUint8Array(dataUrl)], { type: mime })
}

export function dataURLtoFile(dataUrl: string, filename: string) {
    let arr = dataUrl.split(',')
    // @ts-ignore
    let mime = arr[0].match(/:(.*?);/)[1]
    return new File([transUint8Array(dataUrl)], filename, { type: mime })
}
