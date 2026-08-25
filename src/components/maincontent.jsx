import { useEffect, useState } from "react";
import DashboardCards from "./DashboardCards";
import MedicalRecords from "./MedicalRecords";
import AddRecordForm from "./AddRecordForm";

function Maincontent() {
    const [records, setRecords] = useState(() => {
        const savedRecords = localStorage.getItem("medicalRecords");
        if (savedRecords){
            return JSON.parse(savedRecords);
        }
        
        return []
    });

    useEffect(() => {
        localStorage.setItem("medicalRecords", JSON.stringify(records));
    }, [records]);

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
