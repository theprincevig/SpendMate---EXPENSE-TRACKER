export default function DeleteAlert({ content, onDelete }) {
    return (
        <>
            <p className="text-sm">{content}</p>

            <div className="flex justify-end mt-6">
                <button 
                    type="button"
                    onClick={onDelete}
                    className="add-btn"
                >
                    Delete
                </button>
            </div>
        </>
    );
}