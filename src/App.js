import "./App.css";
import Weather from "./components/weather";

function App() {
  return (
    <div className="App">
      <div className="p-2 w-100 bg-dark text-light">
        <Weather />
      </div>
    </div>
  );
}

export default App;
