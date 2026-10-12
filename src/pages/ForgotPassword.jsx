import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:3002/users?email=${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                throw new Error("Failed to check email.");
            }

            const users = await response.json();

            if (users.length === 0) {
                setError("Email is not registered.");
                return;
            }

            setSuccess("Email verified. OTP will be sent next.");

            setTimeout(() => {
                navigate("/verify-otp", {
                    state: {
                        email: email
                    }
                });
            }, 1000);

        } catch (error) {

            setError(error.message);

        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <div className="text-center mb-4">

                    <h2>Forgot Password</h2>

                    <p className="text-muted">
                        Enter your registered email
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
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Continue
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

export default ForgotPassword;