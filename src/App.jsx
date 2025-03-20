import CountDown from "./components/CountDown";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <CountDown birthMonth={2} birthDay={10} />
      </div>
    </>
  );
}

export default App;
