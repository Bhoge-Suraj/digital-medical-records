import Sidebar from "./components/Sidebar";
import Maincontent from "./components/maincontent";

function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Maincontent />
      </div>
    </>
  );
}

export default App
