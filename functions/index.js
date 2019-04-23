const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        const newUser = snap.data();
        var db = admin.firestore();

        db.collection("daycares").doc(newUser.DaycareId).set({
            users: {
                [context.params.userId]: {
                    FullName: newUser.FullName,
                    Role: newUser.Role
                }
            }
        }, { merge: true })
            .then(() => {
                console.log('Usuario Creado en Guarderia');
            }).catch(err => {
                console.log(err);
            });

        functions.database.ref('daycares/' + newUser.daycareId + '/users').update({
            userId: newUser.fullName
        }, { merge: true })
            .then(() => {
                console.log('Usuario Creado en Guarderia');
            }).catch(err => {
                console.log(err);
            });

        // perform desired operations ...
    }); */
