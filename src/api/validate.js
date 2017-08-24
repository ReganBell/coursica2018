const emailError = email => {
  const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const harvardEmail = email => email.endsWith('harvard.edu')
  if (!email || !validEmail(email)) return 'INVALID_EMAIL'
  if (!harvardEmail(email)) return 'NON_HARVARD_EMAIL'
  return ''
}

export default {
  email (email) {
    return new Promise((resolve, reject) => {
      const error = emailError(email)
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  }
}
