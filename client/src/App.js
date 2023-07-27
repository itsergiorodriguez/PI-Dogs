
import { Routes, Route} from "react-router-dom";
import Home from "./Views/Home/Home";
import Form from "./Views/Form/Form";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import axios from "axios";
axios.defaults.baseURL="https://pi-dogs-lime.vercel.app";

function App() {
 
  return (
    <div >
       
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route exact path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
