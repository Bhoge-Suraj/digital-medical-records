const USERS_API_URL = "http://localhost:3002/users";

export const loginUser = async (email, password) => {
    const response = await fetch(
        `${USERS_API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );

    if (!response.ok) {
        throw new Error("Failed to login");
    }

    const users = await response.json();

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    return users[0];
};