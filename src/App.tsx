import "./App.css";
import InstallPage from "./components/InstallPage";

const isInstalled = localStorage.getItem("isInstalled") === "true";

function App() {
  return (
    <div>
      {!isInstalled ? <InstallPage /> : <div>MainApp</div>}
    </div>
  );
}

export default App;