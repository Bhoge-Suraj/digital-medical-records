import Sidebar from "./Sidebar";

function ProtectedLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1">
                {children}
            </div>
        </div>
    );
}

export default ProtectedLayout;