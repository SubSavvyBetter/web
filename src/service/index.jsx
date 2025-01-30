const API_URL = 'http://localhost:8080';

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

     console.log(headers)

    return customFetch(method, endpoint, body, headers);
};

async function customFetch(method, endpoint, body = null, headers = {}) {
    const finalUrl = `${API_URL}${endpoint}`;
    const payload = {
        method: method,
        headers: headers,
    }
    console.log(body)

    if (body) {
        payload.headers['Content-Type'] = "application/json";
        payload.body = JSON.stringify(body);
    }

    const rawResponse = await fetch(finalUrl, payload);
    try{
        return await rawResponse.json();
    } catch(error){
        console.log(error)
        return rawResponse
    }

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
