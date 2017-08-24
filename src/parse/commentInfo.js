import { options, dictGetter, field, selectedOption } from './common'

const spanClass = (string, _class) => '<span class=' + _class + '>' + string + '</span>'

const mapComments = (comments, filter) => {
  if (filter === 'All') return comments
  const caseInsensitive = filter === 'TF' ? '' : 'ig'
  const regex = new RegExp('\\w*' + filter + '\\w*', caseInsensitive)
  const sentenceRegex = new RegExp('[^.]*' + filter + '[^.$]*.', caseInsensitive)
  let processed = {}
  for (const key in comments) {
    let comment = comments[key]
    if (regex.exec(comment)) {
      let sentenceMatch = false
      let mapped = ''
      do {
        sentenceMatch = sentenceRegex.exec(comment)
        if (sentenceMatch) {
          var sentence = sentenceMatch[0]
          let matchRe = new RegExp('\\w*' + filter + '\\w*', caseInsensitive)
          var match
          var mappedSentence = ''
          do {
            match = matchRe.exec(sentence)
            if (match) {
              mappedSentence += (sentence.substring(0, match.index) + spanClass('match', match[0]))
              sentence = sentence.substring(match.index + match[0].length, sentence.length)
            } else {
              mappedSentence += sentence
            }
          } while (match)
          mapped += comment.substring(0, sentenceMatch.index) + spanClass('mention', mappedSentence)
          comment = comment.substring(sentenceMatch.index + sentenceMatch[0].length, comment.length)
        } else {
          mapped += comment
        }
      } while (sentenceMatch)
      processed[key] = mapped
    }
  }
  return processed
}

const commentInfo = (result, reportId, comments, filter) => dictGetter(result, {
  selectedReportId: field('topReport/reportId', id => reportId || id),
  options: field('', offering => options(offering, reportId)),
  selectedOption: field('', selectedOption(reportId)),
  comments: field('', _ => mapComments(comments, filter))
})
export default commentInfo
