declare namespace Coursica {

  class Prof {
    matchName: string
    displayName: string
    relevantBecause?: string
    score?: number
    percentile?: number
    matched?: {
      termYear: string
      group: string
      title: string
      number: string
      reportId: string
    }
  }

  class OfferingSummary {
    termYear: string
    profs?: {
      matchName: string
      displayName: string
      score?: number
      percentile?: number
    }[]
    sessions?: Session[]
    objectID: string
  }

  class Offering {
    objectID: string
    classNumber?: string
    courseId: string

    group: string
    number: string
    numberInt: number
    title: string

    description?: string

    termYear: string
    term?: string
    year?: string
    likelyTerm?: string
    likelyYear?: string

    departments: string[]
    recommendedPrep?: string
    consentRequired: string
    format: string
    notes?: string
    gradingBasis?: string
    units: string
    enrollmentCap?: number
    genEds?: string[]
    level?: string
    courseSite?: string
    crossReg?: string[]
    examDateTime?: string
    enrollmentStatus?: string
    
    sessionString: string
    sessions?: Session[]

    primaryReason?: string
    profs?: Prof[]
    topReport?: TopReport
    reports?: Report[]
    otherOfferings?: OfferingSummary[]
  }

  class Response {
    score: number
    percentiles?: {
      size: number
      all: number
      [ group: string ]: number
    }
  }

  class QProf {
    matchName: string
    displayName: string
    responses: {
      lectures?: Response
      instructor?: Response
      enthusiasm?: Response
      turnaround?: Response
      feedback?: Response
      discussion?: Response
      accessible?: Response
    }
  }

  class TopReport extends Report {
    relevantBecause: string
  }

  class Report {
    group: string
    title: string
    evals: number
    size: number
    term: string
    year: string
    reportId: string
    responses?: {
      feedback?: Response
      section?: Response
      recommend?: Response
      assignments?: Response
      overall?: Response
      materials?: Response
      workload?: Response
    }
    profs?: QProf[]
    reasons: {
      [ reason: string ]: string
    }
  }

  // enum Reason {
  //   concentration, secondary, genEd, expos, language, preMed
  // }

  class Session {
    time?: {
      start: number
      end: number
    }
    days: string[]
    location?: {
      name: string
      number: string
      coordinates?: {
        latitude: string
        longitude: string
      }
    }
  }
}

// need profs