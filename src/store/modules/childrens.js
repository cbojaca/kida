import { childrenService } from '../../services/children';

const state = {
    all: {}
};

const actions = {

    getChildrensByUser({ commit }, user) {
        commit('getChildrensByUserRequest');

        childrenService.getChildrensByUser(user)
            .then(
                childrens => commit('getAllSuccess', childrens),
                error => commit('getAllFailure', error)
            );
    },

    getChildrensByDaycareId({ commit }, daycareId) {
        commit('getChildrensByDaycareIdRequest');

        childrenService.getAllChildrensByDaycareId(user)
            .then(
                childrens => commit('getAllSuccess', childrens),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        childrenService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, childrens) {
        state.all = { items: childrens };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(children =>
            children.id === id
                ? { ...children, deleting: true }
                : children
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(children => children.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(children => {
            if (children.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...childrenCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...childrenCopy, deleteError: error };
            }

            return children;
        })
    }
};

export const childrens = {
    namespaced: true,
    state,
    actions,
    mutations
};
