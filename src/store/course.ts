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
    percentiles: {},
    compareCategory: 'size',
    compareArea: 'overall',
    selectedProf: '',
    percentilePath: '',
    distParams: {}
  },
  actions: {
    fetchComments: ({ state, commit }, reportId) => {
      if (reportId) {
        Fetch.comments(reportId, (comments, err) => {
          if (comments) {
            commit('setComments', comments)
          }
        })
      }
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
      state.comments = comments
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
