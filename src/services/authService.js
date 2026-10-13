const AUTH_API_URL = "http://localhost:5001";

export const loginUser = async (email, password) => {
    const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to login");
    }

    return {
    ...data.user,
    token: data.token
    };
};