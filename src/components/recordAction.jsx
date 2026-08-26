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
                onClick = {() => onDelete(record.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default RecordAction;