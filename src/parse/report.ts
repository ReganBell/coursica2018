import { capitalize, colorForPercentile, parseScore } from './common';

const sizeClass = size => {
  if (size >= 200) return '200+'
  if (size >= 100) return '100-199'
  if (size >= 40) return '40-99'
  if (size >= 20) return '20-39'
  if (size >= 10) return '10-19'
  if (size >= 5) return '6-9'
  return '1-5'
}

export const parseResponse = (tuple: [string, Coursica.Response], category: string) => {
  const [name, response] = tuple
  let { score: scoreNum, percentiles } = response
  const score = parseScore(scoreNum)
  const label = capitalize(name)
  if (percentiles) {
    const percentile = percentiles[category]
    if (percentile) {
      return { label, score, color: colorForPercentile(percentile) }
    }
  }
  return { label, score }
}

export const parseOptions = (offering: Coursica.Offering, selectedReport: Coursica.Report) => {
  const reports = [offering.topReport, ...(offering.reports || [])]
  return reports.map(report => ({
    text: `${report.term} ${report.year.replace('20', "'")}`, 
    option: report.reportId
  }))
}

export const parseCompareCategoryOptions = (report: Coursica.Report, compareArea: string) => {
  let response = report.responses[compareArea]
  console.log(response.percentiles)
  let categories = Object.keys(response.percentiles)
  var options = []
  for (var category in categories) {
    console.log(category)
    if (category === 'all') {
      options.push({value: 'all', text: 'all courses', selected: false})
    } else if(category === 'size') {
      var text = sizeClass(report.size) + " students"
      options.push({value: 'size', text: text, selected: true})
    } else {
      options.push({value: category, text: category, selected: false})
    }
  }
  return options
}
