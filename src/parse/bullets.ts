import { parseTime } from './common'

const parseDays = (session: Coursica.Session) => {
  const longDays = {M: 'Mondays', Tu: 'Tuesdays', W: 'Wednesdays', Th: 'Thursdays', F: 'Fridays'}
  const days = session.days.map(d => longDays[d])
  if (days.length === 1) {
    return days[0]
  }
  return days.slice(0, days.length - 1).join(', ') + ' and ' + days.slice(-1)[0]
}
const dayAndTimeString = (session: Coursica.Session) => {
  const dayString = parseDays(session) 
  if (session.time) {
    const { start, end } = session.time
    return dayString + ' from ' + [start, end].map(parseTime).join('-')
  }
  return dayString
}
const meetsString = (session: Coursica.Session) => {
  if (session.location) {
    return dayAndTimeString(session) + ' in ' + session.location.name
  } else {
    return dayAndTimeString(session)
  }
}
const sessionBullets = (sessions: Coursica.Session[]) => {
  switch (sessions.length) {
    case 0:
      return ['Meeting time and place TBA.']
    case 1:
      const [ session ] = sessions
      return ['Meets on ' + meetsString(session)]
    case 2:
      const [ first, second ] = sessions
      return ['First session: ' + meetsString(first), 'Second session: ' + meetsString(second)]
    default:
      return sessions.map((session, index) => `Session ${index}: ` + meetsString(session))
  }
}
const insideParens = inside => `<span class="paren">(${inside})</span>`
const sizeAdjective = size => {
  if (size > 100) {
    return 'Large'
  } else if (size > 20) {
    return 'Medium'
  } else {
    return 'Small'
  }
}
const sizeBullet = size => `${sizeAdjective(size)} ${insideParens(size)} lecture course for undergrads and graduate students.`
// const sortedReasons = reasons => 
//   Object.keys(reasons).map(key => 
//     ({
//       reason: key,
//       percent: parseInt(reasons[key])})).sort((a, b) => a.percent < b.percent)
// let takenAsWord = function(reason) {
//   let replace =
//   {
//     'Undergraduate Core or General Education Requirement': 'to satisfy a ' + SpanClass('reason', 'Gen Ed'),
//     'Pre-Med Requirement': 'to satisfy a ' + SpanClass('reason', 'pre-med requirement'),
//     'Concentration or Department Requirement': 'to satisfy a ' + SpanClass('reason', 'concentration requirement'),
//     'Expository Writing Requirement': 'to satisfy the ' + SpanClass('reason', 'Expos requirement'),
//     'Secondary Field or Language Citation Requirement': 'to satisfy a ' + SpanClass('reason', 'secondary or language citation requirement'),
//     'Elective': 'as an ' + SpanClass('reason', 'elective'),
//     'Foreign Language Requirement': 'to satisfy the ' + SpanClass('reason', 'language requirement')
//   }
//   return replace[reason];
// };

// const reasonBullet = reasons => {
//   const sorted = sortedReasons(reasons)
//   if (sorted.length === 1 || sorted[0].percent > (2 * sorted[1])) {
//     return 'Usually taken to satisfy a concentration requirement ' + paren('54%') + ' or as an elective ' + paren('38%') + '.'
//   }
// }
const genEdBullet = genEds => 'Satisifies ' + genEds.slice(0, genEds.length - 1).join(', ') + ' and ' + genEds.slice(-1)[0]

// TODO: Add course highlighting
const prepBullet = prep => prep ? 'Prepare with ' + prep : ''

// const bullets = offering => {
//   const oGet = getter(offering)
//   return [
//     ...(oGet('sessions', sessionBullets) || []),
//     oGet('topReport/size', sizeBullet),
//     oGet('topReport/reasons', reasonBullet),
//     oGet('genEds', genEdBullet),
//     oGet('recommendedPrep', prepBullet)
//   ].filter(bullet => !!bullet)
// }
export const bulletInfo = (offering: Coursica.Offering) => {
  const bullets: string[] = []
  const sessions = offering.sessions
  if (sessions) {
    bullets.push(...sessionBullets(sessions))
  }
  return bullets
}