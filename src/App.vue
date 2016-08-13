<template>
  <div id="app" class="app">
    <div class="cropPanel">   
      <div class="cropPanel-wrap"
           :class="{'cropPanel-wrap-ensure': isCroped, 'cropPanel-wrap-redo': !isCroped}">
        <img-crop :in-img-src="inImg"
                  :canvas-w="360"
                  :canvas-h="260"
                  :is-ratio="true"
                  :background-color="bgColor"></img-crop>
      </div>
    </div>
    <div class="cropPanel-msg">Photo by &nbsp;あらき のぶよし .</div>
    <div class="cropPanel-button-wrap"
       @click="crop">
      <div class="cropPanel-button"
            :class="{'cropPanel-button-active': isCroped}">
        <span>crop<br>redo</span>
      </div> 
    </div>
    <div class="cropPanel-auther">zhao</div>
  </div> 
</template>
 
<script>
import ImgCrop from './components/ImgCrop'

export default {
  data () {
    return {
      inImg: 'http://works.ccsph.com/uploadfiles/images/20130912/0912120535239613.jpg',
      otImg: '',
      bgColor: '#1a1a1a',
      isCroped: false
    }
  },
  components: {
    ImgCrop
  },
  methods: {
    crop () {
      if (!this.isCroped) {
        this.$broadcast('img:crop')
      }
      this.isCroped = !this.isCroped
    }
  },
  events: {
    'img:out': function (iUri) {
      this.otImg = iUri
    }
  }
}
</script>

<style lang="less">
@import './assets/css/index.less';

@animationTime: 1s;
@cropSizeW: 360px;
@cropSizeH: 260px;

@keyframes cropFrame {
  0% {
    height: @cropSizeH;
  }
  50% {
    height: 0;
  }
  100% {
    height: @cropSizeW / 1.6;
  }
}
@keyframes cropFrameR {
  0% {
    height: @cropSizeW / 1.6;
  }
  50% {
    height: 0;
  }
  100% {
    height: @cropSizeH;
  }
}
@keyframes cropOpc {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes cropOpcR {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .1;
  }
  100% {
    opacity: 1;
  }
}

body {
  .re-body;
  position: relative;
  height: ~"calc(100vh - 22px)";
  // min-height: 60vw;
  min-width: 980px;
  margin: 10px 10px;
  border: 1px #aacfd0 solid;
  font-family: 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  color: #1a1a1a;
  background: #e8ecf1;
}
.app {
  position: relative;
  height: 500px;
  top:70px;
  background: #B5CFD8;
}
.cropPanel {
  position: absolute;
  top: 220px;
  left: 0;
  right: 0;
  width: @cropSizeW;
  margin: 0 auto;
  transform: translate3d(0, -50%, 0);
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    width: 100%;
    height: 40px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    background: #fff;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    width: 100%;
    height: 80px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background: #fff;
  }
}
.cropPanel-wrap {
  position: relative;
  height: @cropSizeH;
  overflow: hidden;
}
.img_crop {
   position: absolute;
  top: 0;
  bottom: 0;
  height: @cropSizeH!important;
  margin: auto;
  transition: all @animationTime;
}
#canvasOt {
  display: block!important;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  visibility: hidden;
  transition: visibility 0s @animationTime / 2;
}
.cropPanel-wrap-ensure {
  animation: cropFrame @animationTime both,
             cropOpc @animationTime/2 @animationTime/2;
  #canvasOt {
    visibility: visible;
  }
}
.cropPanel-wrap-redo {
  animation: cropFrameR @animationTime both,
             cropOpcR @animationTime/2 @animationTime/2;
}
.cropPanel-msg {
  position: absolute;
  top: 60px;
  left: 50px;
  font-size: 18px;
}
.cropPanel-button-wrap {
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  width: 75px;
  margin: 0 auto;
  padding: 9px 0;
  border: 1px solid rgba(26, 26, 26, .3);
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  &::before {
    width: 0;
    height: 1px;
    top: -1px;
    left: -1px;
  }
  &::after {
    width: 1px;
    height: 0;
    top: -1px;
    right: -1px;
  }
}
.cropPanel-button-wrap,
.cropPanel-button {
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(26, 26, 26, .6);
    transition: all .5s;
  }
}
.cropPanel-button-wrap:hover {
  &,
  .cropPanel-button {
    &::before {
      width: ~"calc(100% + 2px)";
    }
    &::after {
      height: ~"calc(100% + 2px)";
    }
  }
}
.cropPanel-button {
  height: 17px;
  font-size: 17px;
  line-height: 1;
  overflow: hidden;
  span {
    display: inline-block;
    transition: transform .4s 1.1s;
  }
  &::before {
    width: 0;
    height: 1px;
    bottom: -1px;
    right: -1px;
  }
  &::after {
    width: 1px;
    height: 0;
    bottom: -1px;
    left: -1px;
  }
}
.cropPanel-button-active {
  span {
    transform: translate3d(0, -17px, 0);
  }
}
.cropPanel-auther {
  position: absolute;
  bottom: -36px;
  right: 35px;
  font-size: 28px;
  font-weight: bold;
  writing-mode: vertical-lr;
  color: rgba(26, 26, 26, 0.7);
  cursor: default;
  -webkit-user-select: none;
}
</style>
