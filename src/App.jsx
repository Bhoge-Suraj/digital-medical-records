import Sidebar from "./components/Sidebar";


function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <main className="p-4 flex-grow-1">
          <h2>Dashboard</h2>
          <p className="text-muted">
            Welcome to your Digital Medical Records.
          </p>
        </main>
      </div>
    </>
  );
}

export default App
