import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!otp) {
            setError("Please enter OTP.");
            return;
        }

        if (otp.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        // Temporary demo OTP
        if (otp !== "123456") {
            setError("Invalid OTP.");
            return;
        }

        setSuccess("OTP verified successfully!");

        setTimeout(() => {
            navigate("/reset-password", {
                state: {
                    email: email
                }
            });
        }, 1000);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <div className="text-center mb-4">

                    <h2>Verify OTP</h2>

                    <p className="text-muted">
                        Enter the 6-digit OTP
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
                            OTP
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Verify OTP
                    </button>

                </form>

                <div className="text-center mt-3">

                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifyOTP;