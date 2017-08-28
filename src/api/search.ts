import algolia from 'algoliasearch'

const client = algolia('D86FK05FUD', 'b37975aed88941720cb0e87cbc90201d')
const index = client.initIndex('offerings')

export default {
  getShoppingListCourses (courseIds) {
    return new Promise((resolve, reject) => {
      index.getObjects(courseIds, (error, content) => {
        if (error) {
          reject(error)
        }
        resolve(content.results)
      })
    })
  }
}
