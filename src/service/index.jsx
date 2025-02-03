const API_URL = import.meta.env.VITE_API_URL;

export const customFetchAuth = async (
    method,
    endpoint,
    body = null,
    headers = {}
) => {
    // if theres is headers passed then append token
    const token = getTokenFromLocalStorage();
    if (!token) throw 'A01'; // thow missing token error code
    Object.assign(headers, { Authorization: `${token}` });

    console.log(headers);

    return customFetch(method, endpoint, body, headers);
};

async function customFetch(method, endpoint, body = null, headers = {}) {
    console.log(API_URL);
    const finalUrl = `${API_URL}${endpoint}`;
    const payload = {
        method: method,
        headers: headers,
    };

    if (body) {
        payload.headers['Content-Type'] = 'application/json';
        payload.body = JSON.stringify(body);
    }

    const rawResponse = await fetch(finalUrl, payload);
    if (rawResponse.status >= 400) throw new Error('Failed');
    return rawResponse.json();
}

function getTokenFromLocalStorage() {
    return localStorage.getItem('authToken');
}

function setTokenLocalStorage(token) {
    if (token && typeof token === 'string') {
        localStorage.setItem('authToken', token);
    }
}

export { customFetch, setTokenLocalStorage };
