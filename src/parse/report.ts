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