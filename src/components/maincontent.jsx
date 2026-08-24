import { useState } from "react";
import DashboardCards from "./DashboardCards";
import MedicalRecords from "./MedicalRecords";
import AddRecordForm from "./AddRecordForm";

function Maincontent() {
    const [records, setRecords] = useState([
        {
            id: 1,
            patient: "Suraj Sharma",
            type: "Blood Test",
            doctor: "Dr. Amit Patel",
            date: "20 aug 2026",
            status: "Completed",
        },
        {
            id: 2,
            patient: "Supriya Deshmukh",
            type: "General Checkup",
            doctor: "Dr. Neha Joshi",
            date: "19 aug 2026",
            status: "Pending",
        },
        {
            id: 3,
            patient: "aditya patil",
            type: "X-Ray",
            doctor: "Dr. Rahul Mehta",
            date: "18 aug 2026",
            status: "Completed"
        },
        {
            id: 4,
            patient: "Sachin kulkarni",
            type: "Prescription",
            doctor: "Dr. Amit Patel",
            date: "17 aug 2026",
            status: "Reviewed",
        },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);

    const filteredRecords = records.filter((record) =>
        record.patient.toLowerCase().includes(search.toLowerCase())
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
            <DashboardCards recordsCount={records.length}/>
            <MedicalRecords 
                records={records}
                onAddClick={() => setShowAddForm(true)} 
            />
            {showAddForm &&(
                <AddRecordForm 
                    onAddRecord={(newRecord) => {
                        setRecords([...records, newRecord]);
                        setShowAddForm(false);
                    }}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
            
        </main>
    );
}

export default Maincontent;
