import { capitalize, colorForPercentile, parseScore } from './common';

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

// export const parseProfs = (report: Coursica.Report) => {
//   if (!report.profs) {
//     return null
//   }
//   return report.profs.map(prof => {
//     try {
//       const overall = prof.responses.overall.
//     }
//   })
// }