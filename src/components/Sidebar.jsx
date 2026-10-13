import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    return (
        <div className="bg-primary text-white p-3" style={{ minHeight: "100vh", width: "250px" }}>
            <h4 className="mb-4">Medical Records</h4>

            <ul className="nav flex-column">
                <li className="nav-item mb-2" >
                    <NavLink to="/dashboard" className="nav-link text-white">
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item mb-2" >
                    <NavLink to="/medical-records" className="nav-link text-white">
                        Medical Records
                    </NavLink>
                </li>

                <li className="nav-item mb-2" >
                    <NavLink to="/doctors" className="nav-link text-white">
                        Doctors
                    </NavLink>
                </li>

                <li className="nav-item mb-2" >
                    <NavLink to="/appointments" className="nav-link text-white">
                        Appointments
                    </NavLink>
                </li>

                <li className="nav-item mb-2" >
                    <NavLink to="/reports" className="nav-link text-white">
                        Reports
                    </NavLink>
                </li>
            </ul>
            <button
                className="btn btn-light text-primary mt-4 w-100"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default Sidebar;