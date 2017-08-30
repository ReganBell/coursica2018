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
    option: report.reportId,
    selected: report.reportId === selectedReport.reportId
  }))
}

export const categoryDisplay = (category: string, report: Coursica.Report) => {
  switch (category) {
      case 'all':
        return 'all courses'
      case 'size':
        return `${sizeClass(report.size)} students`
      default:
        return category
    }
}

export const parseProfs = (report: Coursica.Report) => {
  if (!report.profs) {
    return null
  }
  return report.profs.map(prof => {
    const { displayName, matchName } = prof
    try {
      const score = prof.responses.instructor.score
      try {
        const percentile = prof.responses.instructor.percentiles.size
        const color = colorForPercentile(percentile)
        return { displayName, matchName, score, percentile, color }
      } catch (_) {
         return { displayName, matchName, score } 
      }
    } catch (_) {
       return { displayName, matchName }
    }
  })
}
