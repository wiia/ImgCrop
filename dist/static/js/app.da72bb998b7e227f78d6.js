webpackJsonp([1,0],[function(t,i,s){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var c=s(9),h=o(c),r=s(7),e=o(r);new h["default"]({el:"body",components:{App:e["default"]}})},function(t,i,s){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(i,"__esModule",{value:!0});var c=s(8),h=o(c);i["default"]={data:function(){return{inImg:"http://works.ccsph.com/uploadfiles/images/20130912/0912120535239613.jpg",otImg:"",bgColor:"#1a1a1a",isCroped:!1}},components:{ImgCrop:h["default"]},methods:{crop:function(){this.isCroped||this.$broadcast("img:crop"),this.isCroped=!this.isCroped}},events:{"img:out":function(t){this.otImg=t}}}},function(t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i["default"]={data:function(){return{canvasCr:null,ctxCr:null,bcr:null,img:{},crop:{},inImg:new window.Image,isMouseDownS:!1,isMouseDownD:!1,isMouseOverS:!1,isMouseOverD:!1,mouseDragCurX:0,mouseDragCurY:0,scale:1,cursor:""}},props:{canvasW:{type:Number,"default":360},canvasH:{type:Number,"default":360},inImgSrc:String,backgroundColor:{type:String,"default":"#000"},cropInitR:{type:Number,"default":1.5},isRatio:{type:Boolean,"default":!1},cropRatio:{type:Number,"default":1.6}},events:{"img:crop":function(){var t=this.outImg();this.$dispatch("img:out",t)}},methods:{w2cX:function(t){return t-this.bcr.left},w2cY:function(t){return t-this.bcr.top},imgJudge:function(){var t=this.inImg.width/this.inImg.height,i=this.canvasW/this.canvasH;t>=i?(this.img.h=this.img.w/t,this.img.y=(this.canvasH-this.img.h)/2):(this.img.w=this.img.h*t,this.img.x=(this.canvasW-this.img.w)/2),this.crop.w=this.img.w/this.cropInitR,this.crop.h=this.crop.w/this.cropRatio,this.crop.x=this.img.x+this.img.w/2-this.crop.w/2,this.crop.y=this.img.y+this.img.h/2-this.crop.h/2,this.scale=this.img.h/this.inImg.height},mouseDown:function(t){t.preventDefault(),this.isMouseOverD?(this.isMouseDownD=!0,this.mouseDragCurX=this.w2cX(t.clientX),this.mouseDragCurY=this.w2cX(t.clientY)):this.isMouseOverS&&(this.isMouseDownS=!0)},mouseMove:function(t){if(t.preventDefault(),!this.isMouseDownD&&!this.isMouseDownS){var i=this.w2cX(t.clientX)<=this.crop.x+this.crop.w&&this.w2cX(t.clientX)>=this.crop.x&&this.w2cY(t.clientY)<=this.crop.y+this.crop.h&&this.w2cY(t.clientY)>=this.crop.y;i?(this.cursor="move",this.isMouseOverD=!0):this.ctxCr.isPointInPath(this.w2cX(t.clientX),this.w2cY(t.clientY))?(this.cursor="nwse-resize",this.isMouseOverS=!0):(this.cursor="default",this.isMouseOverD=!1,this.isMouseOverS=!1)}if(this.isMouseDownD){var s=this.w2cX(t.clientX)-this.mouseDragCurX,o=this.w2cX(t.clientY)-this.mouseDragCurY,c=this.crop.x+s<this.img.x||this.crop.y+o<this.img.y||this.crop.x+s+this.crop.w>this.img.x+this.img.w||this.crop.y+o+this.crop.h>this.img.y+this.img.h;c||(this.mouseDragCurX=this.w2cX(t.clientX),this.mouseDragCurY=this.w2cX(t.clientY),this.crop.x=this.crop.x+s,this.crop.y=this.crop.y+o,this.initCrop())}else if(this.isMouseDownS){var h=(this.w2cX(t.clientX)-this.crop.x)/(this.w2cY(t.clientY)-this.crop.y),r=void 0;this.isRatio?h>=this.cropRatio?(r=this.crop.x+(this.w2cY(t.clientY)-this.crop.y)*this.cropRatio<this.crop.x||this.crop.x+(this.w2cY(t.clientY)-this.crop.y)*this.cropRatio>this.img.x+this.img.w||this.w2cY(t.clientY)<this.crop.y||this.w2cY(t.clientY)>this.img.y+this.img.h,r||(this.crop.h=this.w2cY(t.clientY)-this.crop.y,this.crop.w=this.crop.h*this.cropRatio,this.initCrop())):(r=this.w2cX(t.clientX)<this.crop.x||this.w2cX(t.clientX)>this.img.x+this.img.w||this.crop.y+(this.w2cX(t.clientX)-this.crop.x)/this.cropRatio<this.crop.y||this.crop.y+(this.w2cX(t.clientX)-this.crop.x)/this.cropRatio>this.img.y+this.img.h,r||(this.crop.w=this.w2cX(t.clientX)-this.crop.x,this.crop.h=this.crop.w/this.cropRatio,this.initCrop())):(r=this.w2cX(t.clientX)<this.crop.x||this.w2cX(t.clientX)>this.img.x+this.img.w||this.w2cY(t.clientY)<this.crop.y||this.w2cY(t.clientY)>this.img.y+this.img.h,r||(this.crop.w=this.w2cX(t.clientX)-this.crop.x,this.crop.h=this.w2cY(t.clientY)-this.crop.y,this.initCrop()))}},mouseUp:function(t){t.preventDefault(),this.isMouseDownD?this.isMouseDownD=!1:this.isMouseDownS&&(this.isMouseDownS=!1)},mouseOver:function(t){t.preventDefault();var i=this.w2cX(t.clientX)<=this.crop.x+this.crop.w&&this.w2cX(t.clientX)>=this.crop.x&&this.w2cY(t.clientY)<=this.crop.y+this.crop.h&&this.w2cY(t.clientY)>=this.crop.y;i?this.cursor="move":this.ctxCr.isPointInPath(this.w2cX(t.clientX),this.w2cY(t.clientY))?this.cursor="nwse-resize":this.cursor="default"},initCrop:function(){var t=this;this.ctxCr.clearRect(0,0,this.canvasW,this.canvasH),this.ctxCr.beginPath(),this.ctxCr.moveTo(this.img.x,this.img.y),this.ctxCr.lineTo(this.img.x+this.img.w,this.img.y),this.ctxCr.lineTo(this.img.x+this.img.w,this.img.y+this.img.h),this.ctxCr.lineTo(this.img.x,this.img.y+this.img.h),this.ctxCr.lineTo(this.img.x,this.img.y),this.ctxCr.moveTo(this.crop.x,this.crop.y),this.ctxCr.lineTo(this.crop.x,this.crop.y+this.crop.h),this.ctxCr.lineTo(this.crop.x+this.crop.w,this.crop.y+this.crop.h),this.ctxCr.lineTo(this.crop.x+this.crop.w,this.crop.y),this.ctxCr.lineTo(this.crop.x,this.crop.y),this.ctxCr.closePath(),this.ctxCr.fillStyle="rgba(255,255,255,.5)",this.ctxCr.fill(),this.ctxCr.strokeStyle="#e8ecf1",this.ctxCr.beginPath(),this.ctxCr.rect(this.crop.x,this.crop.y,this.crop.w,this.crop.h),this.ctxCr.stroke(),this.ctxCr.beginPath(),this.ctxCr.arc(this.crop.x+this.crop.w+3,this.crop.y+this.crop.h+3,4,0,180),this.ctxCr.stroke(),this.canvasCr.onmousedown=function(i){t.mouseDown(i)},this.canvasCr.onmousemove=function(i){t.mouseMove(i)},this.canvasCr.onmouseout=function(i){i.preventDefault(),t.isMouseDownD||t.isMouseDownS||(t.cursor="default")},document.onmouseup=function(i){t.mouseUp(i)}},outImg:function(){var t=document.querySelector("#canvasOt");t.height=this.crop.h/this.scale,t.width=this.crop.w/this.scale;var i=t.getContext("2d");i.drawImage(this.inImg,(this.crop.x-this.img.x)/this.scale,(this.crop.y-this.img.y)/this.scale,this.crop.w/this.scale,this.crop.h/this.scale,0,0,this.crop.w/this.scale,this.crop.h/this.scale);try{return t.toDataURL()}catch(s){console.log("ImgCrop",s)}}},ready:function(){var t=this;this.canvasCr=this.$el.querySelector("#canvasCr"),this.canvasCr.height=this.canvasH,this.canvasCr.width=this.canvasW,this.ctxCr=this.canvasCr.getContext("2d");var i=this.$el.querySelector("#canvasIn");i.height=this.canvasH,i.width=this.canvasW;var s=i.getContext("2d");this.bcr=this.canvasCr.getBoundingClientRect(),this.img={x:0,y:0,w:this.canvasW,h:this.canvasH},this.crop={x:100,y:150,w:10,h:70},this.inImg.src=this.inImgSrc,this.inImg.onload=function(){t.imgJudge(),s.drawImage(t.inImg,t.img.x,t.img.y,t.img.w,t.img.h),t.initCrop()}}}},function(t,i){},function(t,i){},function(t,i){t.exports=" <div id=app class=app> <div class=cropPanel> <div class=cropPanel-wrap :class=\"{'cropPanel-wrap-ensure': isCroped, 'cropPanel-wrap-redo': !isCroped}\"> <img-crop :in-img-src=inImg :canvas-w=360 :canvas-h=260 :is-ratio=true :background-color=bgColor></img-crop> </div> </div> <div class=cropPanel-msg>Photo by &nbsp;あらき のぶよし .</div> <div class=cropPanel-button-wrap @click=crop> <div class=cropPanel-button :class=\"{'cropPanel-button-active': isCroped}\"> <span>crop<br>redo</span> </div> </div> <div class=cropPanel-auther>zhao</div> </div> "},function(t,i){t.exports=' <div class=img_crop :style="{background: backgroundColor}"> <canvas id=canvasIn></canvas> <canvas id=canvasCr :style="{cursor: cursor}"></canvas> <canvas id=canvasOt></canvas> </div> '},function(t,i,s){var o,c;s(3),o=s(1),c=s(5),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),c&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=c)},function(t,i,s){var o,c;s(4),o=s(2),c=s(6),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),c&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=c)}]);
//# sourceMappingURL=app.da72bb998b7e227f78d6.js.map