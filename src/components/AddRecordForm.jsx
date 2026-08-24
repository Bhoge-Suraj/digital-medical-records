import { useState } from "react";
function AddRecordForm ({onAddRecord, onCancel}) {
    const [formData, setFormData] = useState({
        patient: "",
        type: "",
        doctor: "",
        date: "",
        status: "Pending",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,[name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.patient || 
            !formData.type || 
            !formData.doctor ||
            !formData.date
        ) {
            alert("please fill all fields");
            return;
        }

        onAddRecord ({
            id: Date.now(),
            ...formData,
        });

        setFormData({
            patient: "",
            type: "",
            doctor: "", 
            date: "", 
            status: "Pending",
        });
    };

    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
                <h5 className="mb-4">Add Medical Record</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Patient Name</label>
                            <input type="text" name="patient" className="form-control" placeholder="enter patient name"
                                   value={formData.patient} onChange={handleChange} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Record Type</label>
                            <select name="type"  className="form-select" value={formData.type} onChange={handleChange}>
                                <option value=" ">Select Record Type</option>
                                <option value="Blood Test">Blood Test</option>
                                <option value="General Checkup">General Checkup</option>
                                <option value="X-Ray">X-Ray</option>
                                <option value="Prescription">Prescription</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Doctor</label>
                            <input type="text" name="doctor" className="form-control" 
                                   placeholder="Enter doctor name" 
                                   value={formData.doctor} onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input type="date" name="date" 
                                   className="form-control"
                                   value={formData.date} 
                                   onChange={handleChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                                <option value=" ">Select Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Reviewed">Reviewed</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success me-2">Add Medical Record</button>
                            <button type="button" className="btn btn-secondary" onClick={onCancel}> Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRecordForm;