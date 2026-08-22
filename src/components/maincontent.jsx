function Maincontent() {
    return (
        <main className="p-4 flex-grow-1">
            <h2>Dashboard</h2>
            <p className="text-muted">
                Welcome to your Digital Medical Records.
            </p>
            <div className="row g-4 mt-2">

                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">Total Petients</h6>
                            <h2 className="fw-bold">128</h2>
                            <p className="text-success mb-0">+8% this month</p>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">Medical Records</h6>
                            <h2 className="fw-bold">356</h2>
                            <p className="text-success mb-0">+12% this month</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">Appointments</h6>
                            <h2 className="fw-bold">24</h2>
                            <p className="text-success mb-0">6 today</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">doctors</h6>
                            <h2 className="fw-bold">18</h2>
                            <p className="text-success mb-0">4 available today</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Maincontent;
