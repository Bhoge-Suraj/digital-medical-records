function Sidebar() {
    return (
        <div className="bg-primary text-white p-3" style={{minHeight: "100vh", width: "250px"}}>
            <h4 className="mb-4">Medical Records</h4>

            <ul className="nav flex-column">
                <li className="nav-item mb-2" >
                    <a href="#" className="nav-link text-white">
                        Dashboard
                    </a>
                </li>

                <li className="nav-item mb-2" >
                    <a href="#" className="nav-link text-white">
                        Medical Records
                    </a>
                </li>

                <li className="nav-item mb-2" >
                    <a href="#" className="nav-link text-white">
                        Doctors
                    </a>
                </li>

                <li className="nav-item mb-2" >
                    <a href="#" className="nav-link text-white">
                        Appointments
                    </a>
                </li>

                <li className="nav-item mb-2" >
                    <a href="#" className="nav-link text-white">
                        Reports
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;