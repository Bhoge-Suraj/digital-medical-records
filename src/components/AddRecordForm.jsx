function AddRecordForm ({onAddRecord}) {
    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
                <h5 className="mb-4">Add Medical Record</h5>
                <form >
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Patient Name</label>
                            <input type="text" className="form-control" placeholder="enter patient name" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Record Type</label>
                            <select className="from-select">
                                <option>Select Record Type</option>
                                <option>Blood Test</option>
                                <option>General Checkup</option>
                                <option>X-Ray</option>
                                <option>Prescription</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Doctor</label>
                            <input type="text" className="form-control" placeholder="Enter doctor name" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className="form-select">
                                <option>Select Status</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Reviewed</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Medical Record</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRecordForm;