// const Functions = require('firebase-functions')
// const cors = require('cors')({origin: true})
// const admin = require('firebase-admin')
// admin.initializeApp(Functions.config().firebase)

// const emailError = email => {
//   const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//   const harvardEmail = email => email.endsWith('harvard.edu')
//   if (!email || !validEmail(email)) return 'INVALID_EMAIL'
//   if (!harvardEmail(email)) return 'NON_HARVARD_EMAIL'
//   return ''
// }

// exports.validateEmail = Functions.https.onRequest((request, response) => {
//   const email = request.body.email
//   const error = emailError(email)
//   cors(request, response, () => {
//     response.status(200).send(error ? { error } : {})
//   })
// })

// exports.createUser = Functions.https.onRequest((request, response) => {
//   const setupInfo = request.body
//   const { email, password, displayName, gradYear, concentration, track, secondary } = setupInfo
//   const plannerInfo = { gradYear, concentration, track, secondary }
//   const error = emailError(email)

//   cors(request, response, () => {
//     if (error) {
//       console.error('Tried to create account with invalid email', email, error)
//       response.status(400).send({ error })
//     } else {
//       admin.auth().createUser({email, password, displayName, emailVerified: false, disabled: false}).then(user => {
//         console.log('Successfully created new user!', displayName, email)
//         const infoRef = admin.database().ref('/planners/v1/' + user.uid + '/info')
//         infoRef.update(plannerInfo).catch(error => { console.error('Error adding planner info', error, user, plannerInfo) })
//         user.sendEmailVerification()
//           .then(() => { console.log('Sent email verification for', user) })
//           .catch(error => { console.error('Error sending email verification', user, error) })
//       }).catch(error => {
//         console.error('Error creating user', error, setupInfo)
//       })
//       response.status(200)
//     }
//   })
// })

