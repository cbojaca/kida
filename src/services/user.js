const fb = require('../firebaseConfig.js')

export const userService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function register(user) {
    return fetch(`${config.apiUrl}/users/register`, requestOptions.post(user)).then(handleResponse);
}

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get()).then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get()).then(handleResponse);
}

function update(user) {
    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions.put(user)).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.delete()).then(handleResponse);
}