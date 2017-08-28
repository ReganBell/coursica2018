<template>
  <div @click="clicked" class="score-circle-container" :style="containerStyle">
    <div class="score-circle-inner" :style="innerCircleStyle">
      <div class="score" :style="{'font-size': scoreSize, 'color': textColor}">{{ score }}</div>
      <div class="label" :style="{'font-size': labelSize}">{{ label }}</div>
    </div>
    <svg class="score-circle-bar"
         :width="diameter"
         :height="diameter"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient :id="'radial-gradient' + _uid"
                        :fx="gradient.fx"
                        :fy="gradient.fy"
                        :cx="gradient.cx"
                        :cy="gradient.cy"
                        :r="gradient.r">
          <stop offset="30%" :stop-color="startColor"/>
          <stop offset="100%" :stop-color="stopColor"/>
        </radialGradient>
      </defs>
      <circle :r="innerCircleRadius"
              :cx="radius"
              :cy="radius"
              fill="transparent"
              :stroke="innerStrokeColor"
              :stroke-dasharray="circumference"
              stroke-dashoffset="0"
              stroke-linecap="round"
              :style="strokeStyle"></circle>
      <circle :transform="'rotate(-90, ' + radius + ',' + radius + ')'"
              :r="innerCircleRadius"
              :cx="radius"
              :cy="radius"
              fill="transparent"
              :stroke="'url(#radial-gradient' + _uid + ')'"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference"
              stroke-linecap="round"
              :style="progressStyle"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    diameter: {default: 82},
    labelSize: {default: '12px'},
    scoreSize: {default: '24px'},
    maxScore: {default: 5.0},
    score: {default: 4.2},
    label: {default: 'Overall'},
    color: {default: 'lightGray'},
    textColor: {default: 'black'},
    strokeWidth: {default: 4},
    animateSpeed: {default: 1000},
    innerStrokeColor: {default: '#F4F4F4'},
    fps: {default: 60},
    timingFunc: {default: 'ease-in-out'}
  },
  data () {
    return {
      gradient: {fx: 0.99, fy: 0.5, cx: 0.5, cy: 0.5, r: 0.65},
      gradientAnimation: null,
      currentAngle: 0,
      strokeDashoffset: 0
    }
  },
  computed: {
    radius () {
      return this.diameter / 2
    },
    startColor () {
      return this.color
    },
    stopColor () {
      return this.color
    },
    circumference () {
      return Math.PI * this.innerCircleDiameter
    },
    stepSize () {
      if (this.maxScore === 0) {
        return 0
      }
      return 100 / this.maxScore
    },
    finishedPercentage () {
      return this.stepSize * this.score
    },
    circleSlice () {
      return 2 * Math.PI / this.maxScore
    },
    animateSlice () {
      return this.circleSlice / this.totalPoints
    },
    innerCircleDiameter () {
      return this.diameter - (this.strokeWidth * 2)
    },
    innerCircleRadius () {
      return this.innerCircleDiameter / 2
    },
    totalPoints () {
      return this.animateSpeed / this.animationIncrements
    },
    animationIncrements () {
      return 1000 / this.fps
    },
    hasGradient () {
      return this.startColor !== this.stopColor
    },
    containerStyle () {
      return {
        height: `${this.diameter}px`,
        width: `${this.diameter}px`
      }
    },
    progressStyle () {
      return {
        height: `${this.diameter}px`,
        width: `${this.diameter}px`,
        strokeWidth: `${this.strokeWidth}px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: `stroke-dashoffset ${this.animateSpeed}ms ${this.timingFunc}`
      }
    },
    strokeStyle () {
      return {
        height: `${this.diameter}px`,
        width: `${this.diameter}px`,
        strokeWidth: `${this.strokeWidth}px`
      }
    },
    innerCircleStyle () {
      return {
        width: `${this.innerCircleDiameter}px`
      }
    }
  },
  methods: {
    clicked() {
      this.$emit('click')
    },
    getStopPointsOfCircle (steps) {
      const points = []
      for (let i = 0; i < steps; i++) {
        const angle = this.circleSlice * i
        points.push(this.getPointOfCircle(angle))
      }
      return points
    },
    getPointOfCircle (angle) {
      const radius = 0.5
      const x = radius + (radius * Math.cos(angle))
      const y = radius + (radius * Math.sin(angle))
      return { x, y }
    },
    gotoPoint () {
      const point = this.getPointOfCircle(this.currentAngle)
      this.gradient.fx = point.x
      this.gradient.fy = point.y
    },
    changeProgress ({ isAnimate = true }) {
      const score = this.score === 'N/A' ? 0 : this.score
      const finishedPercentage = this.score === 'N/A' ? 0 : this.finishedPercentage
      this.strokeDashoffset = ((100 - finishedPercentage) / 100) * this.circumference
      if (this.gradientAnimation) {
        clearInterval(this.gradientAnimation)
      }
      if (!isAnimate) {
        this.gotoNextStep(score)
        return
      }
      const angleOffset = (score - 1) * this.circleSlice
      let i = (this.currentAngle - angleOffset) / this.animateSlice
      const incrementer = Math.abs(i - this.totalPoints) / this.totalPoints
      const isMoveForward = i < this.totalPoints
      this.gradientAnimation = setInterval(() => {
        if (isMoveForward && i >= this.totalPoints ||
            !isMoveForward && i < this.totalPoints) {
          clearInterval(this.gradientAnimation)
          return
        }
        this.currentAngle = angleOffset + (this.animateSlice * i)
        this.gotoPoint()
        i += isMoveForward ? incrementer : -incrementer
      }, this.animationIncrements)
    },
    gotoNextStep (score) {
      this.currentAngle = score * this.circleSlice
      this.gotoPoint()
    }
  },
  watch: {
    maxScore () {
      this.changeProgress({ isAnimate: true })
    },
    score () {
      this.changeProgress({ isAnimate: true })
    },
    diameter () {
      this.changeProgress({ isAnimate: true })
    },
    strokeWidth () {
      this.changeProgress({ isAnimate: true })
    }
  },
  created () {
    this.changeProgress({ isAnimate: true })
  }
}
</script>

<style lang="stylus">

.score-circle-container
  position relative

.score-circle-container:hover
  cursor pointer
  
.score-circle-inner 
  position absolute
  top 0 
  right 0 
  bottom 0 
  left 0
  position absolute
  border-radius 50%
  margin 0 auto
  display flex
  flex-direction column
  align-items center
  justify-content center
  
  font-weight 600
  
  .label
    color #B9B9B9
    text-align center
    width 80%
  
  .score
    color black

</style>
