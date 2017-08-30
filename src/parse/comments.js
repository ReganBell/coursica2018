const spanClass = (_class, string) => `<span class="${_class}">${string}</span>`
export const mapComments = (comments, filter) => {
  if (!filter || filter === 'All') {
    return comments
  }
  const caseInsensitive = filter === 'TF' ? '' : 'ig'
  const regex = new RegExp('\\w*' + filter + '\\w*', caseInsensitive)
  const sentenceRegex = new RegExp('[^.]*' + filter + '[^.$]*.', caseInsensitive)
  let processed = {}
  for (const key in comments) {
    let { text: comment } = comments[key]
    if (regex.exec(comment)) {
      let sentenceMatch = false
      let mapped = ''
      do {
        sentenceMatch = sentenceRegex.exec(comment)
        // console.log(sentenceMatch)
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
          // console.log('mapped', { mappedSentence, mapped, comment })
        } else {
          // console.log('else', { mapped, comment })
          mapped += comment
        }
      } while (sentenceMatch)
      processed[key] = { text: mapped }
    }
  }
  return processed
}