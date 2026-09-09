import { useEffect, useState } from "react";
import DashboardCards from "./DashboardCards";
import MedicalRecords from "./MedicalRecords";
import AddRecordForm from "./AddRecordForm";
import { getRecords, createRecord, updateRecord, deleteRecord } from "../services/recordService";

function Maincontent() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getRecords();

                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
                setError("Unable to load medical records.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    const handleDeleteRecord = async (recordId) => {
        try {
            setError("");
            await deleteRecord(recordId);
            setRecords((currentRecords) =>
                currentRecords.filter((record) => record.id !== recordId)
            );
        } catch (error) {
            console.error("Error deleting medical record:", error);
            setError("Unable to delete medical record.");
        }
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
                    onAddRecord={async (newRecord) => {
                        if (editingRecord) {
                            try {
                                setError("");

                                const updatedRecord = await updateRecord(
                                    editingRecord.id,
                                    newRecord
                                );

                                setRecords((currentRecords) =>
                                    currentRecords.map((record) =>
                                        record.id === editingRecord.id ? updatedRecord : record
                                    )
                                );

                                setEditingRecord(null);
                            } catch (error) {
                                console.error("Error updating medical record:", error);
                                setError("Unable to update medical record.");
                                return;
                            }
                        } else {
                            try {
                                const savedRecord = await createRecord(newRecord);
                                setRecords((currentRecords) => [...currentRecords, savedRecord]);
                            } catch (error) {
                                console.error("Error creating medical record:", error);
                                setError("Unable to save medical record.");
                            }
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
