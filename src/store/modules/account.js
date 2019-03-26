import { userService } from '../../services/user';
const fb = require('../../firebaseConfig');

const state = {
    currentUser: null,
    userProfile: {}
}

const actions = {
    login({ dispatch, commit }, { email, password, router }) {
        fb.auth.signInWithEmailAndPassword(email, password).then(user => {
            commit('setCurrentUser', user.user);
            dispatch('fetchUserProfile');
            router.push({ name: 'dashboard' });
        }).catch(err => {
            commit('setCurrentUser', null);
            commit('setUserProfile', {});
            dispatch('alert/error', err, { root: true });
        })
    },

    fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data());
        }).catch(err => {
            throw err;
        })
    },

    logout({ commit }, {router}) {
        fb.auth.signOut().then(() => {
            commit('setCurrentUser', null);
            commit('setUserProfile', {});
            router.push('/login');
        }).catch(err => {
            throw err;
        })
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    setCurrentUser(state, val) {
        state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};