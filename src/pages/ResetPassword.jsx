import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {
            setError(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            // Temporary success message
            const response = await fetch(
                `http://localhost:3002/users?email=${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                throw new Error("Failed to find user.");
            }

            const users = await response.json();

            if (users.length === 0) {
                setError("User not found.");
                return;
            }

            const userId = users[0].id;

            const updateResponse = await fetch(
                `http://localhost:3002/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: password
                    })
                }
            );

            if (!updateResponse.ok) {
                throw new Error("Failed to update password.");
            }

            setSuccess("Password reset successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {

            setError("Something went wrong.");

        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <div className="text-center mb-4">

                    <h2>Reset Password</h2>

                    <p className="text-muted">
                        Create your new password
                    </p>

                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Reset Password
                    </button>

                </form>

                <div className="text-center mt-3">

                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;