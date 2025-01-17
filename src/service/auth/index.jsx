import { customFetch, setTokenLocalStorage } from '../index.jsx';
import { ENDPOINTS } from './constants.jsx';

async function login(username, password) {
    if (!username || !password) throw 'A02';

    const payload = {
        username: username,
        password: password,
    };

    const loginResponse = customFetch('POST', ENDPOINTS.login, payload);

    if (loginResponse.status !== 200) {
        throw 'A03';
    }

    // save
    setTokenLocalStorage();
}

export { login };
