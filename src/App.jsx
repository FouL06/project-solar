import "./App.css";
import SystemInfo from "./Components/system/systemInfo";
import SystemInventory from "./Components/system/systemInventory";

function App() {
  return (
    <div className="body-wrapper">
      <SystemInfo />
      <SystemInventory />
    </div>
  );
}

export default App;
