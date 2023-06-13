import { useState } from "react";
import FormTab from "./components/FormTab";
import HomeTab from "./components/HomeTab";

const App = () => {
  const [currTab, setCurrTab] = useState("home");
  return (
    <div className="w-96">
      {currTab === "home" && <HomeTab setCurrTab={setCurrTab} />}
      {currTab === "form" && <FormTab setCurrTab={setCurrTab} />}
    </div>
  );
};

export default App;
