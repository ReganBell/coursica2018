import distParams from '../../static/commonDistributions.json'
import { get, colorForPercentile } from './common'

const sizeClass = size => {
  if (size >= 200) return '200+'
  if (size >= 100) return '100-199'
  if (size >= 40) return '40-99'
  if (size >= 20) return '20-39'
  if (size >= 10) return '10-19'
  if (size >= 5) return '6-9'
  return '1-5'
}

export default (report, prof, compareCategory, compareArea) => {
  console.log('Bars', { report, prof, compareCategory, compareArea })
  const color = get('responses/' + compareArea + '/percentiles/' + compareCategory, {obj: report, fn: colorForPercentile}) || 'lightGray'
  const score = parseFloat(get('responses/' + compareArea + '/score', {obj: report}) || '-1')
  const barsCategory = compareCategory === 'similar' ? 'size' : compareCategory
  let {a, b, loc, scale} = distParams[compareArea][barsCategory === 'size' ? sizeClass(report.size) : barsCategory]
  a = parseFloat(a)
  b = parseFloat(b)
  loc = parseFloat(loc)
  scale = parseFloat(scale)

  const standardNormalPDF = x => Math.exp(-0.5 * (x * x)) / Math.sqrt(2 * Math.PI)
  const johnsonSUPDF = (x, a, b) => b / Math.sqrt(x * x + 1) * standardNormalPDF(a + b * Math.log(x + Math.sqrt(x * x + 1)))
  const johnson = (x, a, b, loc, scale) => (1 / scale) * johnsonSUPDF((x - loc) / scale, a, b)
  const [fifth, ninetyFifth] = compareArea === 'workload' ? [1.0, 5.0] : [2.56, 5.0]
  const steps = 60.0
  const stepSize = (ninetyFifth - fifth) / steps
  let ys = []
  let colorIndex = -1
  for (var i = 0; i < steps; i++) {
    const x = fifth + stepSize * i
    if (score > x && score < x + stepSize) colorIndex = i
    ys[i] = johnson(x, a, b, loc, scale)
  }
  const tallest = Math.max(Math.max.apply(null, ys), 1)
  const heights = ys.map(y => 100.0 * y / tallest)
  const hashCode = str => parseFloat(str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0))
  let seed = hashCode(compareCategory + compareArea)
  const randSeed = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
  const randAdjustment = adjFrac => (1 - adjFrac) + (randSeed() * (adjFrac * 2))
  const randAdjusted = heights.map(h => h * randAdjustment(0.15))
  const sum = randAdjusted.reduce((acc, val) => acc + val, 0.0)
  const final = randAdjusted.map(h => h * (2430.0 / sum))
  return final.map((height, i) => ({ height: height.toFixed(1) + '%', 'background-color': i === colorIndex ? color : '#F5F5F5' }))
}

// to-do: smooth distribution by calculating mean, kurtosis, etc. then getting function to approximate distribution with
