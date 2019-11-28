import Compressor from 'compressorjs'

let imageMaxSize = 2 << 20
export function compressImage(file, {
    quality = 0.6, maxWidth = 720, maxSize = imageMaxSize, maxCompressCount = 5, convertSize = imageMaxSize,
} = {}) {
    let compressCounter = 1
    return new Promise(resolve => {
        let compressor = (fileData) => {
            return new Compressor(fileData, {
                quality,
                maxWidth,
                convertSize,
                success(result) {
                    if (result.size <= maxSize || compressCounter >= maxCompressCount) {
                        console.log(`压缩完成, 从 ${file.size}B 压缩到 ${result.size}B，共压缩${compressCounter}次`)
                        resolve(result)
                        compressCounter = 0
                    } else {
                        console.log('retry ', compressCounter - 1)
                        if (compressCounter < maxCompressCount) {
                            quality = (maxCompressCount - compressCounter) / (maxCompressCount * 2)
                            compressCounter++
                            compressor(result)
                        }
                    }
                },
            })
        }
        compressor(file)
    })
}
