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
      return sessions.map((session, index) => `Session ${index + 1}: ` + meetsString(session))
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
const sizeBullet = (size: number) => `${sizeAdjective(size)} ${insideParens(size)} lecture course for undergrads and graduate students.`

const sortedReasons = unsorted => {
  const reasonNames = Object.keys(unsorted)
  const reasons = reasonNames.map(name => ({ 
    reason: name, 
    percent: parseInt(unsorted[name])
  }))
  const compareKey = key => (a, b) => {
    if (a[key] > b.percent) return -1 
    if (a[key] === b.percent) return 0
    return 1
  }
  return reasons.sort(compareKey('percent'))
}
const insideSpan = (text: string, _class: string) => `<span class=${_class}>${text}</span>`
const reasonText = {
    'genEd': 'to satisfy a ' + insideSpan('Gen Ed', 'reason'),
    'preMed': 'to satisfy a ' + insideSpan('pre-med requirement', 'reason'),
    'concentration': 'to satisfy a ' + insideSpan('concentration requirement', 'reason'),
    'expos': 'to satisfy the ' + insideSpan('Expos requirement', 'reason'),
    'secondary': 'to satisfy a ' + insideSpan('secondary or language citation requirement', 'reason'),
    'elective': 'as an ' + insideSpan('elective', 'reason'),
    'language': 'to satisfy the ' + insideSpan('language requirement', 'reason')
}
const reasonBullet = (report: Coursica.Report) => {
  const reasons = report.reasons
  const sorted = sortedReasons(reasons)
  const [first, second] = sorted
  const display = reason => `${reasonText[reason.reason]} ${insideParens(reason.percent + '%')}`
  if (!second || first.percent > (2 * second.percent)) {
    return `Usually taken ${display(first)}.`
  }
  return `Usually taken ${display(first)} or ${display(second)}.`
}
const genEdsBullet = (genEds: string[]) => {
  if (genEds.length === 1) {
    return `Satisfies ${genEds[0]}.`
  }
  return `Satisfies ${genEds.slice(0, genEds.length - 1).join(', ')} and ${genEds[genEds.length - 1]}`
}

// TODO: Add course highlighting
const prepBullet = (prep: string) => `Prepare with ${prep}.`

export const bulletInfo = (offering: Coursica.Offering) => {
  const bullets: string[] = []
  const sessions = offering.sessions
  if (sessions) {
    bullets.push(...sessionBullets(sessions))
  }
  const { topReport } = offering
  if (topReport) {
    bullets.push(sizeBullet(topReport.size))
    if (topReport.reasons) {
      bullets.push(reasonBullet(topReport))
    }
  }
  if (offering.genEds) {
    bullets.push(genEdsBullet(offering.genEds))
  }
  if (offering.recommendedPrep) {
    bullets.push(prepBullet(offering.recommendedPrep))
  }
  return bullets
}