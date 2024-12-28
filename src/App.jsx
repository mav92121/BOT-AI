import axios from "../axios";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
function App() {
  const fetchData = async () => {
    const { config } = await axios.get("/users");
    const data = JSON.parse(config.data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <Sidebar />;
}

export default App;
