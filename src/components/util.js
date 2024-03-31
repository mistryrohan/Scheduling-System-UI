import { useEffect, useState } from 'react';
function trimEndpoint(endpoint) {
    let trimmedEndpoint = endpoint.replace(/^\/+/, '');
    trimmedEndpoint = trimmedEndpoint.replace(/\/+$/, '');
    return trimmedEndpoint;
}

/**
 * @param {string} endpoint
 */
export function fetchData(endpoint, method = 'GET', body = null) {

    // TODO: the fetch should send the user_id.
    // If the response is auth failure, need to redirect to /

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [message, setMessage] = useState(null);

    const accessToken = typeof window === 'object' ? localStorage.getItem('access_token') : null;
    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    };

    const options = { method, headers }
    if (body) options.body = JSON.stringify(body);

    async function fetchData() {
        setIsFetching(true);
        try {
            const response = await fetch(`http://www.localhost:8000/${trimEndpoint(endpoint)}/`, options);
            const data = await response.json();
            if (!response.ok) throw new Error(data['detail']);
            setData(data);
            setMessage(data["message"]);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => { fetchData() }, []);

    return { data, isFetching, message };
}

/** 
 * @param {string} username username
 * @param {string} password user password
 * @returns {Promise<{success: boolean, message: string}>}
*/
export async function handleLogin(username, password) {
    const url = 'http://www.localhost:8000/accounts/login/';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            let errorMessage = data.message && data.message.length ? data.message.join(' ') : 'Login failed';
            if (data.password && Array.isArray(data.password)) {
                errorMessage = data.password.join(' ');
            }
            throw new Error(errorMessage);
        }
        /*Storing the user, and access and refresh tokens to localStorage*/
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log(JSON.stringify(data.user))
        localStorage.setItem('access_token', data.access);
        console.log(data.access)
        localStorage.setItem('refresh_token', data.refresh);
        console.log(data.refresh)
        return { success: true, message: 'Login successful' };
    }
    catch (error) {
        console.error('Login error:', error);
        return { success: false, message: error.message };
    }
}