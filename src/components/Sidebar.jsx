import {NavLink} from "react-router-dom";


function Sidebar() {
    return (
        <div className="bg-primary text-white p-3" style={{minHeight: "100vh", width: "250px"}}>
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
                    <NavLink to="reports" className="nav-link text-white">
                        Reports
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;