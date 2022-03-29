import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/home'
import Chat from './component/chat'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
