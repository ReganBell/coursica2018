import { options, dictGetter, field, selectedOption } from './common'





const commentInfo = (result, reportId, comments, filter) => dictGetter(result, {
  selectedReportId: field('topReport/reportId', id => reportId || id),
  options: field('', offering => options(offering, reportId)),
  selectedOption: field('', selectedOption(reportId)),
  comments: field('', _ => mapComments(comments, filter))
})
export default commentInfo
