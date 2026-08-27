function RecordAction ({record, onEdit, onDelete}) {
    return(
        <div className="d-flex gap-2">
            <button
                className="btn btn-sm btn-outline-primary"
                onClick = {() => onEdit(record)}
            >
                Edit
            </button>

            <button
                className="btn btn-sm btn-outline-danger"
                onClick = {() =>{
                    const confirmed = window.confirm("Are you sure you want to delete this medical record");
                    if (confirmed){
                        onDelete(record.id);
                    }
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default RecordAction;