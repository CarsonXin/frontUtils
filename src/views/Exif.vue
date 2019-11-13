<template>
    <el-row>
        <el-input type="file"></el-input>
        <el-button> FIX IT</el-button>
    </el-row>
</template>

<script lang="ts">
import EXIF from 'exif-js'
import {Component, Vue} from 'vue-property-decorator'

import {deviceType} from '@/utils/utils'

@Component
export default class Exif extends Vue {
    fixImageOrientation(imageFile: File) {
        let isImage = /^(image\/jpeg|image\/png)$/i.test(imageFile.type)
        if (!isImage) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            let Orientation: string | number | null = ''
            if (!window.hasOwnProperty('deviceType')) {
                window.deviceType = deviceType()
            }
            let device = window.deviceType

            let fileReader = new FileReader()
            fileReader.onload = function(e) {
                let image = new Image()
                image.src = e.target.result
                image.onload = function() {
                    EXIF.getData(image, function() {
                        Orientation = EXIF.getTag(this, 'Orientation')
                    })
                    let canvas: HTMLCanvasElement = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    let {naturalWidth, naturalHeight} = image
                    canvas.width = naturalWidth
                    canvas.height = naturalHeight
                    ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight)
                    // let base64 = null;
                    console.log('Orientation', Orientation)
                    // if (device === 'ios') {
                    if (Orientation !== '' && Orientation !== 1) {
                        // alert('旋转处理');
                        switch (Orientation) {
                            case 3: {
                                //需要180度旋转
                                console.log('旋转180°')
                                canvas.height = naturalHeight
                                canvas.width = naturalWidth
                                ctx.rotate(Math.PI)
                                ctx.translate(-naturalWidth, -naturalHeight)
                                ctx.drawImage(image, 0, 0)
                                break
                            }
                            case 6:
                                // alert('需要顺时针（向左）90度旋转');
                                console.log('旋转90°')
                                canvas.height = naturalWidth
                                canvas.width = naturalHeight
                                ctx.rotate(Math.PI / 2)
                                ctx.translate(0, -naturalHeight)
                                ctx.drawImage(image, 0, 0)
                                break
                            case 8: {
                                console.log('旋转270°')
                                canvas.height = naturalWidth
                                canvas.width = naturalHeight
                                ctx.rotate(-Math.PI / 2)
                                ctx.translate(-naturalHeight, 0)
                                ctx.drawImage(image, 0, 0)
                                break
                            }
                        }
                    }
                    // }
                    resolve(canvas.toDataURL('image/jpeg', .8))
                }
            }
            fileReader.readAsDataURL(imageFile)
        })
    }
}
</script>

<style scoped>

</style>
