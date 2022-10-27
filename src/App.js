import GeoLocation from "./WeatherApi/WeatherApi";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <span className='title'>WTHR</span>
      <GeoLocation />
    </div>
  );
}

export default App;
