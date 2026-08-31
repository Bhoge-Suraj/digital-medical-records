import { useState } from "react";
import RecordAction from "./recordAction";

function MedicalRecords({ records, onAddClick, onDeleteRecord, onEditRecord, }) {
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);

    const filteredRecords = records.filter((record) =>
        record.patient.toLowerCase().includes(search.toLowerCase()) ||
        record.doctor.toLowerCase().includes(search.toLowerCase()) ||
        record.type.toLowerCase().includes(search.toLowerCase())
    );

    const displayedRecords = showAll
        ? filteredRecords
        : filteredRecords.slice(0, 4);

    const getStatusClass = (status) => {
        if (status === "Completed") {
            return "badge bg-success";
        }

        if (status === "Pending") {
            return "badge bg-warning text-dark";
        }

        return "badge bg-info text-dark";
    };

    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Recent Medical Records</h5>
                    <div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Show Less" : "View All"}
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="position-relative mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search patient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3"
                            onClick={() => setSearch ("")}
                            style={{cursor: "pointer", zIndex: 10}}

                        >
                            <i className="bi bi-x-lg"></i>
                        </span>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                            <tr>
                                <th>Patient</th>
                                <th>Record Type</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayedRecords.length > 0 ? (
                                displayedRecords.map((record) => (
                                    <tr key={record.id}>
                                        <td>{record.patient}</td>
                                        <td>{record.type}</td>
                                        <td>{record.doctor}</td>
                                        <td>{record.date}</td>
                                        <td>
                                            <span className={getStatusClass(record.status)}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>
                                            <RecordAction
                                                record={record}
                                                onEdit={onEditRecord}
                                                onDelete={onDeleteRecord}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No medical records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-success btn-sm me-2" onClick={onAddClick}>
                        + Add Record
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MedicalRecords;