import { customFetchAuth } from '../index.jsx';
import { ENDPOINTS } from './constants.jsx';

async function getUsers() {
    return customFetchAuth('GET', ENDPOINTS.users);
}

async function getUserById(id) {
    const updatedUrl = `${ENDPOINTS.user}${id}`;
    return customFetchAuth('GET', updatedUrl);
}


export {
    getUserById,
    getUsers
}