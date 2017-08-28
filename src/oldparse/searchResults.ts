// import { dictGetter, field, groupAndNumber, displayScore, termYear, sessionDaysAndTimes, textColorForPercentile, colorForPercentile } from './common'

// export const parseResult = (offering: Offering) => dictGetter(result, {
//   objectID: field('objectID'),
//   title: field('title'),
//   groupAndNumber: field('', groupAndNumber),
//   termYear: field('', termYear),
//   meets: field('sessions', sessionDaysAndTimes),
//   prof: field('profs/[0]', p => dictGetter(p, {
//     name: field('displayName'),
//     score: field('score', displayScore),
//     color: field('percentile', textColorForPercentile)
//   })),
//   description: field('description'),
//   overall: field('topReport/responses/overall', overall => dictGetter(overall, {
//     score: field('score', displayScore),
//     underlineColor: field('percentiles/size', colorForPercentile)
//   })),
//   workload: field('topReport/responses/workload', workload => dictGetter(workload, {
//     score: field('score', displayScore)
//   })),
//   size: field('topReport/size')
// })
// export default hits => hits.map(parseResult)


