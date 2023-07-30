import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Homepage, Register, Error } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
