// API URL
const URL = "http://159.223.200.254:3000";

/* Fetch data for user */
export const getLayout = async (blob) => {
	const res = await fetch(`${URL}/layout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blob),
    });

    return await res.json();
};

/* Send edir */
export const sendEdit = async (blob) =>
	await fetch(`${URL}/change`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(blob),
	});

export const login = async (blob) => {
	const res = await fetch(`${URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(blob),
	});

    return await res.json();
};

export const validateSession = async (blob) => {
    const res = await fetch(`${URL}/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blob),
    });

    return await res.json();
};
