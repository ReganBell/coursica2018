import { parseScore, parseTime, colorForPercentile, textColorForPercentile, scoreCircle } from './common'

export const basicInfo = (rawOffering: Coursica.Offering) => {
  const { objectID, title, group, number, termYear } = rawOffering
  const meetsParts = []
  return {
    objectID,
    title,
    groupAndNumber: group + ' ' + number,
    termYear,
    days: rawOffering.sessionString || ''
  }
}

const siblingSelectOption = (sibling: Coursica.Offering | Coursica.OfferingSummary) => {
  const objectID = sibling.objectID
  let text = sibling.termYear
  const profString = (profs: Coursica.Prof[]): string => (profs || []).map(prof => prof.displayName).join(', ')
  const detailString = sessionInfo(sibling.sessions) || profString(sibling.profs || [])
  if (detailString) {
    return { text: text + ' – ' + detailString, objectID }
  }
  return { objectID, text }
}
export const siblingInfo = (offering: Coursica.Offering) => {
  const offerings = [offering, ...(offering.otherOfferings || [])]
  return offerings.map(siblingSelectOption)
}

export const overallCircle = (offering: Coursica.Offering) => {
  try {
    return scoreCircle(offering.topReport.responses.overall)
  } catch (error) {
    return null
  }
}

const parseProf = (prof: Coursica.Prof) => {
  const name = prof.displayName
  const score = prof.score ? { score: parseScore(prof.score) } : {}
  if (prof.percentile) {
    const percentile = prof.percentile
    const color = textColorForPercentile(percentile)
    return { name, ...score, percentile, color }
  }
  return { name, ...score }
}
export const profInfo = (profs: Coursica.Prof[]) => {
  if (profs && profs[0]) {
    return parseProf(profs[0])
  }
  return null
}
export const profsInfo = (profs: Coursica.Prof[]) => {
  if (profs && profs.length > 0) {
    return profs.map(parseProf)
  }
  return null
}


export const timeInfo = (sessions: Coursica.Session[]) => {
  if (sessions && sessions[0] && sessions[0].time) {
    const { start, end } = sessions[0].time
    return [start, end].map(parseTime).join('-')
  }
  return null
}

const sessionString = session => {
  const dayString = session.days.join(', ')
  if (session.time) {
    const { start, end } = session.time
    return dayString + ' from ' + [start, end].map(parseTime).join(' to ')
  } else {
    return dayString + ' at time TBA'
  }
}
export const sessionInfo = (sessions: Coursica.Session[]) => {
  if (!sessions) return null
  return sessions.map(sessionString).join(' and ')
}

export const overallInfo = (rawOffering: Coursica.Offering, key: string) => {
  try {
    const score = parseScore(rawOffering.topReport.responses.overall.score)
    const color = colorForPercentile(rawOffering.topReport.responses.overall.percentiles.size)
    return { score, color }
  } catch (error) {
    return { score: 'N/A', class: 'empty' }
  }
}

export const workloadInfo = (rawOffering: Coursica.Offering) => {
  const color = color => ({ color })
  try {
    const score = parseScore(rawOffering.topReport.responses.workload.score)
    return { score }
  } catch (error) {
    return { score: 'N/A', class: 'empty' }
  }
}

export const sizeInfo = (rawOffering: Coursica.Offering) => {
  const color = color => ({ color })
  try {
    const size = rawOffering.topReport.size
    return { size }
  } catch (error) {
    return { size: 'N/A', class: 'empty' }
  }
}