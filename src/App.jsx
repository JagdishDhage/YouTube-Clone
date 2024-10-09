import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Search from './Component/Search';
import Watch from './Component/Watch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
       <Route path='/watch/:id' element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
