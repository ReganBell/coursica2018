import algolia from 'algoliasearch'

const client = algolia('D86FK05FUD', 'b37975aed88941720cb0e87cbc90201d')
const index = client.initIndex('offerings')

export default {
  search (query, options) {
    return new Promise((resolve, reject) => {
      index.search({ query, ...options }, (error, content) => {
        if (error) {
          reject(error)
        }
        resolve(content.hits)
      })
    })
  }
}
