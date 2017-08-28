export const parseScore = (score: number) => score.toFixed(1)

const textPercentileColors = ['FF681F', 'FFBC1F', 'EBE639', 'BDEB39', '87D44E', '27CF39']
const percentileColors = ['FF681F', 'FFBC1F', 'F2FF1F', 'DBFF1F', '8BF350', '50F361']
const rangeWidth = arr => 100.0 / (arr.length - 1)
const percentileIndex = (percentile, arr) => Math.floor(percentile / rangeWidth(arr))
const percentileColor = (percentile, arr) => '#' + arr[percentileIndex(percentile, arr)]
export const colorForPercentile = percentile => percentileColor(percentile, percentileColors)
export const textColorForPercentile = percentile => percentileColor(percentile, textPercentileColors)

export const parseTime = (timeNum: number) => {
  let hoursNum = Math.floor(timeNum)
  const minutesNum = Math.round(60 * (timeNum - hoursNum))
  hoursNum = hoursNum > 12 ? hoursNum - 12 : hoursNum
  return minutesNum > 1 ? [hoursNum, minutesNum].map(x => x.toFixed(0)).join(':') : hoursNum.toFixed(0)
}