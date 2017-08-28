import { get, getter, dictGetter, field, displayScore, groupAndNumber, scoreCircle, filterMap, termYear, sessionDaysAndTimes, textColorForPercentile } from './common'
import { ServerOffering } from '../model'

const prof = prof => dictGetter(prof, {
  name: field('displayName'),
  score: field('score', displayScore),
  color: field('percentile', textColorForPercentile),
  percentile: field('percentile')
})
const otherText = other => termYear(other) + ' ' + get('sessions', {obj: other, fn: sessionDaysAndTimes}) || 'TBA' + ' ' + filterMap(other.profs, prof).map(p => p.name + ' ' + p.score).join('; ')
const otherOffering = other => {
  console.log('other', other)
  const getter = dictGetter(other, {
    option: field('objectID'),
    text: field('', otherText)
  })
  return getter
}
const otherOfferings = result => {
  const others = filterMap(result.otherOfferings ? [result].concat(result.otherOfferings) : [result], otherOffering)
  console.log(others)
  return others
}

const meets = session => session.days.join(', ') + ' from ' + session.start + '-' + session.end
const sessionString = sessions => sessions.map(s => meets(s)).join('; ')

const sessionBullets = sessions => {
  const dayString = session => {
    const longDays = {M: 'Mondays', Tu: 'Tuesdays', W: 'Wednesdays', Th: 'Thursdays', F: 'Fridays'}
    const days = session.days.map(d => longDays[d])
    if (days.length === 1) return days[0]
    return days.slice(0, days.length - 1).join(', ') + ' and ' + days.slice(-1)[0]
  }
  const meets = session => dayString(session) + ' from ' + session.start + '-' + session.end
  const string = session => get('', {obj: session, fn: meets}) || 'TBA' + ' in ' + get('location/name') || 'TBA'
  if (sessions.length === 0) return ['Meeting time and place TBA.']
  if (sessions.length === 1) return ['Meets on ' + string(sessions[0])]
  else if (sessions.length === 2) return ['First session: ' + string(sessions[0]), 'Second session: ' + string(sessions[1])]
  else return sessions.map((s, i) => `Session {i}: ` + string(s))
}
const paren = inside => `<span class="paren">(${inside})</span>`
const sizeWord = size => size > 100 ? 'Large' : (size > 20 ? 'Medium' : 'Small')
const sizeBullet = size => sizeWord(size) + ' ' + paren(size) + ' lecture course for undergrads and graduate students.'
const sortedReasons = reasons => Object.keys(reasons).map(key => ({reason: key, percent: parseInt(reasons[key])})).sort((a, b) => a.percent < b.percent)
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

const reasonBullet = reasons => {
  const sorted = sortedReasons(reasons)
  if (sorted.length === 1 || sorted[0].percent > (2 * sorted[1])) {
    return 'Usually taken to satisfy a concentration requirement ' + paren('54%') + ' or as an elective ' + paren('38%') + '.'
  }
}
const genEdBullet = genEds => 'Satisifies ' + genEds.slice(0, genEds.length - 1).join(', ') + ' and ' + genEds.slice(-1)[0]

// TODO: Add course highlighting
const prepBullet = prep => prep ? 'Prepare with ' + prep : ''

const bullets = offering => {
  const oGet = getter(offering)
  return [
    ...(oGet('sessions', sessionBullets) || []),
    oGet('topReport/size', sizeBullet),
    oGet('topReport/reasons', reasonBullet),
    oGet('genEds', genEdBullet),
    oGet('recommendedPrep', prepBullet)
  ].filter(bullet => !!bullet)
}

const offeringInfo = result => dictGetter(result, {
  groupAndNumber: field('', groupAndNumber),
  title: field('title'),
  scoreCircle: field('topReport/responses/overall', scoreCircle('size')),
  offerings: field('', otherOfferings),
  description: field('description'),
  bullets: field('', bullets),
  notes: field('notes'),
  termYear: field('', termYear),
  meetingTime: field('sessions', sessionString),
  profs: field('profs', profs => profs.map(prof))
})
export default offeringInfo
