

// API URL
const URL = 'http://127.0.0.1:5000';

/* Fetch data for user */
export const fetchData = async () => {
    const res = await fetch(`${URL}/user/della/data`, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Bearer': 'dummy'
        }
    });
    return await res.json();
}

/* Send edir */
export const sendEdit = async (blob) => await fetch(`${URL}/change`, {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(blob)
});

export const login = async (blob) => await fetch(`${URL}/login`, {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(blob)
});