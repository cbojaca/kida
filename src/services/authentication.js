import { BehaviorSubject } from 'rxjs';
const fb = require('../firebaseConfig.js')

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fb.auth.signInWithEmailAndPassword(username, password)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
    }).catch(err => {
        console.log(err)
    })
}