import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCUcWKDRTv5xv3tptBHBRDsMbD06Xx9_2o",
    authDomain: "skillup-messenger.firebaseapp.com",
    projectId: "skillup-messenger",
    storageBucket: "skillup-messenger.appspot.com",
    messagingSenderId: "250109593464",
    appId: "1:250109593464:web:98e179846d6c61505bea8d"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)