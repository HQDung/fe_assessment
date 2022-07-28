import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Post from "./containers/Post";

const App = () => {
  return (
    <div className='max-w-screen-xl mx-auto h-screen py-4 overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
};

export default App;
