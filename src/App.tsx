import "./App.css";
import ControlArea from "./components/ControlArea";
import TextArea from "./components/TextArea";

const VALUES = {
  controlArea_H: "200px",
  textArea_H: "300px"
}

function App() {
  return (
    <div className="bg-gray-500 p-4 min-w-screen h-full flex flex-col gap-4">
      <div className={`w-full min-h-[${VALUES.controlArea_H}] bg-white`}>
        <ControlArea />
      </div>
      <div className={`w-full min-h-[${VALUES.textArea_H}] bg-white`}>
        <TextArea />
      </div>
    </div>
  );
}

export default App;
