import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'theframedapp.firebaseapp.com',
  projectId: 'theframedapp',
  databaseURL: 'https://theframedapp.firebaseio.com',
  storageBucket: 'theframedapp.appspot.com',
  messagingSenderId: '1089862088680',
  appId: '1:1089862088680:web:c984259c70dc19973c165d'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app()
}

const firestore = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export default firebase
export{ firestore, provider }