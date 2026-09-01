import { useEffect, useState } from "react";
import DashboardCards from "./DashboardCards";
import MedicalRecords from "./MedicalRecords";
import AddRecordForm from "./AddRecordForm";

function Maincontent() {
    const [records, setRecords] = useState(() => {
        try {
            const savedRecords = localStorage.getItem("medicalRecords");
            if (savedRecords) {
                return JSON.parse(savedRecords);
            }
            return [];
        } catch (error) {
            console.log("Failed to load medical records:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("medicalRecords", JSON.stringify(records));
    }, [records]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(false);

    const handleDeleteRecord = (recordId) => {
        console.log("Deleting:", recordId);

        const updatedRecords = records.filter(
            (record) => record.id !== recordId
        );

        setRecords(updatedRecords);
    };


    const filteredRecords = records.filter((record) =>
        (
            record.patient.toLowerCase().includes(search.toLowerCase()) ||
            record.doctor.toLowerCase().includes(search.toLowerCase()) ||
            record.type.toLowerCase().includes(search.toLowerCase())
        ) &&
        (
            statusFilter === "All" ||
            record.status === statusFilter
        )
    );

    const displayedRecords = showAll ? filteredRecords : filteredRecords.slice(0, 4);
    const getStatusClass = (status) => {
        if (status === "Completed") {
            return "badge bg-success";
        };
        if (status === "Pending") {
            return "badge bg-warning text-dark";
        };
        return "badge bg-info text-dark";
    };

    return (
        <main className="p-4 flex-grow-1">
            <h2>Dashboard</h2>
            <p className="text-muted">
                Welcome to your Digital Medical Records.
            </p>
            <DashboardCards recordsCount={records.length} />
            {loading && (
                <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 mb-0">Loading medical records...</p>
                </div>
            )}
            <MedicalRecords
                records={displayedRecords}
                onAddClick={() => { setShowAddForm(true); setEditingRecord(null); }}
                onDeleteRecord={handleDeleteRecord}
                onEditRecord={(record) => {
                    setEditingRecord(record);
                    setShowAddForm(true);
                }}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />
            {showAddForm && (
                <AddRecordForm
                    editingRecord={editingRecord}
                    onAddRecord={(newRecord) => {
                        if (editingRecord) {
                            setRecords(
                                records.map((record) =>
                                    record.id === editingRecord.id ? newRecord : record
                                )
                            );
                            setEditingRecord(null);
                        } else {
                            setRecords([...records, newRecord]);
                        }

                        setShowAddForm(false);
                    }}
                    onCancel={() => { setShowAddForm(false); setEditingRecord(null); }}
                />
            )}

        </main>
    );
}

export default Maincontent;
