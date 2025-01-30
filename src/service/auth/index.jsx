import { customFetch, setTokenLocalStorage } from '../index.jsx';
import { ENDPOINTS } from './constants.jsx';

async function login(username, password) {
    if (!username || !password) throw 'A02';

    const payload = {
        username: username,
        password: password,
    };

    try {
        const loginResponse = await customFetch(
            'POST',
            ENDPOINTS.login,
            payload
        );
        setTokenLocalStorage(loginResponse.token);
    } catch (error) {
        throw 'A03';
    } // save
}

export const signUp = async (data) => {
    return await customFetch('POST', ENDPOINTS.singnUp, data);
};

export { login };
