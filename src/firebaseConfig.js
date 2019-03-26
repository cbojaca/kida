import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNd5sZKMw-shRpxRpd89gNfooZi2z7ktI",
    authDomain: "kidos-ca89d.firebaseapp.com",
    databaseURL: "https://kidos-ca89d.firebaseio.com",
    projectId: "kidos-ca89d",
    storageBucket: "kidos-ca89d.appspot.com",
    messagingSenderId: "54939692793"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const st = firebase.storage()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
/* const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes') */

export {
    db,
    st,
    auth,
    currentUser,
    usersCollection
    /* postsCollection,
    commentsCollection,
    likesCollection */
}