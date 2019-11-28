import {isImage} from './utils'
import EXIF from 'exif-js'

export function fixImageOrientation(imageFile, {
    quality = 1 /* 输出图片质量 */, needBlobFile = false,
} = {}) {
    return new Promise((resolve, reject) => {
        if (isImage(imageFile.type)) {
            let Orientation = 0
            let exifData = {}
            let fileReader = new FileReader()
            fileReader.onload = function(e) {
                let image = new Image()
                let originImage = e.target.result || ''
                image.src = originImage
                image.onload = function() {
                    EXIF.getData(image, function() {
                        exifData = EXIF.getAllTags(this) || {}
                        Orientation = EXIF.getTag(this, 'Orientation') || 1
                        console.log('图片EXIF信息：', exifData)
                    })
                    let canvas = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    let { naturalWidth, naturalHeight } = image
                    canvas.width = naturalWidth
                    canvas.height = naturalHeight
                    ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight)
                    if (Orientation !== 0 && Orientation !== 1) {
                        // alert('旋转处理');
                        let canvasConfig = {
                            width: naturalWidth,
                            height: naturalHeight,
                            rotate: 0,
                            translate: [0, 0],
                        }
                        switch (Orientation) {
                            case 3: {
                                console.log('需要旋转180°')
                                canvasConfig = {
                                    width: naturalWidth,
                                    height: naturalHeight,
                                    rotate: Math.PI,
                                    translate: [-naturalWidth, -naturalHeight],
                                }
                                break
                            }
                            case 6:
                                console.log('需要旋转90°')
                                canvasConfig = {
                                    width: naturalHeight,
                                    height: naturalWidth,
                                    rotate: Math.PI / 2,
                                    translate: [0, -naturalHeight],
                                }
                                break
                            case 8: {
                                console.log('需要旋转270°')
                                canvasConfig = {
                                    width: naturalHeight,
                                    height: naturalWidth,
                                    rotate: -Math.PI / 2,
                                    translate: [-naturalHeight, 0],
                                }
                                break
                            }
                        }

                        canvas.height = canvasConfig.height
                        canvas.width = canvasConfig.width
                        ctx.rotate(canvasConfig.rotate)
                        ctx.translate(...canvasConfig.translate)
                        ctx.drawImage(image, 0, 0)
                    }
                    let result = {
                        resultImage: canvas.toDataURL('image/jpeg', quality),
                        originImage,
                        exifData,
                    }
                    if (needBlobFile) {
                        canvas.toBlob(function(blob) {
                            result.blobFile = blob
                            resolve(result)
                        }, imageFile.type || 'image/jpeg')
                    } else {
                        resolve(result)
                    }
                }
            }
            fileReader.readAsDataURL(imageFile)
        } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('you should select an image file')
        }
    })
}
