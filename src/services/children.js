import { handleResponse } from '../_helpers/handle-response';
import { requestOptions } from '../_helpers/request-options';
import { find } from 'lodash';

const config = JSON.stringify({
    apiUrl: 'http://localhost:3000'
})

export const childrenService = {
    registerChildren,
    getAllChildrensByDaycareId,
    getChildrenById,
    update,
    delete: _delete
};

function registerChildren(children) {
    return fetch(`${config.apiUrl}/childrens`, requestOptions.post(children)).then(handleResponse);
}

function getAllChildrensByDaycareId(daycareId) {
    return fetch(`${config.apiUrl}/childrens`, requestOptions.get()).then(handleResponse);
}

function getChildrenById(childrenId) {
    return fetch(`${config.apiUrl}/childrens/${childrenId}`, requestOptions.get()).then(handleResponse);
}

function getChildrensByUser(user) {
    let childrens = this.getAllChildrensByDaycareId(user.daycareId);
    return _.find(childrens,{'userId':user.id});
}

function update(children) {
    return fetch(`${config.apiUrl}/childrens/${children.id}`, requestOptions.put(children)).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return fetch(`${config.apiUrl}/childrens/${id}`, requestOptions.delete()).then(handleResponse);
}