import { get, dictGetter, field, scoreCircle, filterMap, selectedReport, termYear, colorForPercentile, displayScore, options } from './common'
import Bars from './bars'

const responseRow = (response, label, category) => dictGetter(response, {
  label,
  score: field('score', displayScore),
  color: field('percentiles/' + category, colorForPercentile)
})
const responseRows = category => responses => {
  // const labels = ['Assignments', 'Feedback', 'Materials', 'Recommend', 'Section']
  const labels = ['Assignments', 'Materials', 'Recommend', 'Section']
  return filterMap(labels, label => responseRow(responses[label.toLowerCase()], label, category))
}
const sizeClass = report => {
  let size = parseInt(report.size)
  if (size > 200) return '200 or more'
  if (size > 100) return 'between 100 and 200'
  if (size > 40) return 'between 40 and 100'
  if (size > 20) return 'between 20 and 40'
  if (size > 10) return 'between 10 and 20'
  if (size > 5) return 'between 5 and 10'
  return 'five or fewer'
}
const preUnderline = area => {
  if (area === 'workload') return 'Voted tougher than'
  if (area === 'overall') return 'Voted better overall than'
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)
  return capitalize(area) + ' rated better than'
}
const postUnderline = category => {
  if (category === 'size') return 'of courses with'
  if (category === 'all') return 'of'
  if (category === 'similar') return 'of'
  return 'of courses in'
}
const compareOptionText = (category, report) => {
  if (category === 'size') return sizeClass(report) + ' students'
  if (category === 'all') return 'all courses'
  if (category === 'similar') return 'similar courses'
  return category
}
const compare = (area, category, prof) => report => {
  const beforeUnderline = preUnderline(area)
  const percentiles = get('responses/' + area + '/percentiles', {obj: report})
  if (!percentiles) return null
  category = percentiles[category] ? category : Object.keys(percentiles)[0]
  const percentile = percentiles[category]
  const afterUnderline = postUnderline(category)
  return {
    options: Object.keys(percentiles).map(cat => ({option: cat, text: compareOptionText(cat, report), selected: cat === category})),
    text: { beforeUnderline, afterUnderline, percentile },
    underlineColor: colorForPercentile(percentile),
    selectedOption: compareOptionText(category, report)
  }
}
const mapProfs = compareCategory => profs => profs.map(prof => dictGetter(prof, {
  displayName: field('displayName'),
  matchName: field('matchName'),
  score: field('responses/instructor/score', displayScore),
  color: field('responses/instructor/percentiles/' + compareCategory, colorForPercentile)
}))

const breakdown = (result, reportId, compareArea, compareCategory, prof, bars) => {
  const report = selectedReport(reportId, result)
  if (!report) return {}
  let dict = dictGetter(report, {
    selectedReportId: field('reportId'),
    overallCircle: field('responses/overall', scoreCircle(compareCategory)),
    workloadCircle: field('responses/workload', scoreCircle(compareCategory)),
    responseRows: field('responses', responseRows(compareCategory)),
    selectedOption: field('', termYear),
    profs: field('profs', mapProfs(compareCategory)),
    compare: field('', compare(compareArea, compareCategory, prof))
  })
  dict.bars = Bars(report, prof, compareCategory, compareArea)
  dict.options = options(result, reportId)
  return dict
}
export default breakdown
