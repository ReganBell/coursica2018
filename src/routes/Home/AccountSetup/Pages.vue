<template>
  <transition :name="transition" mode="out-in">
    <div v-if="page === 1" class="page" key="1">
      Ok, let's get your account set up!<br>
      What should we call you?
      <input 
        type="text" 
        placeholder="Drew Faust" 
        :value="name"
        @input="didTypeName"
        @keyup.enter="submitName">
      </input>
      <div class="submit" @click="submitName">Submit</div>
    </div>
    <div v-if="page === 2" class="page" key="2">
      When are you graduating?
      <selector :selectedOption="gradYear" :options="gradYearOptions" :align="'center'" :width="'200px'" :placeholder="'1636'" :handler="gradYearChanged"></selector>
    </div>
    <div v-else-if="page === 3" class="page" key="3">
      What are you concentrating in?
      <div class="subtitle">Undecided? You can always change this later!</div>
      <selector :selectedOption="concentration" :options="concentrationOptions" :align="'center'" :width="'500px'" :placeholder="'Choose a concentration'" :handler="concentrationChanged"></selector>
    </div>
    <div v-else-if="page === 4" class="page" key="4">
      Which track of your concentration are you doing?
      <div class="subtitle">Undecided? You can always change this later!</div>
      <selector :selectedOption="track" :options="trackOptions" :align="'center'" :width="'500px'" :placeholder="'Choose a track'" :handler="trackChanged"></selector>     
    </div>
    <div v-else-if="page === 5" class="page" key="5">
      Last question!<br>
      Are you doing a secondary field?
      <selector :selectedOption="secondary" :options="secondaryOptions" :align="'center'" :width="'500px'" :placeholder="'Choose a secondary'" :handler="secondaryChanged"></selector>     
    </div>
    <div v-else class="page" key="empty">
    </div>
  </transition>
</template>

<script>

import { mapState } from 'vuex'
import Selector from '@/components/Selector.vue'
import concentrationInfo from '@/api/concentrationInfo'
import secondaries from '@/api/secondaries'

const option = (text, selected) => ({text, selected})
const options = (list, selected) => ['', ...list].map(o => option(o, o === selected))

export default {
  name: 'account-setup-pages',
  components: { Selector },
  props: ['page', 'transition'],
  computed: mapState({
    name: state => state.accountSetup.name,
    gradYear: state => state.accountSetup.gradYear,
    gradYearOptions: state => options(['2017', '2018', '2019', '2020'], state.accountSetup.gradYear),
    concentration: state => state.accountSetup.concentration,
    concentrationOptions: state => options(Object.keys(concentrationInfo).sort(), state.accountSetup.concentration),
    track: state => state.accountSetup.track,
    trackOptions: function (state) {
      console.log('this.track', this.track)
      console.log(concentrationInfo[this.concentration])
      console.log(concentrationInfo[this.concentration].tracks)
      return options(concentrationInfo[this.concentration].tracks, this.track)
    },
    secondary: state => state.accountSetup.secondary,
    secondaryOptions: function (state) { return options(secondaries, this.secondary) },
    email: state => state.accountSetup.email
  }),
  methods: {
    didTypeName (event) {
      this.$store.commit('setName', event.target.value)
    },
    submitName (event) {
      this.$store.dispatch('accountSetupNext')
    },
    gradYearChanged (event) {
      this.$store.commit('setGradYear', event.target.value)
      const dispatch = this.$store.dispatch
      setTimeout(() => dispatch('accountSetupNext'), 300)
    },
    concentrationChanged (event) {
      this.$store.commit('setConcentration', event.target.value)
      const dispatch = this.$store.dispatch
      setTimeout(() => dispatch('accountSetupNext'), 300)
    },
    trackChanged (event) {
      this.$store.commit('setTrack', event.target.value)
      const dispatch = this.$store.dispatch
      setTimeout(() => dispatch('accountSetupNext'), 300)
    },
    secondaryChanged (event) {
      this.$store.commit('setSecondary', event.target.value)
      const dispatch = this.$store.dispatch
      setTimeout(() => dispatch('accountSetupNext'), 300)
    }
  }
}
</script>

<style lang="stylus">

@import '../../../styles/base.styl'

#account-setup    
  .page
    margin-top 42px
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 40vh
        
    font-size 18px
    line-height 22px
    font-weight 400
    
    .submit
      font-weight 600
      color coursica-blue
      margin-top 8vh
      cursor pointer
    
    input
      position relative
      width 100%
      padding-top 20px
      padding-bottom 20px
      margin-top 5vh
      
      border none
      border-bottom solid 1px #EEE
      
      font-weight 600
      font-family Proxima Nova
      font-size 20px
      text-align center
      
      background-color white
      z-index 1
    
    ::-webkit-input-placeholder
      color rgba(0, 0, 0, 0.27)
      
    input:focus
      outline none
      background-color #FAFAFA
    
    .subtitle
      margin-top 10px
      margin-bottom 15px
      font-size 14px
      color #B9B9B9
      width 176px

    .selector
      .label
        font-weight 400
    
</style>
