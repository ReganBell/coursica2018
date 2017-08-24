import Firebase from 'firebase'

const ref = uri => Firebase.database().ref('v10/' + uri)
const sizeClass = report => {
  let size = parseInt(report.size)
  if (size > 200) return '200+'
  if (size > 100) return '100-200'
  if (size > 40) return '40-100'
  if (size > 20) return '20-40'
  if (size > 10) return '10-20'
  if (size > 5) return '5-10'
  return '1-5'
}

export default {
  report: (id, callback) => { ref('reports').child(id).on('value', snap => { callback(snap.val(), null) }) },
  percentiles: ({ offering, breakdown, compareCategory, prof }, callback) => {
    const fetch = pathComps => {
      ref('percentiles/' + pathComps.join('/')).on('value', snap => {
        callback(snap.val(), null)
      })
    }
    const report = offering.reports.find(r => r.reportId === breakdown.selectedReportId)
    const categoryPath = cat => {
      if (cat === 'group') return ['byGroup', report.group]
      if (cat === 'size') return ['bySize', sizeClass(report)]
      return ['byGroup', 'all']
    }
    const path = [prof ? 'profs' : 'offerings', report.term + '_' + report.year, ...categoryPath(compareCategory)]
    fetch(path)
    return path.join('/')
  },
  comments: (reportId, callback) => {
    ref('comments/' + reportId).on('value', snap => {
      callback(snap.val(), null)
    })
  }
}
