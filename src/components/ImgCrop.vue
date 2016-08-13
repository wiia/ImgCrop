<template>
	<div class="img_crop"
			 :style="{background: backgroundColor}">
		<canvas id="canvasIn"></canvas>
		<canvas id="canvasCr"
						:style="{cursor: cursor}"></canvas>
		<canvas id="canvasOt"></canvas>
	</div>
</template>

<script>
export default {
  data () {
    return {
      canvasCr: null,
      ctxCr: null,
      bcr: null,
      img: {},
      crop: {},
      inImg: new window.Image(),
      isMouseDownS: false,
      isMouseDownD: false,
      isMouseOverS: false,
      isMouseOverD: false,
      mouseDragCurX: 0,
      mouseDragCurY: 0,
      scale: 1,
      cursor: ''
    }
  },
  props: {
    canvasW: {
      type: Number,
      default: 360
    },
    canvasH: {
      type: Number,
      default: 360
    },
    inImgSrc: String,
    backgroundColor: {
      type: String,
      default: '#000'
    },
    cropInitR: {
      type: Number,
      default: 1.5
    },
    isRatio: {
      type: Boolean,
      default: false
    },
    cropRatio: {
      type: Number,
      default: 1.6
    }
  },
  events: {
    'img:crop': function () {
      let iUri = this.outImg()
      this.$dispatch('img:out', iUri)
    }
  },
  methods: {
    w2cX (x) {
      return x - this.bcr.left
    },
    w2cY (y) {
      return y - this.bcr.top
    },
    // make the image scaled and centered on the canvas
    imgJudge () {
      let imgR = this.inImg.width / this.inImg.height
      let canvasR = this.canvasW / this.canvasH
      if (imgR >= canvasR) {
        this.img.h = this.img.w / imgR
        this.img.y = (this.canvasH - this.img.h) / 2
      } else {
        this.img.w = this.img.h * imgR
        this.img.x = (this.canvasW - this.img.w) / 2
      }
      this.crop.w = this.img.w / this.cropInitR
      this.crop.h = this.crop.w / this.cropRatio
      this.crop.x = this.img.x + this.img.w / 2 - this.crop.w / 2
      this.crop.y = this.img.y + this.img.h / 2 - this.crop.h / 2
      this.scale = this.img.h / this.inImg.height
    },
    mouseDown (e) {
      e.preventDefault()
      if (this.isMouseOverD) {
        this.isMouseDownD = true
        this.mouseDragCurX = this.w2cX(e.clientX)
        this.mouseDragCurY = this.w2cX(e.clientY)
      } else if (this.isMouseOverS) {
        this.isMouseDownS = true
      }
    },
    mouseMove (e) {
      e.preventDefault()
      if (!this.isMouseDownD && !this.isMouseDownS) {
        let isDrag = this.w2cX(e.clientX) <= this.crop.x + this.crop.w && this.w2cX(e.clientX) >= this.crop.x && this.w2cY(e.clientY) <= this.crop.y + this.crop.h && this.w2cY(e.clientY) >= this.crop.y
        if (isDrag) {
          this.cursor = 'move'
          this.isMouseOverD = true
        } else if (this.ctxCr.isPointInPath(this.w2cX(e.clientX), this.w2cY(e.clientY))) {
          this.cursor = 'nwse-resize'
          this.isMouseOverS = true
        } else {
          this.cursor = 'default'
          this.isMouseOverD = false
          this.isMouseOverS = false
        }
      }
      if (this.isMouseDownD) {
        let mouseDX = this.w2cX(e.clientX) - this.mouseDragCurX
        let mouseDY = this.w2cX(e.clientY) - this.mouseDragCurY
        let isBeyound = (this.crop.x + mouseDX) < this.img.x || (this.crop.y + mouseDY) < this.img.y || (this.crop.x + mouseDX + this.crop.w) > (this.img.x + this.img.w) || (this.crop.y + mouseDY + this.crop.h) > (this.img.y + this.img.h)
        if (!isBeyound) {
          this.mouseDragCurX = this.w2cX(e.clientX)
          this.mouseDragCurY = this.w2cX(e.clientY)
          this.crop.x = this.crop.x + mouseDX
          this.crop.y = this.crop.y + mouseDY
          this.initCrop()
        }
      } else if (this.isMouseDownS) {
        let curR = (this.w2cX(e.clientX) - this.crop.x) / (this.w2cY(e.clientY) - this.crop.y)
        let isBeyound
        if (!this.isRatio) {
          isBeyound = this.w2cX(e.clientX) < this.crop.x || this.w2cX(e.clientX) > (this.img.x + this.img.w) || this.w2cY(e.clientY) < this.crop.y || this.w2cY(e.clientY) > (this.img.y + this.img.h)
          if (!isBeyound) {
            this.crop.w = this.w2cX(e.clientX) - this.crop.x
            this.crop.h = this.w2cY(e.clientY) - this.crop.y
            this.initCrop()
          }
        } else {
          if (curR >= this.cropRatio) {
            isBeyound = (this.crop.x + (this.w2cY(e.clientY) - this.crop.y) * this.cropRatio) < this.crop.x || (this.crop.x + (this.w2cY(e.clientY) - this.crop.y) * this.cropRatio) > (this.img.x + this.img.w) || this.w2cY(e.clientY) < this.crop.y || this.w2cY(e.clientY) > (this.img.y + this.img.h)
            if (!isBeyound) {
              this.crop.h = this.w2cY(e.clientY) - this.crop.y
              this.crop.w = this.crop.h * this.cropRatio
              this.initCrop()
            }
          } else {
            isBeyound = this.w2cX(e.clientX) < this.crop.x || this.w2cX(e.clientX) > (this.img.x + this.img.w) || this.crop.y + (this.w2cX(e.clientX) - this.crop.x) / this.cropRatio < this.crop.y || this.crop.y + (this.w2cX(e.clientX) - this.crop.x) / this.cropRatio > (this.img.y + this.img.h)
            if (!isBeyound) {
              this.crop.w = this.w2cX(e.clientX) - this.crop.x
              this.crop.h = this.crop.w / this.cropRatio
              this.initCrop()
            }
          }
        }
      }
    },
    mouseUp (e) {
      e.preventDefault()
      if (this.isMouseDownD) {
        this.isMouseDownD = false
      } else if (this.isMouseDownS) {
        this.isMouseDownS = false
      }
    },
    mouseOver (e) {
      e.preventDefault()
      let isDrag = this.w2cX(e.clientX) <= this.crop.x + this.crop.w && this.w2cX(e.clientX) >= this.crop.x && this.w2cY(e.clientY) <= this.crop.y + this.crop.h && this.w2cY(e.clientY) >= this.crop.y
      if (isDrag) {
        this.cursor = 'move'
      } else {
        if (this.ctxCr.isPointInPath(this.w2cX(e.clientX), this.w2cY(e.clientY))) {
          this.cursor = 'nwse-resize'
        } else {
          this.cursor = 'default'
        }
      }
    },
    initCrop () {
      this.ctxCr.clearRect(0, 0, this.canvasW, this.canvasH)
      // mask layer
      this.ctxCr.beginPath()
      this.ctxCr.moveTo(this.img.x, this.img.y)
      this.ctxCr.lineTo(this.img.x + this.img.w, this.img.y)
      this.ctxCr.lineTo(this.img.x + this.img.w, this.img.y + this.img.h)
      this.ctxCr.lineTo(this.img.x, this.img.y + this.img.h)
      this.ctxCr.lineTo(this.img.x, this.img.y)
      //
      this.ctxCr.moveTo(this.crop.x, this.crop.y)
      this.ctxCr.lineTo(this.crop.x, this.crop.y + this.crop.h)
      this.ctxCr.lineTo(this.crop.x + this.crop.w, this.crop.y + this.crop.h)
      this.ctxCr.lineTo(this.crop.x + this.crop.w, this.crop.y)
      this.ctxCr.lineTo(this.crop.x, this.crop.y)
      this.ctxCr.closePath()
      // fill mask layer
      this.ctxCr.fillStyle = 'rgba(255,255,255,.5)'
      this.ctxCr.fill()
      //
      this.ctxCr.strokeStyle = '#e8ecf1'
      // drag area
      this.ctxCr.beginPath()
      this.ctxCr.rect(this.crop.x, this.crop.y, this.crop.w, this.crop.h)
      this.ctxCr.stroke()
      // scale area
      this.ctxCr.beginPath()
      this.ctxCr.arc(this.crop.x + this.crop.w + 3, this.crop.y + this.crop.h + 3, 4, 0, 180)
      this.ctxCr.stroke()
      //
      this.canvasCr.onmousedown = (e) => {
        this.mouseDown(e)
      }
      this.canvasCr.onmousemove = (e) => {
        this.mouseMove(e)
      }
      this.canvasCr.onmouseout = (e) => {
        e.preventDefault()
        if (!this.isMouseDownD && !this.isMouseDownS) {
          this.cursor = 'default'
        }
      }
      document.onmouseup = (e) => {
        this.mouseUp(e)
      }
    },
    outImg () {
      let canvasOt = document.querySelector('#canvasOt')
      canvasOt.height = this.crop.h / this.scale
      canvasOt.width = this.crop.w / this.scale
      let ctxOt = canvasOt.getContext('2d')
      // 将原尺寸图片按裁剪区域绘制在canvasOt上
      ctxOt.drawImage(this.inImg, (this.crop.x - this.img.x) / this.scale, (this.crop.y - this.img.y) / this.scale, this.crop.w / this.scale, this.crop.h / this.scale, 0, 0, this.crop.w / this.scale, this.crop.h / this.scale)
      try {
        return canvasOt.toDataURL()
      } catch (e) {
        console.log('ImgCrop', e)
      }
    }
  },
  ready () {
    // init canvas
    this.canvasCr = this.$el.querySelector('#canvasCr')
    this.canvasCr.height = this.canvasH
    this.canvasCr.width = this.canvasW
    this.ctxCr = this.canvasCr.getContext('2d')
    let canvasIn = this.$el.querySelector('#canvasIn')
    canvasIn.height = this.canvasH
    canvasIn.width = this.canvasW
    let ctxIn = canvasIn.getContext('2d')
    this.bcr = this.canvasCr.getBoundingClientRect()
    // init data for rendering
    this.img = {
      x: 0,
      y: 0,
      w: this.canvasW,
      h: this.canvasH
    }
    this.crop = {
      x: 100,
      y: 150,
      w: 10,
      h: 70
    }
    this.inImg.src = this.inImgSrc
    this.inImg.onload = () => {
      this.imgJudge()
      ctxIn.drawImage(this.inImg, this.img.x, this.img.y, this.img.w, this.img.h)
      this.initCrop()
    }
  }
}
</script>

<style>
	.img_crop {
		width: 100%;
		height: 100%;
	}
	.img_crop canvas {
    position: absolute;
  }
  #canvasOt {
  	display: none;
  }
</style>