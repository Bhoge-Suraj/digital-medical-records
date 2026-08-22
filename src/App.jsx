import Sidebar from "./components/Sidebar";
import Maincontent from "./components/maincontent";
import DashboardCards from "./components/DashboardCards";

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
