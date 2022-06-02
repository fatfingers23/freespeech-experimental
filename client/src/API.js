// API URL
const URL = 'http://127.0.0.1:5000';

/* Fetch data for user */
export const fetchData = async () => {
    const res = await fetch(`${URL}/public/english`);
    return await res.json();
}

export const sendEdit = async (tile) => await fetch(`${URL}/change`, {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(tile)
});