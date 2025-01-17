const API_URL = 'http//localhost:8080';

export const customFetchAuth = async  (method, endpoint, body = null, headers = {}) => {
    // if theres is headers passed then append token
    const token = getTokenFromLocalStorage();
    if (!token) throw 'A01'; // thow missing token error code
    Object.assign(headers, { Authorization: `bearer ${token}` });

    return customFetch(method, endpoint, body, headers);
}

async function customFetch(method, endpoint, body = {}, headers = {}) {
    const finalUrl = `${API_URL}${endpoint}`;
    const rawResponse = await fetch(finalUrl, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    });

    return await rawResponse.json();
}

function getTokenFromLocalStorage() {
    return localStorage.getItem('authToken');
}

function setTokenLocalStorage(token) {
    if (token && typeof token === 'string') {
        localStorage.setItem('authToken', token);
    }
}

export { customFetch, customFetchAuth, setTokenLocalStorage };
