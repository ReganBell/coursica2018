import Firebase from 'firebase'
// import RequestPromise from 'request-promise'

const config = {
  apiKey: 'AIzaSyBeKmpLiXesMtoy060LI1aPLqX3jpxw9ys',
  authDomain: 'coursica-2.firebaseapp.com',
  databaseURL: 'https://coursica-2.firebaseio.com',
  storageBucket: 'coursica-2.appspot.com',
  messagingSenderId: '860837642217'
}
Firebase.initializeApp(config)
const auth = Firebase.auth()

export default {
  signIn (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  },
  signOut () {
    return auth.signOut()
  },
  listenForUser (signedIn, signedOut) {
    auth.onAuthStateChanged(function (user) {
      if (user && user.emailVerified) {
        signedIn(user)
      } else {
        signedOut()
      }
    })
  },
  user () {
    return auth.currentUser
  },
  resetPassword (email) {
    return auth.sendPasswordResetEmail(email)
  },
  createUser (email, password, name, gradYear, concentration, track, secondary) {
    return auth.createUserWithEmailAndPassword(email, password)
  },
  updateUserProfile (newInfo, user = Firebase.auth().currentUser) {
    return user.updateProfile(newInfo)
  },
  updatePlannerInfo (gradYear, concentration, track, secondary, user = Firebase.auth().currentUser) {
    const infoRef = Firebase.database().ref('/planners/v1/' + user.uid + '/info')
    infoRef.update({ gradYear, concentration, track, secondary })
      .catch(error => { console.error('Error updating planner info', error, { gradYear, concentration, track, secondary }, user) })
  },
  sendEmailVerification (user = Firebase.auth().currentUser) {
    user.sendEmailVerification().catch(error => { console.error('Error sending email verification', error, user) })
  },
  verifyEmail (code) {
    console.log('Auth.verifyEmail')
    return auth.applyActionCode(code)
  }
}
