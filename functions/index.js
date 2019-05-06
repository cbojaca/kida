const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteUser = functions.firestore
    .document('users/{userId}')
    .onDelete((snap, context) => {
        // Get an object representing the document
        const newUser = snap.data();
        var db = admin.firestore();

        admin.auth().deleteUser(context.params.userId)
        .then(function () {
            console.log('User Successfully Deleted');
        })
        .catch(error => {
            console.log(error);
        })

    });
