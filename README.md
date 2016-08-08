# ImgCrop

aA image crop component with Vue.js 

## Live Demo

[Nobuyoshi Araki's Yoko]()

## Example code

    <template>
		...
        <img-crop :in-img-src="inImg"
                  :canvas-w="360"
                  :canvas-h="260"
                  :is-ratio="true"
                  :background-color="bgColor"></img-crop>
	      ...
	</template>
	<script>
		import ImgCrop from './components/ImgCrop'
		
		export default {
		  data () {
		    return {
		      inImg: 'someUrl',
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
		      this.$broadcast('img:crop')
		    }
		  },
		  events: {
		    'img:out': function (iUri) {
		      this.otImg = iUri
		    }
		  }
		}
	</script>
### Result image
Trigger crop  using event `img:out` ;
 Get the result data uri of  cropped image using `img:crop`.
## Options

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
	    ratio: {
	      type: Number,
	      default: 1.6
	    }
	 }
	 
### canvasW & canvasH
Size of the canvas  you need.
### inImgSrc
An image for cropping from it.
### backgroundColor
Background color of  canvas when image isn't cover it  totally.
### cropInitR
Width of the crop area when inited.
### cropRatio
Ratio of the crop area when inited.
### isRatio
Whether the ratio of crop area will be changed when it is dragged
