const fb = require("../../firebaseConfig");

const state = {
	currentDaycare: {},
	allChildrensByDaycare: [],
	allUsersByDaycare: []
};

const actions = {
	getUserDaycare({ commit }, daycareId) {
		fb.daycaresCollection.doc(daycareId).get().then(function (doc) {
			if (doc.exists) {
				commit('setUserDaycare', doc.data());
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			dispatch("alert/error", error, { root: true });
		});

	},

	addUserToDaycare({ commit, dispatch }, user) {
		fb.daycaresCollection.doc(user.DaycareId).set({
			users: {
                [user.uid]: {
                    FullName: user.fullName,
                    Role: user.userRole
                }
            }
		}, { merge: true })
		.then(() => {
			dispatch("alert/success", "User Succesfully Added", { root: true });
		})
		.catch(err => {
			dispatch("alert/error", err, { root: true });
		});
	},

	delete({ commit }, id) {
		commit("deleteRequest", id);

		userService
			.delete(id)
			.then(
				user => commit("deleteSuccess", id),
				error => commit("deleteSuccess", { id, error: error.toString() })
			);
	}
};

const mutations = {
	setUserDaycare(state, val) {
		state.currentDaycare = val;
	},
	getAllRequest(state) {
		state.all = { loading: true };
	},
	getAllSuccess(state, users) {
		state.all = { items: users };
	},
	getAllFailure(state, error) {
		state.all = { error };
	},
	deleteRequest(state, id) {
		// add 'deleting:true' property to user being deleted
		state.all.items = state.all.items.map(user =>
			user.id === id ? { ...user, deleting: true } : user
		);
	},
	deleteSuccess(state, id) {
		// remove deleted user from state
		state.all.items = state.all.items.filter(user => user.id !== id);
	},
	/* deleteFailure(state, { id, error }) {
	  // remove 'deleting:true' property and add 'deleteError:[error]' property to user
	  state.all.items = state.items.map(user => {
		if (user.id === id) {
		  // make copy of user without 'deleting:true' property
		  const { deleting, ...userCopy } = user;
		  // return copy of user with 'deleteError:[error]' property
		  return { ...userCopy, deleteError: error };
		}
  
		return user;
	  });
	} */
};

export const daycares = {
	namespaced: true,
	state,
	actions,
	mutations
};
