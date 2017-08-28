// export const get = (keyPath, {obj, fn}) => {
//   const paths = keyPath.split('/').filter(p => p.length > 0)
//   const key = paths.length > 0 ? paths[0] : undefined
//   const rest = paths.slice(1, paths.length).join('/')
//   if (!key) {
//     return fn ? fn(obj) : obj
//   } else if (key === '[]') {
//     return obj.map(x => get(rest, {obj: x, fn: fn}))
//   } else if (key[0] === '[') {
//     const index = parseInt(key.slice(1, -1))
//     return obj.length > index ? get(rest, {obj: obj[index], fn: fn}) : undefined
//   } else if (key in obj) {
//     return get(rest, {obj: obj[key], fn: fn})
//   }
// }
// export const getter = obj => (keyPath, fn) => get(keyPath, {obj, fn})
// export const field = (keyPath, fn) => ({'dictField': true, keyPath, fn})
// export const dictGetter = (obj, dict) => {
//   if (!obj) return undefined
//   let newObj = {}
//   for (const key in dict) {
//     const field = dict[key].dictField ? dict[key] : undefined
//     const value = field ? get(field.keyPath, {fn: field.fn, obj}) : dict[key]
//     if (value) newObj[key] = value
//   }
//   return newObj
// }

// const profString = profs => profs ? '; ' + profs.map(prof => prof.displayName.split(' '[1])).join(', ') : ''
// const optionText = report => termYear(report) + (report.profs ? profString(report.profs) : '')
// const option = selectedId => report => ({text: optionText(report), option: report.reportId, selected: report.reportId === selectedId})
// export const options = (result, reportId) => {
//   const reports = (result.topReport ? [result.topReport] : []).concat(result.reports ? result.reports : [])
//   const options = reports.map(option(reportId))
//   return options.length ? options : null
// }
// export const selectedReport = (reportId, obj) => {
//   if (reportId) {
//     if (get('topReport/reportId', {obj}) === reportId) return obj.topReport
//     if (obj.reports) return (get('reports', {obj}) || []).find(r => r.reportId === reportId)
//   }
//   return get('topReport', {obj})
// }
// export const selectedOption = reportId => offering => selectedReport(reportId, offering) ? termYear(selectedReport(reportId, offering)) : null

// export const groupAndNumber = result => result.group + ' ' + result.number

// const textPercentileColors = ['FF681F', 'FFBC1F', 'EBE639', 'BDEB39', '87D44E', '27CF39']
// const percentileColors = ['FF681F', 'FFBC1F', 'F2FF1F', 'DBFF1F', '8BF350', '50F361']
// const percentileIndex = (percentile, arr) => Math.ceil((arr.length) * (percentile / 100.0)) - 1
// const percentileColor = (percentile, arr) => '#' + arr[percentileIndex(percentile, arr)]

// export const colorForPercentile = percentile => percentileColor(percentile, percentileColors)

// export const textColorForPercentile = percentile => percentileColor(percentile, textPercentileColors)

// export const displayScore = score => parseFloat(score).toFixed(1)

// export const scoreCircle = compareArea => response => dictGetter(response, {
//   score: field('score', displayScore),
//   percentile: field('percentile'),
//   color: field('percentiles/' + (compareArea || 'size'), colorForPercentile)
// })

// export const filterMap = (arr, fn) => arr.reduce((acc, val) => fn(val) ? acc.concat([fn(val)]) : acc, [])

// export const termYear = offering => {
//   const display = (term, year) => term + ' ' + year.replace('20', "'")
//   return offering.likelyTerm ? 'Likely ' + display(offering.likelyTerm, offering.likelyYear) : display(offering.term, offering.year)
// }

// export const sessionDaysAndTimes = sessions => sessions.map(s => s.days.join(', ') + ' ' + s.start + '-' + s.end).join('; ')

// export const topReport = offering => offering.reports && offering.topReport ? offering.reports.find(r => r.reportId === offering.topReport.reportId) : undefined
