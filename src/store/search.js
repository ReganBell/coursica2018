import router from '@/router'
import Search from '@/api/search'
import FakeData from './fakeData'
import Parse from '@/parse'
import { load, persist } from './persist'

export default {
  state: {
    text: '',
    filters: {
      term: null,
      level: null,
      type: null,
      genEd: null,
      time: null
    },
    results: load('searchResults') || [],
    offerings: load('offerings') || {}
  },
  actions: {
    setSearchText: (context, searchText) => { context.commit('setSearchText', searchText) },
    submitSearch: (context) => {
      router.push({
        query: {
          q: context.state.text
        }
      })
      const updateResults = hits => {
        let offerings = {}
        hits.forEach(hit => { offerings[hit.objectID] = hit })
        context.commit('setOfferings', offerings)
        const results = Parse.searchResults(hits)
        console.log(results)
        context.commit('setSearchResults', results)
      }
      const filters = 'term:Fall'
      Search.search(context.state.text, { filters }).then(updateResults).catch(err => {
        console.error(err)
        updateResults(FakeData.fakeSearchResults)
      })
    },
    selectOffering: ({ commit, state }, offering) => { commit('setOffering', offering) }
  },
  mutations: {
    setSearchText: (state, searchText) => { state.text = searchText },
    setSearchResults: (state, searchResults) => {
      state.results = searchResults
      persist({ searchResults })
    },
    setOfferings: (state, offerings) => {
      state.offerings = offerings
      persist({ offerings })
    }
  }
}
