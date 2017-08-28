import Fetch from '../api/fetch'
import { persist, load } from './persist'
// import Parse from '@/parse'
import Vue from 'vue'
// import { selectedReport, get } from '@/parse/common'

// const updateBreakdown = state => {
//   let { compareArea, compareCategory, compareProf, offering, selectedReportId } = state
//   const breakdown = Parse.breakdown(offering, selectedReportId, compareArea, compareCategory, compareProf)
//   Vue.set(state, 'breakdown', breakdown)
//   persist({ breakdown })
// }

export default {
  state: {
    offeringInfo: load('offeringInfo') || {},
    offering: load('offering') || {},
    breakdown: load('breakdown') || {},
    comments: load('comments') || {},
    commentsReportId: load('commentsReportId') || '',
    commentInfo: load('commentInfo') || {},
    selectedReportId: load('selectedReportId') || '',
    percentiles: {},
    compareCategory: 'size',
    compareArea: 'overall',
    compareProf: null,
    percentilePath: '',
    distParams: {}
  },
  actions: {
    fetchComments: ({ state, commit }) => {
      commit('setCommentsReportId', state.selectedReportId)
      Fetch.comments(state.selectedReportId || '100', (comments, err) => {
        commit('setComments', comments)
      })
    },
    setSelectedReportId ({commit, dispatch, state}, reportId) {
      // commit('setSelectedReportId', reportId)
      // const percentiles = get('responses/' + state.compareArea + '/percentiles', {obj: selectedReport(reportId, state.offering)})
      // if (!percentiles) commit('setCompareCategory', null)
      // if (!percentiles[state.compareCategory]) commit('setCompareCategory', Object.keys(percentiles)[0])
      // if (state.commentsReportId !== reportId) {
      //   commit('setComments', {})
      //   dispatch('fetchComments')
      // }
    }
  },
  getters: {
    selectedOffering: state => state.offering,
    selectedReport: state => {
      const offering = state.offering as Coursica.Offering
      if (!offering) {
        return null
      }
      const { topReport, reports } = offering
      if (state.selectedReportId && reports) {
        const selected = reports.filter(report => report.reportId === state.selectedReportId)[0]
        if (!selected) {
          console.log('Could not find report matching the selected reportId', state.selectedReportId, 'in', reports)
          return topReport
        }
        return selected
      }
      return topReport
    }
  },
  mutations: {
    setCommentsReportId (state, reportId) {
      state.commentsReportId = reportId
    },
    setOffering (state, offering) {
      state.offering = offering
      // const offeringInfo = Parse.offeringInfo(offering)
      // state.offering = offering
      // if (offering.topReport) state.selectedReportId = offering.topReport.reportId
      // updateBreakdown(state)
      // state.offeringInfo = offeringInfo
      persist({ offering })
    },
    setComments (state, comments, reportId) {
      let {offering, selectedReportId} = state
      comments = comments || {}
      state.comments = comments
      // const commentInfo = Parse.commentInfo(offering, selectedReportId, comments)
      // Vue.set(state, 'commentInfo', commentInfo)
      // persist({ commentInfo })
    },
    setSelectedReportId (state, selectedReportId) {
      state.selectedReportId = selectedReportId
      // updateBreakdown(state)
    },
    setCompareCategory (state, category) {
      state.compareCategory = category
      // updateBreakdown(state)
    },
    setCompareArea (state, area) {
      state.compareArea = area
      // updateBreakdown(state)
    },
    setPercentilePath (state, path) {
      state.percentilePath = path
    }
  }
}
