import { useEffect, useState } from 'react';
function trimEndpoint(endpoint) {
    let trimmedEndpoint = endpoint.replace(/^\/+/, '');
    trimmedEndpoint = trimmedEndpoint.replace(/\/+$/, '');
    return trimmedEndpoint;
}

/**
 * @param {string} endpoint
 */
export function fetchData(endpoint) {

    // TODO: the fetch should send the user_id.
    // If the response is auth failure, need to redirect to /

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [message, setMessage] = useState(null);

    async function fetchData() {
        setIsFetching(true);
        try {
            const response = await fetch(`http://www.localhost:8000/${trimEndpoint(endpoint)}/`);
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